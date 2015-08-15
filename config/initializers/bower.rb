# Bower asset paths
Rails.application.root.join('vendor', 'assets', 'bower_components').to_s.tap do |bower_path|
  Rails.application.config.sass.load_paths << bower_path
  Rails.application.config.assets.paths << bower_path
end
# Precompile Bootstrap fonts
Rails.application.config.assets.precompile << %r(bootstrap-sass/assets/fonts/bootstrap/[\w-]+\.(?:eot|svg|ttf|woff2?)$)
# Minimum Sass number precision required by bootstrap-sass
::Sass::Script::Value::Number.precision = [8, ::Sass::Script::Value::Number.precision].max

if Rails.env.development?
  Rails.application.config.assets.precompile += %w( react/JSXTransformer.js )
end

Rails.application.config.assets.precompile += %w(us cn).map { |img| "famfamfam-flags/dist/png/#{img}.png" }
Rails.application.config.assets.precompile += %w(sitemap rss).map { |img| "famfamfam-silk/dist/png/#{img}.png" }
