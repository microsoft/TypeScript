//// [tests/cases/compiler/declarationEmitNoInvalidCommentReuse3.ts] ////

//// [a.ts]
import { object } from "./obj";
import { id } from "./id";
export const _ = object;
/**
*/
//// [obj.d.ts]
import { id } from "./id";
// ----
export declare const object: id.A<{
    foo: id.A<1>
}>;

//// [id.d.ts]
export declare namespace id {
    type A<T> = T;
}



//// [a.d.ts]
import { id } from "./id";
export declare const _: {
    foo: id.A<1>;
};
/**
*/ 
