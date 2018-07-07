//// [tests/cases/conformance/removeWhitespace/removeWhitespaceAndComments.outDir.ts] ////

//// [global.d.ts]
declare let obj: any, i: any, fn;

//// [propertyAccess.ts]
obj.a
obj .a
obj. a
obj . a

obj.
    a

obj
    .a

obj
    .
    a

obj // comment
    . // comment
    a // comment

obj /* comment */
    . /* comment */
    a /* comment */

1..valueOf
1.. valueOf
1. .valueOf
1. . valueOf
1 .valueOf
1 . valueOf

1..
    valueOf

1.
    .valueOf

1.
    .
    valueOf

1. // comment
    . // comment
    valueOf // comment

1. /* comment */
    . /* comment */
    valueOf /* comment */

1
    .valueOf

1
    .
    valueOf

1 // comment
    . // comment
    valueOf // comment

1 /* comment */
    . /* comment */
    valueOf /* comment */

//// [elementAccess.ts]
obj["a"]
obj [ "a" ]

obj [
    "a" ]

obj
    [
    "a"
    ]

obj // comment
    [ // comment
    "a" // comment
    ] // comment

obj /* comment */
    [ /* comment */
    "a" /* comment */
    ] /* comment */

//// [update.ts]
i + + i
i + +i
i+ + i
i+ +i

i + ++ i
i + ++i
i+ ++ i
i+ ++i

i ++ + i
i ++ +i
i++ + i
i++ +i
i+++i

i - - i
i - -i
i- - i
i- -i

i - -- i
i - --i
i- -- i
i- --i

i -- - i
i -- -i
i-- - i
i-- -i
i---i

//// [switch.ts]
switch (i) {
    case 0: break;
    case 1: break;
    default: break;
}

//// [keywords.ts]
delete obj.a
delete (obj).a
delete [][0]
void obj.a
void (obj).a
void [][0]
typeof obj.a
typeof (obj).a
typeof [][0]
function f1() {
    return typeof obj
}
async function* f2() {
    yield 1
    yield obj
    yield (obj)
    yield []
    yield* []
    yield *[]
    yield * []
    yield
    i
    yield yield
    yield typeof obj
    yield void obj
    yield delete obj.a
    await 1
    await obj
    for await (const x of []);
    return yield await obj
}
export class C {}
export default function() {}

//// [statements.ts]
obj;
fn();
;
function fn3() {
    obj;
    fn();
    ;
    function f() {}
    return;
    function g() {}
}

//// [variables.ts]
var a = 0, b, { c } = obj, [d] = obj;
let e = 0, f, { g } = obj, [h] = obj;

//// [propertyAccess.js]
obj.a;obj.a;obj.a;obj.a;obj.a;obj.a;obj.a;obj.a;obj.a;1..valueOf;1..valueOf;1..valueOf;1..valueOf;1..valueOf;1..valueOf;1..valueOf;1..valueOf;1..valueOf;1..valueOf;1..valueOf;1..valueOf;1..valueOf;1..valueOf;1..valueOf;
//# sourceMappingURL=propertyAccess.js.map
//// [elementAccess.js]
obj["a"];obj["a"];obj["a"];obj["a"];obj["a"];obj["a"];
//# sourceMappingURL=elementAccess.js.map
//// [update.js]
i+ +i;i+ +i;i+ +i;i+ +i;i+ ++i;i+ ++i;i+ ++i;i+ ++i;i+++i;i+++i;i+++i;i+++i;i+++i;i- -i;i- -i;i- -i;i- -i;i- --i;i- --i;i- --i;i- --i;i---i;i---i;i---i;i---i;i---i;
//# sourceMappingURL=update.js.map
//// [switch.js]
switch(i){case 0:break;case 1:break;default:break}
//# sourceMappingURL=switch.js.map
//// [keywords.js]
delete obj.a;delete(obj).a;delete[][0];void obj.a;void(obj).a;void[][0];typeof obj.a;typeof(obj).a;typeof[][0];function f1(){return typeof obj}async function*f2(){yield 1;yield obj;yield(obj);yield[];yield*[];yield*[];yield*[];yield;i;yield yield;yield typeof obj;yield void obj;yield delete obj.a;await 1;await obj;for await(const x of[]);return yield await obj}export class C{}export default function(){}
//# sourceMappingURL=keywords.js.map
//// [statements.js]
obj;fn();function fn3(){obj;fn();function f(){}return;function g(){}}
//# sourceMappingURL=statements.js.map
//// [variables.js]
var a=0,b,{c}=obj,[d]=obj;let e=0,f,{g}=obj,[h]=obj;
//# sourceMappingURL=variables.js.map