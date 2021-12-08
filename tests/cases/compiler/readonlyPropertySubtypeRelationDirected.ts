// @strict: true
// @filename: one.ts
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
// @filename: two.ts
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

// @filename: three.ts
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

// @filename: four.ts
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