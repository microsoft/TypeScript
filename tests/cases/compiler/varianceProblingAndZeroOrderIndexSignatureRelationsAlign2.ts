// @strict: true
type Either<L, A> = Left<L, A> | Right<L, A>;

class Left<L, A> {
    readonly _tag: 'Left' = 'Left'
    readonly _A!: A
    readonly _L!: L
    constructor(readonly value: L) {}
    /** The given function is applied if this is a `Right` */
    map<B>(f: (a: A) => B): Either<L, B> {
      return this as any
    }
    ap<B>(fab: Either<L, (a: A) => B>): Either<L, B> {
      return null as any
    }
}

class Right<L, A> {
    readonly _tag: 'Right' = 'Right'
    readonly _A!: A
    readonly _L!: L
    constructor(readonly value: A) {}
    map<B>(f: (a: A) => B): Either<L, B> {
      return new Right(f(this.value))
    }
    ap<B>(fab: Either<L, (a: A) => B>): Either<L, B> {
      return null as any;
    }
}

class Type<A, O = A, I = unknown> {
  readonly _A!: A;
  readonly _O!: O;
  readonly _I!: I;
  constructor(
    /** a unique name for this codec */
    readonly name: string,
    /** a custom type guard */
    readonly is: (u: unknown) => u is A,
    /** succeeds if a value of type I can be decoded to a value of type A */
    readonly validate: (input: I, context: {}[]) => Either<{}[], A>,
    /** converts a value of type A to a value of type O */
    readonly encode: (a: A) => O
  ) {}
  /** a version of `validate` with a default context */
  decode(i: I): Either<{}[], A> { return null as any; }
}

interface Any extends Type<any, any, any> {}

type TypeOf<C extends Any> = C["_A"];

type ToB<S extends {[_ in string | number | symbol]: Any}> = { [k in keyof S]: TypeOf<S[k]> };
type ToA<S> = { [k in keyof S]: Type<S[k]> };

type NeededInfo<MyNamespaceSchema = {}> = {
  ASchema: ToA<MyNamespaceSchema>;
};

export type MyInfo = NeededInfo<ToB<{ initialize: any }>>;

const tmp1: MyInfo = null!;
function tmp2<N extends NeededInfo>(n: N) {}
// tmp2(tmp1); // uncommenting this line removes a type error from a completely unrelated line ?? (see test 1, needs to behave the same)

class Server<X extends NeededInfo> {}
export class MyServer extends Server<MyInfo> {} // not assignable error at `MyInfo`