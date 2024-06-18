// @declaration: true
// @emitDeclarationOnly: true
// @target: es6
export interface TypeLambda {
    readonly In: unknown
    readonly Out2: unknown
    readonly Out1: unknown
    readonly Target: unknown
}
export namespace Types {
    export type Invariant<A> = (_: A) => A
    export type Covariant<A> = (_: never) => A
    export type Contravariant<A> = (_: A) => void
}

export declare const URI: unique symbol;
export interface TypeClass<F extends TypeLambda> {
    readonly [URI]?: F
}

export interface Invariant<F extends TypeLambda> extends TypeClass<F> {
    readonly imap: {
        <A, B>(
            to: (a: A) => B,
            from: (b: B) => A
        ): <R, O, E>(self: Kind<F, R, O, E, A>) => Kind<F, R, O, E, B>
        <R, O, E, A, B>(
            self: Kind<F, R, O, E, A>,
            to: (a: A) => B,
            from: (b: B) => A
        ): Kind<F, R, O, E, B>
    }
}

export interface Covariant<F extends TypeLambda> extends Invariant<F> {
    readonly map: {
        <A, B>(f: (a: A) => B): <R, O, E>(self: Kind<F, R, O, E, A>) => Kind<F, R, O, E, B>
        <R, O, E, A, B>(self: Kind<F, R, O, E, A>, f: (a: A) => B): Kind<F, R, O, E, B>
    }
}


export type Kind<F extends TypeLambda, In, Out2, Out1, Target> = F extends {
    readonly type: unknown
} ? (F & {
    readonly In: In
    readonly Out2: Out2
    readonly Out1: Out1
    readonly Target: Target
})["type"]
    : {
        readonly F: F
        readonly In: Types.Contravariant<In>
        readonly Out2: Types.Covariant<Out2>
        readonly Out1: Types.Covariant<Out1>
        readonly Target: Types.Invariant<Target>
    }

export interface SemiProduct<F extends TypeLambda> extends Invariant<F> {
    readonly product: <R1, O1, E1, A, R2, O2, E2, B>(
        self: Kind<F, R1, O1, E1, A>,
        that: Kind<F, R2, O2, E2, B>
    ) => Kind<F, R1 & R2, O1 | O2, E1 | E2, [A, B]>

    readonly productMany: <R, O, E, A>(
        self: Kind<F, R, O, E, A>,
        collection: Iterable<Kind<F, R, O, E, A>>
    ) => Kind<F, R, O, E, [A, ...Array<A>]>
}
export interface SemiApplicative<F extends TypeLambda> extends SemiProduct<F>, Covariant<F> { }


export const SK = <A, B>(_: A, b: B): B => b;

export declare const dual: {
    <DataLast extends (...args: Array<any>) => any, DataFirst extends (...args: Array<any>) => any>(
        arity: Parameters<DataFirst>["length"],
        body: DataFirst
    ): DataLast & DataFirst
    <DataLast extends (...args: Array<any>) => any, DataFirst extends (...args: Array<any>) => any>(
        isDataFirst: (args: IArguments) => boolean,
        body: DataFirst
    ): DataLast & DataFirst
};

export const zipWith = <F extends TypeLambda>(F: SemiApplicative<F>): {
    <R2, O2, E2, B, A, C>(
        that: Kind<F, R2, O2, E2, B>,
        f: (a: A, b: B) => C
    ): <R1, O1, E1>(self: Kind<F, R1, O1, E1, A>) => Kind<F, R1 & R2, O2 | O1, E2 | E1, C>
    <R1, O1, E1, A, R2, O2, E2, B, C>(
        self: Kind<F, R1, O1, E1, A>,
        that: Kind<F, R2, O2, E2, B>,
        f: (a: A, b: B) => C
    ): Kind<F, R1 & R2, O1 | O2, E1 | E2, C>
} =>
    dual(
        3,
        <R1, O1, E1, A, R2, O2, E2, B, C>(
            self: Kind<F, R1, O1, E1, A>,
            that: Kind<F, R2, O2, E2, B>,
            f: (a: A, b: B) => C
        ): Kind<F, R1 & R2, O1 | O2, E1 | E2, C> => F.map(F.product(self, that), ([a, b]) => f(a, b))
    );


export const zipRight = <F extends TypeLambda>(F: SemiApplicative<F>): {
    <R2, O2, E2, B>(
        that: Kind<F, R2, O2, E2, B>
    ): <R1, O1, E1, _>(self: Kind<F, R1, O1, E1, _>) => Kind<F, R1 & R2, O2 | O1, E2 | E1, B>
    <R1, O1, E1, _, R2, O2, E2, B>(
        self: Kind<F, R1, O1, E1, _>,
        that: Kind<F, R2, O2, E2, B>
    ): Kind<F, R1 & R2, O1 | O2, E1 | E2, B>
} =>
    dual(2, <R1, O1, E1, _, R2, O2, E2, B>(
        self: Kind<F, R1, O1, E1, _>,
        that: Kind<F, R2, O2, E2, B>
    ): Kind<F, R1 & R2, O1 | O2, E1 | E2, B> => zipWith(F)(self, that, SK));