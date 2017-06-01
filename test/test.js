let path = require('path')

let test = require('test');
test.setup();

let fiw = require('../lib/index')

describe('json, test', () => {
    it('test json', () => {
      var json = fiw('json')
      var txt = json.minify(`{"a":1}/*abc*/`)
      assert.equal(txt, `{"a":1}`);

      var json2 = fiw.json
      var txt2 = json.minify(`{"a":1}/*abc*/`)
      assert.equal(txt2, `{"a":1}`);

      console.error(fiw.xx)
    });

});

test.run();