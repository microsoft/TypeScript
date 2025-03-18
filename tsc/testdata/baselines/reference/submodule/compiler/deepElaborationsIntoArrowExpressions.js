//// [tests/cases/compiler/deepElaborationsIntoArrowExpressions.ts] ////

//// [deepElaborationsIntoArrowExpressions.ts]
const a: {
    y(): "a"
} = {
    y: () => "b"
};

interface Foo {
    a: number;
}

function foo1(): () => Foo {
    return () => ({a: ''});
}

function foo3(): Foo[] {
    return [{a: ''}];
}
var y: Foo[] = [{a: ''}]

//// [deepElaborationsIntoArrowExpressions.js]
const a = {
    y: () => "b"
};
function foo1() {
    return () => ({ a: '' });
}
function foo3() {
    return [{ a: '' }];
}
var y = [{ a: '' }];
