class HomeController < ApplicationController
  def index
    render 'index', layout: 'simple'
  end

  def about_us
    @leave_word = LeaveWord.new
    @content = t('site.about_us')
    @title = t('titles.about_us')
    render 'about_us', layout: 'simple'
  end

  def help
    @content = t('site.help')
    @title = t('titles.help')
    render 'markdown', layout: 'simple'
  end
end