module ApplicationHelper


  def md2html(text)
    markdown = Redcarpet::Markdown.new(Redcarpet::Render::HTML, autolink: true, tables: true)
    markdown.render text
  end

  def top_nav_items
    links = []
    Rails.configuration.x.engines.map do |en|
      puts '#'*80, en
      links << {url: send(en).root_path, title: t("#{en}.title")}
    end
    # ITPKG_MODULES.each do |en|
    #   # if Setting["engine_#{en}_enable"]
    #   #   puts '#'*80, "#{en}.root_path"
    #   #
    #   #
    #   # end
    # end
    links
  end
end
