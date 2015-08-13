class AdminController < ApplicationController
  before_filter :check_permissions
  layout false

  def errors
    if request.method == 'POST'
      %w(http_404 http_422 http_500).each do |k|
        val = params[k.to_sym]
        if val
          Setting[k] = val
        end
      end
      render json: {ok: true, message: t('status.success')}
    end
  end
  def keys
    if request.method == 'POST'
      %w(youtube_key recaptcha_site_key recaptcha_secret_key).each do |k|
        val = params[k.to_sym]
        if val
          Setting[k] = val
        end

      end
      render json: {ok: true, message: t('status.success')}
    end
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
    if request.method == 'POST'
      %w(baidu_site_id google_site_id robots_txt).each do |k|
        val = params[k.to_sym]
        if val
          Setting[k] = val
        end

      end
      render json: {ok: true, message: t('status.success')}
    end
  end

  private
  def check_permissions
    authorize! :admin, nil
  end
end