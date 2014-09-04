//// [noImplicitAnyInCastExpression.ts]
interface IBar {
    b: number;
}
interface IFoo {
    p: IBar[];
}

function foo(a: any) { }

foo(<IFoo> {
    p: null,
});

//// [noImplicitAnyInCastExpression.js]
function foo(a) {
}
foo({
    p: null
});
