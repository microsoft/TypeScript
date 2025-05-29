//// [tests/cases/compiler/classReferencedInContextualParameterWithinItsOwnBaseExpression.ts] ////

//// [classReferencedInContextualParameterWithinItsOwnBaseExpression.ts]
interface Pretty<To> {
  (a: To): string;
}

interface Schema<A> {
  readonly pretty?: Pretty<A>;
}

interface Class<A> {
  new (): A;
}

declare const Class: <Self>(
  identifier: string,
) => <Fields>(
  fields: Fields,
  annotations?: Schema<Self>,
) => Class<OutputFrom<Fields>>;

type Type<TOutput> = {
  _TOutput: TOutput;
};

type OutputFrom<TFields> = {
  [K in keyof TFields]: "_TOutput" extends keyof TFields[K]
    ? TFields[K]["_TOutput"]
    : never;
};

declare function string(): Type<string>;

export class A extends Class<A>("A")(
  { a: string },
  {
    pretty: (a) => JSON.stringify(a),
  },
) {}




//// [classReferencedInContextualParameterWithinItsOwnBaseExpression.d.ts]
interface Pretty<To> {
    (a: To): string;
}
interface Schema<A> {
    readonly pretty?: Pretty<A>;
}
interface Class<A> {
    new ();
}
declare const Class: <Self>(identifier: string) => <Fields>(fields: Fields, annotations?: Schema<Self>) => Class<OutputFrom<Fields>>;
type Type<TOutput> = {
    _TOutput: TOutput;
};
type OutputFrom<TFields> = {
    [K in keyof TFields]: "_TOutput" extends keyof TFields[K] ? TFields[K]["_TOutput"] : never;
};
declare function string(): Type<string>;
declare const A_base: Class<OutputFrom<{
    a: typeof string;
}>>;
export declare class A extends A_base {
}
export {};


//// [DtsFileErrors]


classReferencedInContextualParameterWithinItsOwnBaseExpression.d.ts(8,5): error TS7013: Construct signature, which lacks return-type annotation, implicitly has an 'any' return type.


==== classReferencedInContextualParameterWithinItsOwnBaseExpression.d.ts (1 errors) ====
    interface Pretty<To> {
        (a: To): string;
    }
    interface Schema<A> {
        readonly pretty?: Pretty<A>;
    }
    interface Class<A> {
        new ();
        ~~~~~~~
!!! error TS7013: Construct signature, which lacks return-type annotation, implicitly has an 'any' return type.
    }
    declare const Class: <Self>(identifier: string) => <Fields>(fields: Fields, annotations?: Schema<Self>) => Class<OutputFrom<Fields>>;
    type Type<TOutput> = {
        _TOutput: TOutput;
    };
    type OutputFrom<TFields> = {
        [K in keyof TFields]: "_TOutput" extends keyof TFields[K] ? TFields[K]["_TOutput"] : never;
    };
    declare function string(): Type<string>;
    declare const A_base: Class<OutputFrom<{
        a: typeof string;
    }>>;
    export declare class A extends A_base {
    }
    export {};
    