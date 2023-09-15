// @target: esnext
// @module: commonjs
// @noTypesAndSymbols: true

declare var _: any;

{
    var a = _;
}

if (_) {
    var b = _;
}
else {
    var c = _;
}

switch (_) {
    case _:
        var d = _;
    default:
        var e = _;
}

while (_) {
    var f = _;
}

do {
    var g = _;
}
while (_);

for (var h = _; ;) {
    break;
}

for (; ;) {
    var m = _;
    break;
}

for (var n in _) break;

for (_ in _) {
    var o = _;
}

for (var p of _) break;

for (_ of _) {
    var u = _;
}

try {
    var v = _;
}
catch {
    var w = _;
}

label: {
    var x = _;
    break label;
}

// @ts-ignore
with (_) {
    var y = _;
}

var z = _;

export { a, b, c, d, e, f, g, h, m, n, o, p, u, v, w, x, y, z };