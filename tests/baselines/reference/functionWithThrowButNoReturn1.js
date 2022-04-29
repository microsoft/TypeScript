//// [functionWithThrowButNoReturn1.ts]
function fn(): number {
  throw new Error('NYI');
  var t;
}


//// [functionWithThrowButNoReturn1.js]
function fn() {
    throw new Error('NYI');
    var t;
}
