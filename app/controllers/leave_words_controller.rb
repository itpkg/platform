class LeaveWordsController < ApplicationController

  def create
    uri = URI 'https://www.google.com/recaptcha/api/siteverify'
    res = Net::HTTP.post_form uri,
                              secret: Setting.recaptcha_secret_key,
                              response: params['g-recaptcha-response'.to_sym],
                              remoteip: request.remote_ip

    if JSON.parse(res.body).fetch('success')
      lw = LeaveWord.new params.require(:leave_word).permit(:message)
      if lw.valid?
        lw.save
        flash[:notice] = t('status.success')
      else
        flash[:alert] = lw.errors.full_messages
      end

    else
      flash[:alert] = t('errors.not_valid_captcha')
    end
    redirect_to about_us_path
  end
end