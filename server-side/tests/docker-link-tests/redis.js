import redis from 'redis';
import expect from 'expect';

const redisHost = 'redis'
    , redisPort = 6379;


describe('redis test', () => {

  it('check docker env', (done) => {
    expect(redisHost).toExist();
    expect(redisPort).toExist();
    console.log('Reids on ' + redisHost + ':' + redisPort);
    done();
  });

  describe('db test', () => {

    var greeding = 'Hello, Skeleton',
        redisClient;

    before((done) => {
      redisClient = redis.createClient(redisPort, redisHost);
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

