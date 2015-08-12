module ApplicationHelper
  def site_info(key, html = false)
    Setting.site_info(key) || t("site.#{key}#{'_html' if html}")
  end

  def md2html(text)
    markdown = Redcarpet::Markdown.new(Redcarpet::Render::HTML, autolink: true, tables: true)
    markdown.render text
  end

  def top_nav_items
    user = current_user
    links = [
    ]
    if user

    end
    links
  end
end
