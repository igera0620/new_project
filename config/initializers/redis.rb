require 'redis'

REDIS = Redis.new(url: ENV.fetch('REDIS_URL', 'rediss://default:AUUdAAIjcDEzMDdmODRlMDRlYWU0Y2NiYTI4ZDAwYjU4NDk1YzM4Y3AxMA@loving-dingo-17693.upstash.io:6379'))
