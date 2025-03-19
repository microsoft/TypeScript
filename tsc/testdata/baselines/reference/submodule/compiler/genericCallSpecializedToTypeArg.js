//// [tests/cases/compiler/genericCallSpecializedToTypeArg.ts] ////

//// [genericCallSpecializedToTypeArg.ts]
function dupe<T>(x: T): T {
  return x;
}
function dupeAndGetDist<U>(x: U): U {
  var y = dupe(x); //<-- dupe has incorrect type here
  y.getDist();     //<-- this requires a missing constraint, but it's not caught
  return y;
}


//// [genericCallSpecializedToTypeArg.js]
function dupe(x) {
    return x;
}
function dupeAndGetDist(x) {
    var y = dupe(x); //<-- dupe has incorrect type here
    y.getDist(); //<-- this requires a missing constraint, but it's not caught
    return y;
}
