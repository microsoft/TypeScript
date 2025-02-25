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
    foo: id.
    /**
    */ A /**
    */<1>;
};
/**
*/ 


//// [DtsFileErrors]


a.d.ts(3,10): error TS2314: Generic type 'A' requires 1 type argument(s).
a.d.ts(6,7): error TS7020: Call signature, which lacks return-type annotation, implicitly has an 'any' return type.
a.d.ts(6,8): error TS1139: Type parameter declaration expected.
a.d.ts(6,10): error TS1109: Expression expected.
a.d.ts(7,1): error TS1128: Declaration or statement expected.


==== a.d.ts (5 errors) ====
    import { id } from "./id";
    export declare const _: {
        foo: id.
             ~~~
        /**
    ~~~~~~~
        */ A /**
    ~~~~~~~~
!!! error TS2314: Generic type 'A' requires 1 type argument(s).
        */<1>;
          ~
!!! error TS7020: Call signature, which lacks return-type annotation, implicitly has an 'any' return type.
           ~
!!! error TS1139: Type parameter declaration expected.
             ~
!!! error TS1109: Expression expected.
    };
    ~
!!! error TS1128: Declaration or statement expected.
    /**
    */ 
    
==== obj.d.ts (0 errors) ====
    import { id } from "./id";
    // ----
    export declare const object: id.A<{
        foo: id.A<1>
    }>;
    
==== id.d.ts (0 errors) ====
    export declare namespace id {
        type A<T> = T;
    }