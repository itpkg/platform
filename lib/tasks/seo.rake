namespace :seo do
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