//// [tests/cases/compiler/declarationEmitBundleWithAmbientReferences.ts] ////

//// [lib/lib.d.ts]
declare module "lib/result" {
    export type Result<E extends Error, T> = (E & Failure<E>) | (T & Success<T>);
    export interface Failure<E extends Error> { }
    export interface Success<T> { }
}

//// [src/datastore_result.ts]
import { Result } from "lib/result";

export type T<T> = Result<Error, T>;

//// [src/conditional_directive_field.ts]
import * as DatastoreResult from "src/datastore_result";

export const build = (): DatastoreResult.T<string> => {
	return null;
};


/// [Declarations] ////



//// [src/conditional_directive_field.d.ts]
import * as DatastoreResult from "src/datastore_result";
export declare const build: () => DatastoreResult.T<string>;
//# sourceMappingURL=conditional_directive_field.d.ts.map
//// [src/datastore_result.d.ts]
/// <reference path="../lib/lib.d.ts" />
import { Result } from "lib/result";
export type T<T> = Result<Error, T>;
//# sourceMappingURL=datastore_result.d.ts.map