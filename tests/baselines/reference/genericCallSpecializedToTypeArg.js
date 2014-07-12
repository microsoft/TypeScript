//// [genericCallSpecializedToTypeArg.js]
function dupe(x) {
    return x;
}
function dupeAndGetDist(x) {
    var y = dupe(x);
    y.getDist(); //<-- this requires a missing constraint, but it's not caught
    return y;
}
