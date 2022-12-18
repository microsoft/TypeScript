//// [tests/cases/compiler/readonlyPropertySubtypeRelationDirected.ts] ////

//// [one.ts]
export {};
// When the non-readonly type is declared first, the unioned type of `three` in `doSomething` is never treated as readonly
const two: { a: string } = { a: 'two' };
const one: { readonly a: string } = { a: 'one' };

function doSomething(condition: boolean) {
    // when `one` comes first in the conditional check, the return type of `doSomething` is inferred as `a` is readonly, but `a` is
    // only treated as readonly (i.e. it will produce a diagnostic if you try to assign to it) based on the order of declarations of `one` and `two` above
    const three = (condition) ? one : two;

    three.a = 'foo';

    // the inferred (displayed?) type of `a` also depends on the order of the condition above. When `one` comes first, the displayed type is `any`
    // when `two` comes first, the displayed type is `string`, but the diagnostic will always correctly find that it's string
    three.a = 'foo2';

    return three;
}
//// [two.ts]
export {};
// When the non-readonly type is declared first, the unioned type of `three` in `doSomething` is never treated as readonly
const two: { a: string } = { a: 'two' };
const one: { readonly a: string } = { a: 'one' };

function doSomething(condition: boolean) {
    // when `two` comes first in the conditional check, the return type of `doSomething` is inferred as not readonly but produces the same diagnostics as above
    // based on the declaration order of `one` and `two`
    const three = (condition) ? two : one;

    three.a = 'foo';

    // the inferred (displayed?) type of `a` also depends on the order of the condition above. When `one` comes first, the displayed type is `any`
    // when `two` comes first, the displayed type is `string`, but the diagnostic will always correctly find that it's string
    three.a = 'foo2';

    return three;
}

//// [three.ts]
export {};
// When the readonly type is declared first, the unioned type of `three` in `doSomething` is always treated as readonly by the compiler
const one: { readonly a: string } = { a: 'one' };
const two: { a: string } = { a: 'two' };

function doSomething(condition: boolean) {
    // when `one` comes first in the conditional check, the return type of `doSomething` is inferred as `a` is readonly, but `a` is
    // only treated as readonly (i.e. it will produce a diagnostic if you try to assign to it) based on the order of declarations of `one` and `two` above
    const three = (condition) ? one : two;

    three.a = 'foo';

    // the inferred (displayed?) type of `a` also depends on the order of the condition above. When `one` comes first, the displayed type is `any`
    // when `two` comes first, the displayed type is `string`, but the diagnostic will always correctly find that it's string
    three.a = 'foo2';

    return three;
}

//// [four.ts]
export {};
// When the readonly type is declared first, the unioned type of `three` in `doSomething` is always treated as readonly by the compiler
const one: { readonly a: string } = { a: 'one' };
const two: { a: string } = { a: 'two' };

function doSomething(condition: boolean) {
    // when `two` comes first in the conditional check, the return type of `doSomething` is inferred as not readonly but produces the same diagnostics as above
    // based on the declaration order of `one` and `two`
    const three = (condition) ? two : one;

    three.a = 'foo';

    // the inferred (displayed?) type of `a` also depends on the order of the condition above. When `one` comes first, the displayed type is `any`
    // when `two` comes first, the displayed type is `string`, but the diagnostic will always correctly find that it's string
    three.a = 'foo2';

    return three;
}

//// [one.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// When the non-readonly type is declared first, the unioned type of `three` in `doSomething` is never treated as readonly
var two = { a: 'two' };
var one = { a: 'one' };
function doSomething(condition) {
    // when `one` comes first in the conditional check, the return type of `doSomething` is inferred as `a` is readonly, but `a` is
    // only treated as readonly (i.e. it will produce a diagnostic if you try to assign to it) based on the order of declarations of `one` and `two` above
    var three = (condition) ? one : two;
    three.a = 'foo';
    // the inferred (displayed?) type of `a` also depends on the order of the condition above. When `one` comes first, the displayed type is `any`
    // when `two` comes first, the displayed type is `string`, but the diagnostic will always correctly find that it's string
    three.a = 'foo2';
    return three;
}
//// [two.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// When the non-readonly type is declared first, the unioned type of `three` in `doSomething` is never treated as readonly
var two = { a: 'two' };
var one = { a: 'one' };
function doSomething(condition) {
    // when `two` comes first in the conditional check, the return type of `doSomething` is inferred as not readonly but produces the same diagnostics as above
    // based on the declaration order of `one` and `two`
    var three = (condition) ? two : one;
    three.a = 'foo';
    // the inferred (displayed?) type of `a` also depends on the order of the condition above. When `one` comes first, the displayed type is `any`
    // when `two` comes first, the displayed type is `string`, but the diagnostic will always correctly find that it's string
    three.a = 'foo2';
    return three;
}
//// [three.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// When the readonly type is declared first, the unioned type of `three` in `doSomething` is always treated as readonly by the compiler
var one = { a: 'one' };
var two = { a: 'two' };
function doSomething(condition) {
    // when `one` comes first in the conditional check, the return type of `doSomething` is inferred as `a` is readonly, but `a` is
    // only treated as readonly (i.e. it will produce a diagnostic if you try to assign to it) based on the order of declarations of `one` and `two` above
    var three = (condition) ? one : two;
    three.a = 'foo';
    // the inferred (displayed?) type of `a` also depends on the order of the condition above. When `one` comes first, the displayed type is `any`
    // when `two` comes first, the displayed type is `string`, but the diagnostic will always correctly find that it's string
    three.a = 'foo2';
    return three;
}
//// [four.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// When the readonly type is declared first, the unioned type of `three` in `doSomething` is always treated as readonly by the compiler
var one = { a: 'one' };
var two = { a: 'two' };
function doSomething(condition) {
    // when `two` comes first in the conditional check, the return type of `doSomething` is inferred as not readonly but produces the same diagnostics as above
    // based on the declaration order of `one` and `two`
    var three = (condition) ? two : one;
    three.a = 'foo';
    // the inferred (displayed?) type of `a` also depends on the order of the condition above. When `one` comes first, the displayed type is `any`
    // when `two` comes first, the displayed type is `string`, but the diagnostic will always correctly find that it's string
    three.a = 'foo2';
    return three;
}
