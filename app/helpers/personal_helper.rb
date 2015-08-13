module PersonalHelper
  def personal_left_links
    links = []
    user = current_user
    if user
      links << {url: edit_user_registration_path, title: t('titles.personal.profile')}
      links << {url: personal_status_path, title: t('titles.personal.status')}
      # if user.admin?
      #
      # end
    end
    links
  end
end