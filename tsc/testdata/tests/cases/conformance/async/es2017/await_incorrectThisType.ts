// @target: esnext
// @noEmit: true
// @noTypesAndSymbols: true

// https://github.com/microsoft/TypeScript/issues/47711
type Either<E, A> = Left<E> | Right<A>;
type Left<E> = { tag: 'Left', e: E };
type Right<A> = { tag: 'Right', a: A };

const mkLeft = <E>(e: E): Either<E, never> => ({ tag: 'Left', e });
const mkRight = <A>(a: A): Either<never, A> => ({ tag: 'Right', a });

class EPromise<E, A> implements PromiseLike<A> {
    static succeed<A>(a: A): EPromise<never, A> {
        return new EPromise(Promise.resolve(mkRight(a)));
    }

    static fail<E>(e: E): EPromise<E, never> {
        return new EPromise(Promise.resolve(mkLeft(e)));
    }

    constructor(readonly p: PromiseLike<Either<E, A>>) { }

    then<B = A, B1 = never>(
        // EPromise can act as a Thenable only when `E` is `never`.
        this: EPromise<never, A>,
        onfulfilled?: ((value: A) => B | PromiseLike<B>) | null | undefined,
        onrejected?: ((reason: any) => B1 | PromiseLike<B1>) | null | undefined
    ): PromiseLike<B | B1> {
        return this.p.then(
            // Casting to `Right<A>` is safe here because we've eliminated the possibility of `Left<E>`.
            either => onfulfilled?.((either as Right<A>).a) ?? (either as Right<A>).a as unknown as B,
            onrejected
        )
    }
}

const withTypedFailure: EPromise<number, string> = EPromise.fail(1);

// Errors as expected:
//
// "The 'this' context of type 'EPromise<number, string>' is not assignable to method's
//     'this' of type 'EPromise<never, string>"
withTypedFailure.then(s => s.toUpperCase()).then(console.log);

async function test() {
    await withTypedFailure;
}