//@noImplicitAny: true

// verify no noImplictAny errors reported with cast expression

interface IFoo {
    a: number;
    b: string;
}

// Expr type not assignable to target type
(<IFoo>{ a: null });

// Expr type assignanle to target type
(<IFoo>{ a: 2, b: undefined });

// Niether types is assignable to each other
(<IFoo>{ c: null });