// @noResolve: true
// @declaration: true
// @module: amd
// @outFile: tests/cases/compiler/out/datastore.bundle.js
// @filename: lib/lib.d.ts
declare module "lib/result" {
    export type Result<E extends Error, T> = (E & Failure<E>) | (T & Success<T>);
    export interface Failure<E extends Error> { }
    export interface Success<T> { }
}

// @filename: src/datastore_result.ts
import { Result } from "lib/result";

export type T<T> = Result<Error, T>;

// @filename: src/conditional_directive_field.ts
import * as DatastoreResult from "src/datastore_result";

export const build = (): DatastoreResult.T<string> => {
	return null;
};
