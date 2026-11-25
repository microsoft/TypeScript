//// [tests/cases/compiler/typeOperatorNamespaceReferences.ts] ////

//// [typeOperatorNamespaceReferences.ts]
declare namespace keyof {
    export interface Option {
        name: string;
    }
}

declare namespace unique {
    export type Option<T> = { value: T };
}

declare namespace readonly {
    export type Option = "readonly";
}

declare namespace infer {
    export type Option = [number];
}

type KeyofOption = keyof.Option;
type UniqueOption = unique.Option<number>;
type ReadonlyOption = readonly.Option;
type OptionKeys = keyof keyof.Option;
type OptionElement = infer.Option extends [infer T] ? T : never;

type TupleKeys = keyof [number];
type ReadonlyOptions = readonly readonly.Option[];
declare const tag: unique symbol;


//// [typeOperatorNamespaceReferences.js]
"use strict";


//// [typeOperatorNamespaceReferences.d.ts]
declare namespace keyof {
    interface Option {
        name: string;
    }
}
declare namespace unique {
    type Option<T> = {
        value: T;
    };
}
declare namespace readonly {
    type Option = "readonly";
}
declare namespace infer {
    type Option = [number];
}
type KeyofOption = keyof.Option;
type UniqueOption = unique.Option<number>;
type ReadonlyOption = readonly.Option;
type OptionKeys = keyof keyof.Option;
type OptionElement = infer.Option extends [infer T] ? T : never;
type TupleKeys = keyof [number];
type ReadonlyOptions = readonly readonly.Option[];
declare const tag: unique symbol;
