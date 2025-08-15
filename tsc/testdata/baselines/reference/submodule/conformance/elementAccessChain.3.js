//// [tests/cases/conformance/expressions/optionalChaining/elementAccessChain/elementAccessChain.3.ts] ////

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
var _a, _b;
(obj === null || obj === void 0 ? void 0 : obj["a"])++;
(obj === null || obj === void 0 ? void 0 : obj.a["b"])++;
(obj === null || obj === void 0 ? void 0 : obj["a"])--;
(obj === null || obj === void 0 ? void 0 : obj.a["b"])--;
++(obj === null || obj === void 0 ? void 0 : obj["a"]);
++(obj === null || obj === void 0 ? void 0 : obj.a["b"]);
--(obj === null || obj === void 0 ? void 0 : obj["a"]);
--(obj === null || obj === void 0 ? void 0 : obj.a["b"]);
(obj === null || obj === void 0 ? void 0 : obj["a"]) = 1;
(obj === null || obj === void 0 ? void 0 : obj.a["b"]) = 1;
(obj === null || obj === void 0 ? void 0 : obj["a"]) += 1;
(obj === null || obj === void 0 ? void 0 : obj.a["b"]) += 1;
for (obj === null || obj === void 0 ? void 0 : obj["a"] in {})
    ;
for (obj === null || obj === void 0 ? void 0 : obj.a["b"] in {})
    ;
for (obj === null || obj === void 0 ? void 0 : obj["a"] of [])
    ;
for (obj === null || obj === void 0 ? void 0 : obj.a["b"] of [])
    ;
({ a: obj === null || obj === void 0 ? void 0 : obj["a"] } = { a: 1 });
({ a: obj === null || obj === void 0 ? void 0 : obj.a["b"] } = { a: 1 });
(_a = { a: 1 }, (obj === null || obj === void 0 ? void 0 : obj["a"]) = __rest(_a, []));
(_b = { a: 1 }, (obj === null || obj === void 0 ? void 0 : obj.a["b"]) = __rest(_b, []));
[...obj === null || obj === void 0 ? void 0 : obj["a"]] = [];
[...obj === null || obj === void 0 ? void 0 : obj.a["b"]] = [];
