//// [noImplicitAnyStringIndexerOnObject.ts]
var a = {}["hello"];
var b: string = { '': 'foo' }[''];

// Should give suggestion 'c.get'
var c = {
  get: (key: string) => 'foobar'
};
c['hello'];

// Should give suggestion 'd.set'
var d = {
  set: (key: string) => 'foobar'
};
d['hello'];

// Should give suggestion 'e.get or e.set'
var e = {
  set: (key: string) => 'foobar',
  get: (key: string) => 'foobar'
};
e['hello'];


//// [noImplicitAnyStringIndexerOnObject.js]
var a = {}["hello"];
var b = { '': 'foo' }[''];
// Should give suggestion 'c.get'
var c = {
    get: function (key) { return 'foobar'; }
};
c['hello'];
// Should give suggestion 'd.set'
var d = {
    set: function (key) { return 'foobar'; }
};
d['hello'];
// Should give suggestion 'e.get or e.set'
var e = {
    set: function (key) { return 'foobar'; },
    get: function (key) { return 'foobar'; }
};
e['hello'];
