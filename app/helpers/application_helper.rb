module ApplicationHelper
  def top_nav_items
    user = current_user
    links = [
    ]
    if user
      links << {url:personal_path, title:t('titles.personal.index')}
    end
    links
  end
end
