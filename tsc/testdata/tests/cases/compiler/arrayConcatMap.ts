// @target: es2015
var x = [].concat([{ a: 1 }], [{ a: 2 }])
          .map(b => b.a);