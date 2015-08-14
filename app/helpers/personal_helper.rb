module PersonalHelper
  def personal_left_links
    links = []
    user = current_user
    if user
      links << {url: main_app.edit_user_registration_path, title: t('titles.personal.profile')}
      links << {url: main_app.personal_status_path, title: t('titles.personal.status')}
      if user.is_admin?
        links << {url: main_app.personal_site_path, title: t('titles.personal.site.index')}
      end

      ITPKG_MODULES.each do |en|
        if Setting["engine_#{en}_enable"]
          links << {url: eval("#{en}.personal_path"), title: t("#{en}.name")}
        end
      end
    end
    links
  end
end