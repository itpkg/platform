class HomeController < ApplicationController
  def index

  end

  def about_us
    @content = t('titles.about_us')
    render 'markdown', layout: 'simple'
  end

  def help
    @content = t('site.help')
    render 'markdown', layout: 'simple'
  end
end