// @strict: true
// @noEmit: true

// Repro from #53970

export interface TypeLambda {
    readonly A: unknown;
}

export interface TypeClass<F extends TypeLambda> {
    readonly _F: F;
}

export type Apply<F extends TypeLambda, A> = F extends { readonly type: unknown }
    ? (F & { readonly A: A })['type']
    : { readonly F: F, readonly A: A };

export interface T<A> {
    value: A;
}

export interface TTypeLambda extends TypeLambda {
    readonly type: T<this["A"]>;
}

export declare const map: <F extends TypeLambda>(F: TypeClass<F>) => <A, B>(a: Apply<F, A>, f: (a: A) => B) => Apply<F, B>;

declare const typeClass: TypeClass<TTypeLambda>;

declare const a: T<number>;

const x1 = map(typeClass);
const x2 = map(typeClass)(a, (_) => _);  // T<number>
