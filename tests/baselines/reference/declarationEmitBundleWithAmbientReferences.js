//// [tests/cases/compiler/declarationEmitBundleWithAmbientReferences.ts] ////

//// [lib.d.ts]
declare module "lib/result" {
    export type Result<E extends Error, T> = (E & Failure<E>) | (T & Success<T>);
    export interface Failure<E extends Error> { }
    export interface Success<T> { }
}

//// [datastore_result.ts]
import { Result } from "lib/result";

export type T<T> = Result<Error, T>;

//// [conditional_directive_field.ts]
import * as DatastoreResult from "src/datastore_result";

export const build = (): DatastoreResult.T<string> => {
	return null;
};


//// [datastore.bundle.js]
define("datastore_result", ["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
});
define("conditional_directive_field", ["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    exports.build = void 0;
    exports.build = function () {
        return null;
    };
});


//// [datastore.bundle.d.ts]
declare module "datastore_result" {
    import { Result } from "lib/result";
    export type T<T> = Result<Error, T>;
}
declare module "conditional_directive_field" {
    import * as DatastoreResult from "datastore_result";
    export const build: () => DatastoreResult.T<string>;
}
