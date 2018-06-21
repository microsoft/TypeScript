//// [higherKindedTypesExpectedErrors.ts]
interface Functor<FX<_TX>, AX> {
    map<BX>(fmapx: (fmapxax: AX) => BX): FX<BX>;
}

// Expect error since array doesn't have xVal property
interface FunctorX<A> extends Functor<FunctorX, A> {
    map<B>(f: (a: A) => B): Array<B>;
    xVal: string;
}


//// [higherKindedTypesExpectedErrors.js]
