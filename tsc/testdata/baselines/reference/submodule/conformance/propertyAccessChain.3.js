//// [tests/cases/conformance/expressions/optionalChaining/propertyAccessChain/propertyAccessChain.3.ts] ////

//// [propertyAccessChain.3.ts]
declare const obj: any;

obj?.a++;
obj?.a.b++;
obj?.a--;
obj?.a.b--;

++obj?.a;
++obj?.a.b;
--obj?.a;
--obj?.a.b;

obj?.a = 1;
obj?.a.b = 1;
obj?.a += 1;
obj?.a.b += 1;

for (obj?.a in {});
for (obj?.a.b in {});
for (obj?.a of []);
for (obj?.a.b of []);

({ a: obj?.a } = { a: 1 });
({ a: obj?.a.b } = { a: 1 });
({ ...obj?.a } = { a: 1 });
({ ...obj?.a.b } = { a: 1 });
[...obj?.a] = [];
[...obj?.a.b] = [];


//// [propertyAccessChain.3.js]
(obj === null || obj === void 0 ? void 0 : obj.a)++;
(obj === null || obj === void 0 ? void 0 : obj.a.b)++;
(obj === null || obj === void 0 ? void 0 : obj.a)--;
(obj === null || obj === void 0 ? void 0 : obj.a.b)--;
++(obj === null || obj === void 0 ? void 0 : obj.a);
++(obj === null || obj === void 0 ? void 0 : obj.a.b);
--(obj === null || obj === void 0 ? void 0 : obj.a);
--(obj === null || obj === void 0 ? void 0 : obj.a.b);
(obj === null || obj === void 0 ? void 0 : obj.a) = 1;
(obj === null || obj === void 0 ? void 0 : obj.a.b) = 1;
(obj === null || obj === void 0 ? void 0 : obj.a) += 1;
(obj === null || obj === void 0 ? void 0 : obj.a.b) += 1;
for (obj === null || obj === void 0 ? void 0 : obj.a in {})
    ;
for (obj === null || obj === void 0 ? void 0 : obj.a.b in {})
    ;
for (obj === null || obj === void 0 ? void 0 : obj.a of [])
    ;
for (obj === null || obj === void 0 ? void 0 : obj.a.b of [])
    ;
({ a: obj === null || obj === void 0 ? void 0 : obj.a } = { a: 1 });
({ a: obj === null || obj === void 0 ? void 0 : obj.a.b } = { a: 1 });
({ ...obj === null || obj === void 0 ? void 0 : obj.a } = { a: 1 });
({ ...obj === null || obj === void 0 ? void 0 : obj.a.b } = { a: 1 });
[...obj === null || obj === void 0 ? void 0 : obj.a] = [];
[...obj === null || obj === void 0 ? void 0 : obj.a.b] = [];
