Config.setup do |config|
  config.const_name = 'Settings'
end

Rails.application.reloader.to_prepare do
  puts "===== TEST SETTINGS CHECK ====="
  puts "Settings.sorcery: #{Settings.sorcery.inspect}"
  puts "Settings.sorcery.line_callback_url: #{Settings.sorcery.line_callback_url.inspect}"
  puts "================================"
end
