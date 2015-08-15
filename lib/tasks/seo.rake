require 'sitemap_generator'
require 'rss'

namespace :seo do
  desc 'sitemap.xml'
  task sitemap: :environment do
    SitemapGenerator::Sitemap.default_host = "https://#{ENV['ITPKG_DOMAIN']}"

    SitemapGenerator::Sitemap.create do
      add about_us_path, changefreq: 'monthly', priority: 1.0
      add help_path, changefreq: 'monthly', priority: 1.0

      Dir["#{Rails.root}/tmp/sitemap.*.json"].each do |file|
        JSON.parse(File.read(file)).each do |item|
          add item.fetch('url'), changefreq: item.fetch('freq'), priority: item.fetch('priority')
        end
      end
    end
    #SitemapGenerator::Sitemap.ping_search_engines
  end

  desc 'rss.xml'
  task rss: :environment do
    include Rails.application.routes.url_helpers

    domain = "https://#{ENV['ITPKG_DOMAIN']}"
    rss = RSS::Maker.make('atom') do |maker|
      maker.channel.author = Setting.site_author || 'CHANGE ME<change-me@gmail.com>'
      maker.channel.updated = Time.now.to_s
      maker.channel.about = "#{domain}#{about_us_path}"
      maker.channel.title = I18n.t 'site.title'

      Dir["#{Rails.root}/tmp/rss.*.json"].each do |file|
        JSON.parse(File.read(file)).each do |link|
          maker.items.new_item do |item|
            item.link = "#{domain}#{link.fetch 'url'}"
            item.title = link.fetch 'title'
            item.updated = link.fetch 'updated'
            item.description = link.fetch 'summary'
          end
        end
      end

    end

    File.open("#{Rails.root}/public/rss.atom", 'w') do |f|
      f.puts rss
    end
  end

  desc 'statics files'
  task statics: :environment do
    puts 'Generate google file'
    id = Setting.google_site_id
    if id
      File.open("#{Rails.root}/public/google#{id}.html", 'w') { |f| f.puts "google-site-verification: google#{id}.html" }
    end

    puts 'Generate baidu file'
    id = Setting.baidu_site_id
    if id
      File.open("#{Rails.root}/public/baidu_verify_#{id}.html", 'w') { |f| f.puts id }
    end

    puts 'Generate robots file'
    txt = Setting.robots_txt
    if txt
      File.open("#{Rails.root}/public/robots.txt", 'w') { |f| f.puts txt }
    end

    puts 'Generate http error pages'
    %w(404 422 500).each do |err|
      txt = Setting["http_#{err}"]
      if txt
        File.open("#{Rails.root}/public/#{err}.html", 'w') { |f| f.puts txt }
      end
    end

    puts 'Generate favicon'
    fav = Setting.favicon
    if fav
      File.open("#{Rails.root}/public#{fav.fetch :href}", 'wb') { |f| f.write fav.fetch :body }
    end

  end

end