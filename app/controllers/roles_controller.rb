class RolesController < ApplicationController
  layout false
  before_action :check_permissions

  def create
    name = params[:name]
    if params[:allocate] == '1'
      if name == 'root'
        render json: {ok: false, message: t('errors.bad_operation')}
      else
        User.find(params[:user_id]).add_role name
        render json: {ok: true, message: t('status.success')}
      end
    else
      u = User.find(params[:user_id])
      if name == 'root' || u.is_root?
        render json: {ok: true, message: t('errors.bad_operation')}
      else
        u.remove_role name
        render json: {ok: false, message: t('status.failed')}
      end
    end

  end

  def destroy
    r = Role.find params[:id]
    if r
      if %w(admin root).include?(r.name)
        render json: {ok: false, message: t('errors.bad_operation')}
      else
        r.destroy
        render json: {ok: true, message: t('status.success')}
      end
    else
      render json: {ok: false, message: t('status.failed')}
    end
  end

  private
  def check_permissions
    authorize! :admin, nil
  end
end