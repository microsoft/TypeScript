//// [tests/cases/conformance/types/rest/objectRestReadonly.ts] ////

//// [objectRestReadonly.ts]
// #23734
type ObjType = {
  foo: string
  baz: string
  quux: string
}

const obj: Readonly<ObjType> = {
  foo: 'bar',
  baz: 'qux',
  quux: 'quuz',
}

const { foo, ...rest } = obj

delete rest.baz


//// [objectRestReadonly.js]
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
var obj = {
    foo: 'bar',
    baz: 'qux',
    quux: 'quuz',
};
var foo = obj.foo, rest = __rest(obj, ["foo"]);
delete rest.baz;
