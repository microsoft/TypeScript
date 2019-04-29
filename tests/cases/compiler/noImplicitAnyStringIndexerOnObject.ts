// @noimplicitany: true

var a = {}["hello"];
var b: string = { '': 'foo' }[''];

var c = {
  get: (key: string) => 'foobar'
};
c['hello'];
const foo = c['hello'];

var d = {
  set: (key: string) => 'foobar'
};
const bar = d['hello'];

var e = {
  set: (key: string) => 'foobar',
  get: (key: string) => 'foobar'
};
e['hello'] = 'modified';
e['hello'] += 1;
e['hello'] ++;

