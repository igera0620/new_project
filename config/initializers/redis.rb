require 'redis'

REDIS = Redis.new(url: ENV.fetch('REDIS_URL', 'rediss://default:AT9bAAIjcDE4YTVjMzNkOThiNjM0NzE2OGY0NDM4ZGZiNDUzZTAzMnAxMA@pleased-marten-16219.upstash.io:6379'))
