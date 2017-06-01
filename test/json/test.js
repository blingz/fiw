let path = require('path')

let test = require('test');
test.setup();

let json = require('../../lib/json')

describe('json, test', () => {
    it('test json', () => {
      var txt = json.minify(`{"a":1}/*abc*/`)
      assert.equal(txt, `{"a":1}`);

      var data = json.readFile(__dirname + '/test')
      //console.debug(data)
      assert.equal(data.abc, 'abc');
      assert.equal(data.x, 123);
      assert.equal(data.y.test, 'test');
    });

});

test.run();