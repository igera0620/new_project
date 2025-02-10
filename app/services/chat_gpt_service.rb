class ChatGptService
  require 'openai'

  LIMIT_COUNT = 5 # 1日5回まで
  LIMIT_TIME  = 24.hours # 1日（秒換算で 86400）

  def initialize
    @openai = OpenAI::Client.new(access_token: ENV.fetch("OPENAI_ACCESS_TOKEN"))
  end

  def self.allowed?(user)
    key = "chatgpt_usage:#{user.id}"
    count = REDIS.get(key).to_i

    if count < LIMIT_COUNT
      REDIS.incr(key) # 1回増やす
      REDIS.expire(key, LIMIT_TIME) if count == 0 # 初回なら期限をセット
      true
    else
      false
    end
  end

  def chat(prompt, user)
    return "1日の使用回数を超えました" unless self.class.allowed?(user)
    
    response = @openai.chat(
      parameters: {
        model: "gpt-3.5-turbo", # Required. # 使用するGPT-3のエンジンを指定
        messages: [{ role: "system", content: "You are a helpful assistant. response to japanese" }, { role: "user", content: prompt }],
        temperature: 0.7, # 応答のランダム性を指定
        max_tokens: 500,  # 応答の長さを指定
      },
      )
    response['choices'].first['message']['content']
  end
end
