function dupe<T>(x: T): T {
  return x;
}
function dupeAndGetDist<U>(x: U): U {
  var y = dupe(x); //<-- dupe has incorrect type here
  y.getDist();     //<-- this requires a missing constraint, but it's not caught
  return y;
}
