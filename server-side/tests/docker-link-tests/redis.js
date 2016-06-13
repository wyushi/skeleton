import redis from 'redis';
import expect from 'expect';

const redisAddr = process.env.REDIS_PORT_6379_TCP_ADDR
    , redisPort = process.env.REDIS_PORT_6379_TCP_PORT;


describe('redis test', () => {

  it('check docker env', (done) => {
    expect(redisAddr).toExist();
    expect(redisPort).toExist();
    console.log('Reids on ' + redisAddr + ':' + redisPort);
    done();
  });

  describe('db test', () => {

    var greeding = 'Hello, Skeleton',
        redisClient;

    before((done) => {
      redisClient = redis.createClient(redisPort, redisAddr);
      redisClient.on('connect', () => {
        redisClient.set('greeding', greeding);
        done();
      });
    });

    it('read test', (done) => {
      var greedingMsg = new Promise((resolve, reject) => {
        redisClient.get('greeding', (err, msg) => {
          if (err) { reject(err); }
          else resolve(msg);
        });
      });

      greedingMsg.then((msg) => {
        expect(msg).toEqual(greeding);
        done();
      });
    });
  });
});

