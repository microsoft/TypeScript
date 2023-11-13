//// [tests/cases/compiler/declarationEmitCommonJsModuleReferencedType.ts] ////

//// [r/node_modules/foo/node_modules/nested/index.d.ts]
export interface NestedProps {}
//// [r/node_modules/foo/other/index.d.ts]
export interface OtherIndexProps {}
//// [r/node_modules/foo/other.d.ts]
export interface OtherProps {}
//// [r/node_modules/foo/index.d.ts]
import { OtherProps } from "./other";
import { OtherIndexProps } from "./other/index";
import { NestedProps } from "nested";
export interface SomeProps {}

export function foo(): [SomeProps, OtherProps, OtherIndexProps, NestedProps];
//// [node_modules/root/index.d.ts]
export interface RootProps {}

export function bar(): RootProps;
//// [r/entry.ts]
import { foo } from "foo";
import { RootProps, bar } from "root";
export const x = foo();
export const y: RootProps = bar();


/// [Declarations] ////



//// [r/entry.d.ts]
import { RootProps } from "root";
export declare const x: invalid;
export declare const y: RootProps;

/// [Errors] ////

r/entry.ts(3,14): error TS2742: The inferred type of 'x' cannot be named without a reference to 'foo/node_modules/nested'. This is likely not portable. A type annotation is necessary.
r/entry.ts(3,18): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.


==== r/node_modules/foo/node_modules/nested/index.d.ts (0 errors) ====
    export interface NestedProps {}
==== r/node_modules/foo/other/index.d.ts (0 errors) ====
    export interface OtherIndexProps {}
==== r/node_modules/foo/other.d.ts (0 errors) ====
    export interface OtherProps {}
==== r/node_modules/foo/index.d.ts (0 errors) ====
    import { OtherProps } from "./other";
    import { OtherIndexProps } from "./other/index";
    import { NestedProps } from "nested";
    export interface SomeProps {}
    
    export function foo(): [SomeProps, OtherProps, OtherIndexProps, NestedProps];
==== node_modules/root/index.d.ts (0 errors) ====
    export interface RootProps {}
    
    export function bar(): RootProps;
==== r/entry.ts (2 errors) ====
    import { foo } from "foo";
    import { RootProps, bar } from "root";
    export const x = foo();
                 ~
!!! error TS2742: The inferred type of 'x' cannot be named without a reference to 'foo/node_modules/nested'. This is likely not portable. A type annotation is necessary.
                     ~~~~~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
    export const y: RootProps = bar();
    