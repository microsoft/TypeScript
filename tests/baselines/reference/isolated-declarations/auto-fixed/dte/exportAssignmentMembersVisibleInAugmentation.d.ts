//// [tests/cases/compiler/exportAssignmentMembersVisibleInAugmentation.ts] ////

//// [/node_modules/foo/index.d.ts]
export = foo;
declare namespace foo {
    export type T = number;
}

//// [/a.ts]
import * as foo from "foo";
declare module "foo" {
    export function f(): T; // OK
}

//// [/b.ts]
import * as foo from "foo";
declare module "foo" {
    export function g(): foo.T; // OK
}


/// [Declarations] ////



//// [/a.d.ts]
declare module "foo" {
    function f(): T;
}
export {};
//# sourceMappingURL=a.d.ts.map
//// [/b.d.ts]
import * as foo from "foo";
declare module "foo" {
    function g(): foo.T;
}
//# sourceMappingURL=b.d.ts.map
/// [Errors] ////

/a.ts(3,26): error TS4060: Return type of exported function has or is using private name 'T'.


==== /node_modules/foo/index.d.ts (0 errors) ====
    export = foo;
    declare namespace foo {
        export type T = number;
    }
    
==== /a.ts (1 errors) ====
    import * as foo from "foo";
    declare module "foo" {
        export function f(): T; // OK
                             ~
!!! error TS4060: Return type of exported function has or is using private name 'T'.
    }
    
==== /b.ts (0 errors) ====
    import * as foo from "foo";
    declare module "foo" {
        export function g(): foo.T; // OK
    }
    