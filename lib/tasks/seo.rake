namespace :seo do
  desc 'google file'
  task google: :environment do
    id = Setting.google_site_id
    if id
      File.open("#{Rails.root}/public/google#{id}.html", 'w') { |f| f.puts "google-site-verification: google#{id}.html" }
    end
  end

  desc 'baidu file'
  task baidu: :environment do
    id = Setting.baidu_site_id
    if id
      File.open("#{Rails.root}/public/baidu_verify_#{id}.html", 'w') { |f| f.puts id }
    end
  end
end