module ApplicationHelper


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
