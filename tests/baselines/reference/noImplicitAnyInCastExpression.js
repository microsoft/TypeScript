//// [noImplicitAnyInCastExpression.ts]
// verify no noImplictAny errors reported with cast expression

interface IFoo {
    a: number;
    b: string;
}

// Expr type not assignable to target type
(<IFoo>{ a: null });

// Expr type assignable to target type
(<IFoo>{ a: 2, b: undefined });

// Neither types is assignable to each other
(<IFoo>{ c: null });

//// [noImplicitAnyInCastExpression.js]
// verify no noImplictAny errors reported with cast expression
// Expr type not assignable to target type
({ a: null });
// Expr type assignable to target type
({ a: 2, b: undefined });
// Neither types is assignable to each other
({ c: null });
