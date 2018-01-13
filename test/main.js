#!/usr/local/bin/fibjs

var test = require("test");
test.setup();

run('./test')
run('./db/test')
run('./json/test')
run('./kv/test')

test.run(console.DEBUG);