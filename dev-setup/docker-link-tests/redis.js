var redis = require('redis')
  , redisAddr = process.env.REDIS_PORT_6379_TCP_ADDR
  , redisPort = process.env.REDIS_PORT_6379_TCP_PORT
  , redisClient = redis.createClient(redisPort, redisAddr);


redisClient.on('connect', () => {
  console.log('connect');
  redisClient.set('greeding', 'Hello, Skeleton');
  redisClient.get('greeding', (err, reply) => {
    console.log(reply);
  });
});
