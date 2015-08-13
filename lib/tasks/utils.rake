require 'json'
require 'open-uri'

def http_json_get(url)
  JSON.parse Net::HTTP.get(URI(url))
end