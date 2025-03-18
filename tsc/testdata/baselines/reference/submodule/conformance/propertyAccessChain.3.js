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
for (obj?.a in {})
    ;
for (obj?.a.b in {})
    ;
for (obj?.a of [])
    ;
for (obj?.a.b of [])
    ;
({ a: obj?.a } = { a: 1 });
({ a: obj?.a.b } = { a: 1 });
({ ...obj?.a } = { a: 1 });
({ ...obj?.a.b } = { a: 1 });
[...obj?.a] = [];
[...obj?.a.b] = [];
