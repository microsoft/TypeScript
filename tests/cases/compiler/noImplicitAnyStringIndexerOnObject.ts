// @noimplicitany: true

var a = {}["hello"];
var b: string = { '': 'foo' }[''];

var c = {
  get: (key: string) => 'foobar'
};
c['hello'];

var d = {
  set: (key: string) => 'foobar'
};
d['hello'];

var e = {
  set: (key: string) => 'foobar',
  get: (key: string) => 'foobar'
};
e['hello'];
