
let test = require('test');
test.setup();

let KV = require('../../lib/kv')

describe('kv, test', () => {
    it('test kv', () => {
      var kv = KV();
      kv.abc = 'abc';
      kv.c = {c:1, d: 'def'}
      assert.equal(kv.abc, 'abc');
      assert.equal(kv.c.d, 'def');
      assert.equal(kv.get('abc'), 'abc');

      assert.equal(kv.has('abc'), true);
      assert.equal(kv.has('uvw'), false);
      
      for(var k in kv) {
        if(k != 'abc' && k != 'c') {
          assert.ok(false);
        }
      }
      //console.debug('kv:', kv)

      var kv2 = KV();
      kv2.abc = 'abc';
      assert.equal(kv2.abc, 'abc');
      kv2.abc = '123';
      assert.notEqual(kv2.abc, kv.abc);
    });


    it('test constructor', () => {
      var kv = KV({
        abc: 'abc',
        c: {d:123},
        d: '1,2,3'
      });
      assert.equal(kv.abc, 'abc');
      assert.equal(kv.c.d, 123);
      assert.equal(kv.get('d', v=>{return v.split(/,/)[1]}), 2);
      
      //console.debug('get/set')
      var map = {a: 'abc', b: 123}
      var kv3 = KV({
        get: k => { return map[k] },
        set: (k,v) => {map[k] = v}
      });

      assert.equal(kv3.a, 'abc');
      assert.equal(kv3.b, 123);
      assert.equal(kv3.get('b'), 123);

      kv3.c = 'c3p0';
      kv3.d = {dd: 321}
      assert.equal(kv3.c, 'c3p0');
      assert.equal(kv3.c, map.c);
      assert.equal(kv3.d.dd, 321);
      assert.equal(kv3.d.dd, map.d.dd);

      map.x = 'xyz';
      assert.equal(kv3.x, 'xyz'); // ...
      assert.equal(kv3.x, 'xyz');
      
    });


    it('test has', () => {
      var kv = KV();
      kv.abc = 'abc';

      assert.equal(kv.has('abc'), true);
      assert.equal(kv.has('uvw'), false);

      var map = {a: 'abc', b: 123}
      var kv3 = KV({
        get: k => { return map[k] },
        set: (k,v) => {map[k] = v},
        has: k => { if(k == '108') return true; else if(k=='1024') return false; return k in map;}
      });
      assert.equal(kv3.has('b'), true);
      assert.equal(kv3.has('uvw'), false);
      assert.equal(kv3.has('108'), true);
      assert.equal(kv3.has('1024'), false);
    });

});

test.run();