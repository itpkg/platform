require 'redis'

I18n.backend = I18n::Backend::Chain.new(I18n::Backend::KeyValue.new(Redis.new(url: ENV['ITPKG_REDIS_PROVIDER'])), I18n.backend)

