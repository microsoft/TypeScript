//// [tests/cases/compiler/nonInferrableTypePropagation2.ts] ////

//// [nonInferrableTypePropagation2.ts]
export interface Predicate<A> {
    (a: A): boolean
}

interface Left<E> {
    readonly _tag: 'Left'
    readonly left: E
}
  
interface Right<A> {
    readonly _tag: 'Right'
    readonly right: A
}

type Either<E, A> = Left<E> | Right<A>;

interface Refinement<A, B extends A> {
    (a: A): a is B
}

declare const filter: {
    <A, B extends A>(refinement: Refinement<A, B>): (as: ReadonlyArray<A>) => ReadonlyArray<B>
    <A>(predicate: Predicate<A>): <B extends A>(bs: ReadonlyArray<B>) => ReadonlyArray<B>
    <A>(predicate: Predicate<A>): (as: ReadonlyArray<A>) => ReadonlyArray<A>
};

declare function pipe<A, B>(a: A, ab: (a: A) => B): B;
declare function exists<A>(predicate: Predicate<A>): <E>(ma: Either<E, A>) => boolean;

declare const es: Either<string, number>[];
const x = pipe(es, filter(exists((n) => n > 0)))


//// [nonInferrableTypePropagation2.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var x = pipe(es, filter(exists(function (n) { return n > 0; })));
