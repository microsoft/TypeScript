//// [tests/cases/compiler/narrowingRestGenericCall.ts] ////

//// [narrowingRestGenericCall.ts]
interface Slugs {
  foo: string;
  bar: string;
}

function call<T extends object>(obj: T, cb: (val: T) => void) {
  cb(obj);
}

declare let obj: Slugs;
call(obj, ({foo, ...rest}) => {
  console.log(rest.bar);
});

//// [narrowingRestGenericCall.js]
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
function call(obj, cb) {
    cb(obj);
}
call(obj, function (_a) {
    var foo = _a.foo, rest = __rest(_a, ["foo"]);
    console.log(rest.bar);
});
