//// [tests/cases/compiler/declarationEmitNoInvalidCommentReuse2.ts] ////

//// [a.ts]
import { object } from "./obj.ts";

export const _ = object;

///////////
/**
 * huh
 */
//// [obj.d.ts]
export declare const object: import("./id.ts").Id<{
    foo: import("./id.ts" ).Id<{}>;
}>;

//// [id.d.ts]
export type Id<T> = T;




//// [a.d.ts]
export declare const _: {
    foo: import("./id").Id<{}>;
};
/**
 * huh
 */ 
