Config.setup do |config|
  config.const_name = 'Settings'
end

Rails.application.reloader.to_prepare do
  Rails.logger.debug "===== TEST SETTINGS CHECK ====="
  Rails.logger.debug { "Settings.sorcery: #{Settings.sorcery.inspect}" }
  Rails.logger.debug { "Settings.sorcery.line_callback_url: #{Settings.sorcery.line_callback_url.inspect}" }
  Rails.logger.debug "================================"
end
