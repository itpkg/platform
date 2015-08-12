class Setting < RailsSettings::CachedSettings

  def self.site_info(key, val=nil)
    key = "#{I18n.locale}://site/#{key}"
    if val
      Setting[key] = val
    else
      Setting[key]
    end

  end
end
