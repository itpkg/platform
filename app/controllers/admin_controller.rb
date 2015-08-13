class AdminController < ApplicationController
  before_filter :check_permissions
  layout false

  def keys

  end

  def info
    if request.method == 'POST'
      %w(title keywords description about_us help copyright_html).each do |k|
        val = params[k.to_sym]
        if val
          I18n.backend.store_translations(I18n.locale, {"site.#{k}" => val}, escape: false)
        end

      end
      render json: {ok: true, message: t('status.success')}
    end
  end

  def seo

  end

  private
  def check_permissions
    authorize! :admin, nil
  end
end