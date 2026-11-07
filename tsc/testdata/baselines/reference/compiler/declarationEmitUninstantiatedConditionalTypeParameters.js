//// [tests/cases/compiler/declarationEmitUninstantiatedConditionalTypeParameters.ts] ////

//// [contracts.js]
exports.schema = { parse: v => v };

//// [router.ts]
import { State } from "./contracts";
interface Builder<TOutputOut> {
    query<T>(resolver: () => T): { output: TOutputOut extends "unset" ? T : TOutputOut };
}

declare const builder: Builder<"unset">;

export const query = builder.query((): State | null => null);
export const anyQuery = builder.query((): any => null);
export const typedQuery = builder.query((): string | null => null);




//// [router.d.ts]
export declare const query: {
    output: any;
};
export declare const anyQuery: {
    output: any;
};
export declare const typedQuery: {
    output: string | null;
};
