class NoticesController < ApplicationController
  before_filter :check_permissions
  layout false

  def index
    @notices = Notice.where(lang: I18n.locale).order('id DESC')
  end


  def destroy
    n = Notice.find(params[:id])
    if n
      n.destroy
    end
  end

  private
  def check_permissions
    authorize! :admin, nil
  end
end