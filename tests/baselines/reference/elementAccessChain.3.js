//// [elementAccessChain.3.ts]
declare const obj: any;

obj?.["a"]++;
obj?.a["b"]++;
obj?.["a"]--;
obj?.a["b"]--;

++obj?.["a"];
++obj?.a["b"];
--obj?.["a"];
--obj?.a["b"];

obj?.["a"] = 1;
obj?.a["b"] = 1;
obj?.["a"] += 1;
obj?.a["b"] += 1;

for (obj?.["a"] in {});
for (obj?.a["b"] in {});
for (obj?.["a"] of []);
for (obj?.a["b"] of []);

({ a: obj?.["a"] } = { a: 1 });
({ a: obj?.a["b"] } = { a: 1 });
({ ...obj?.["a"] } = { a: 1 });
({ ...obj?.a["b"] } = { a: 1 });
[...obj?.["a"]] = [];
[...obj?.a["b"]] = [];


//// [elementAccessChain.3.js]
"use strict";
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
(obj !== null && obj !== void 0 ? obj["a"] : void 0)++;
(obj !== null && obj !== void 0 ? obj.a["b"] : void 0)++;
(obj !== null && obj !== void 0 ? obj["a"] : void 0)--;
(obj !== null && obj !== void 0 ? obj.a["b"] : void 0)--;
++(obj !== null && obj !== void 0 ? obj["a"] : void 0);
++(obj !== null && obj !== void 0 ? obj.a["b"] : void 0);
--(obj !== null && obj !== void 0 ? obj["a"] : void 0);
--(obj !== null && obj !== void 0 ? obj.a["b"] : void 0);
obj !== null && obj !== void 0 ? obj["a"] : void 0 = 1;
obj !== null && obj !== void 0 ? obj.a["b"] : void 0 = 1;
obj !== null && obj !== void 0 ? obj["a"] : void 0 += 1;
obj !== null && obj !== void 0 ? obj.a["b"] : void 0 += 1;
for (obj !== null && obj !== void 0 ? obj["a"] : void 0 in {})
    ;
for (obj !== null && obj !== void 0 ? obj.a["b"] : void 0 in {})
    ;
for (var _i = 0, _a = []; _i < _a.length; _i++) {
    obj !== null && obj !== void 0 ? obj["a"] : void 0 = _a[_i];
    ;
}
for (var _b = 0, _c = []; _b < _c.length; _b++) {
    obj !== null && obj !== void 0 ? obj.a["b"] : void 0 = _c[_b];
    ;
}
(obj !== null && obj !== void 0 ? obj["a"] : void 0 = { a: 1 }.a);
(obj !== null && obj !== void 0 ? obj.a["b"] : void 0 = { a: 1 }.a);
(obj !== null && obj !== void 0 ? obj["a"] : void 0 = __rest({ a: 1 }, []));
(obj !== null && obj !== void 0 ? obj.a["b"] : void 0 = __rest({ a: 1 }, []));
obj !== null && obj !== void 0 ? obj["a"] : void 0 = [].slice(0);
obj !== null && obj !== void 0 ? obj.a["b"] : void 0 = [].slice(0);
