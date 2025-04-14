//// [tests/cases/compiler/exportDefaultParenthesizeES6.ts] ////

//// [classexpr.ts]
export default (class Foo {} as any);

//// [classexpr.js]
export default (class Foo {
});
