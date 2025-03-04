class ChatGptService
  require 'openai'

  LIMIT_COUNT = 5
  LIMIT_TIME  = 24.hours

  def initialize
    @openai = OpenAI::Client.new(access_token: ENV.fetch("OPENAI_ACCESS_TOKEN"))
  end

  def self.allowed?(user)
    key = "chatgpt_usage:#{user.id}"
    count = REDIS.get(key).to_i

    if count < LIMIT_COUNT
      REDIS.incr(key)
      REDIS.expire(key, LIMIT_TIME) if count == 0
      true
    else
      false
    end
  end

  def self.remaining_requests(user)
    key = "chatgpt_usage:#{user.id}"
    count = REDIS.get(key).to_i
    LIMIT_COUNT - count
  end

  def chat(prompt, user)
    return "1日の使用回数を超えました" unless self.class.allowed?(user)
    
    response = @openai.chat(
      parameters: {
        model: "gpt-3.5-turbo",
        messages: [{ role: "system", content: "You are a helpful assistant. response to japanese" }, { role: "user", content: prompt }],
        temperature: 0.7,
        max_tokens: 500,
      },
      )
    response['choices'].first['message']['content']
  end
end
