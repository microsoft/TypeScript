//// [tests/cases/compiler/declarationEmitNoInvalidCommentReuse1.ts] ////

//// [a.ts]
import { object } from "./obj";

export const _ = object;

///////////
/**
 * huh
 */
//// [obj.d.ts]
export declare const object: import("./id").Id<{
    foo: import("./id" ).Id<{}>;
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
