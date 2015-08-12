class HomeController < ApplicationController
  def index

  end

  def about_us
    @content = Setting.site_info('about_us') || "## #{t('titles.about_us')}"
    render 'markdown', layout: 'simple'
  end

  def help
    @content = Setting.site_info('help') || "## #{t('titles.help')}"
    render 'markdown', layout: 'simple'
  end
end