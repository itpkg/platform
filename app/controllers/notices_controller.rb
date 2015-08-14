class NoticesController < ApplicationController
  before_filter :check_permissions
  layout false

  def new
    @notice = Notice.new
  end

  def create
    n = Notice.new params.require(:notice).permit(:message)
    n.user_id = current_user.id
    n.lang = I18n.locale
    if n.valid?
      n.save
      render json: {ok: true, message: t('status.success')}
    else
      render json: {ok: false, message: n.errors.full_messages}
    end

  end

  def edit
    @notice = Notice.find params[:id]
  end

  def update
    n = Notice.find params[:id]
    if n.update(params.require(:notice).permit(:message))
      render json: {ok: true, message: t('status.success')}
    else
      render json: {ok: false, message: n.errors.full_messages}
    end
  end

  def destroy
    n = Notice.find(params[:id])
    if n
      n.destroy
    end
    render json: {ok: true, message: t('status.success')}
  end

  private
  def check_permissions
    authorize! :admin, nil
  end
end