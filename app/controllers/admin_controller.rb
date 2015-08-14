class AdminController < ApplicationController
  before_filter :check_permissions
  layout false

  def status
    dbc = Rails.configuration.database_configuration[Rails.env]
    @database = "#{dbc['adapter']}://#{dbc['username']}@#{dbc['host']}:#{dbc['port']}/#{dbc['database']}"
    @redis = Redis.new(url: ENV['ITPKG_REDIS_PROVIDER']).info
  end

  def favicon
    if request.method == 'POST'
      fav = params[:favicon]
      if fav
        case fav.content_type
          when 'image/x-icon'
            Setting.favicon = {body: fav.read, type: fav.content_type, rel: 'shortcut icon', href: '/favicon.ico'}
            flash[:notice] = t 'status.success'
          when 'image/png'
            Setting.favicon = {body: fav.read, type: fav.content_type, rel: 'apple-touch-icon', href: '/favicon.png'}
            flash[:notice] = t 'status.success'
          else
            flash[:alert] = t 'errors.bad_type', type: fav.content_type
        end
      else
        flash[:alert] = t 'status.failed'
      end

      redirect_to personal_site_path
    end
  end

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