module ApplicationHelper


  def md2html(text)
    markdown = Redcarpet::Markdown.new(Redcarpet::Render::HTML, autolink: true, tables: true)
    markdown.render text
  end

  def top_nav_items
    links = []
    ITPKG_MODULES.each do |en|
      if Setting["engine_#{en}_enable"]
        links << {url: eval("#{en}.root_path"), title: t("#{en}.title")}
      end
    end
    links
  end
end
