import expect from 'expect';
import randomString from '../random-string.js';

describe('Util Random String Test', () => {
  it('length', (done) => {
    const str = randomString(10);
    expect(str.length).toBe(10);
    done();
  });

  it('base', (done) => {
    const base = '01',
          str = randomString(10, base),
          chars = str.split('');
    for (var i = chars.length - 1; i >= 0; i--) {
      var index = base.indexOf(chars[i]);
      expect(index).toBeGreaterThanOrEqualTo(0);
    }
    done();
  });
});
