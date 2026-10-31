//// [tests/cases/compiler/declarationEmitInaccessibleHeritageType.ts] ////

//// [interface.ts]
label: interface I {}
export interface J extends I {}

//// [implements.ts]
label: interface I {}
export class C implements I {}

//// [typeArgument.ts]
label: interface I {}
interface Base<T> {}
export interface J extends Base<I> {}

//// [namedClassExpression.ts]
label: interface I {}
export default (class C implements I {});

//// [anonymousClassExpression.ts]
label: interface I {}
export default (class implements I {});


//// [interface.js]
label: ;
export {};
//// [implements.js]
label: ;
export class C {
}
//// [typeArgument.js]
label: ;
export {};
//// [namedClassExpression.js]
label: ;
export default (class C {
});
//// [anonymousClassExpression.js]
label: ;
export default (class {
});
