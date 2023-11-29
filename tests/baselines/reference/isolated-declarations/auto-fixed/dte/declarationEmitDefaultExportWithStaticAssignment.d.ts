//// [tests/cases/compiler/declarationEmitDefaultExportWithStaticAssignment.ts] ////

//// [foo.ts]
export class Foo {}

//// [index1.ts]
import {Foo} from './foo';
export default function Example(): void {}
Example.Foo = Foo

//// [index2.ts]
import {Foo} from './foo';
export {Foo};
export default function Example(): void {}
Example.Foo = Foo

//// [index3.ts]
export class Bar {}
export default function Example(): void {}

Example.Bar = Bar

//// [index4.ts]
function A() {  }

function B() { }

export function C(): any {
  return null;
}

C.A = A;
C.B = B;

/// [Declarations] ////



//// [foo.d.ts]
export declare class Foo {
}
//# sourceMappingURL=foo.d.ts.map
//// [index1.d.ts]
export default function Example(): void;
//# sourceMappingURL=index1.d.ts.map
//// [index2.d.ts]
import { Foo } from './foo';
export { Foo };
export default function Example(): void;
//# sourceMappingURL=index2.d.ts.map
//// [index3.d.ts]
export declare class Bar {
}
export default function Example(): void;
//# sourceMappingURL=index3.d.ts.map
//// [index4.d.ts]
export declare function C(): any;
//# sourceMappingURL=index4.d.ts.map
/// [Errors] ////

index1.ts(3,1): error TS9009: Assigning properties to functions without declaring them is not supported with --isolatedDeclarations. Add an explicit declaration for the properties assigned to this function.
index2.ts(4,1): error TS9009: Assigning properties to functions without declaring them is not supported with --isolatedDeclarations. Add an explicit declaration for the properties assigned to this function.
index3.ts(4,1): error TS9009: Assigning properties to functions without declaring them is not supported with --isolatedDeclarations. Add an explicit declaration for the properties assigned to this function.
index4.ts(9,1): error TS9009: Assigning properties to functions without declaring them is not supported with --isolatedDeclarations. Add an explicit declaration for the properties assigned to this function.
index4.ts(10,1): error TS9009: Assigning properties to functions without declaring them is not supported with --isolatedDeclarations. Add an explicit declaration for the properties assigned to this function.


==== foo.ts (0 errors) ====
    export class Foo {}
    
==== index1.ts (1 errors) ====
    import {Foo} from './foo';
    export default function Example(): void {}
    Example.Foo = Foo
    ~~~~~~~~~~~
!!! error TS9009: Assigning properties to functions without declaring them is not supported with --isolatedDeclarations. Add an explicit declaration for the properties assigned to this function.
    
==== index2.ts (1 errors) ====
    import {Foo} from './foo';
    export {Foo};
    export default function Example(): void {}
    Example.Foo = Foo
    ~~~~~~~~~~~
!!! error TS9009: Assigning properties to functions without declaring them is not supported with --isolatedDeclarations. Add an explicit declaration for the properties assigned to this function.
    
==== index3.ts (1 errors) ====
    export class Bar {}
    export default function Example(): void {}
    
    Example.Bar = Bar
    ~~~~~~~~~~~
!!! error TS9009: Assigning properties to functions without declaring them is not supported with --isolatedDeclarations. Add an explicit declaration for the properties assigned to this function.
    
==== index4.ts (2 errors) ====
    function A() {  }
    
    function B() { }
    
    export function C(): any {
      return null;
    }
    
    C.A = A;
    ~~~
!!! error TS9009: Assigning properties to functions without declaring them is not supported with --isolatedDeclarations. Add an explicit declaration for the properties assigned to this function.
    C.B = B;
    ~~~
!!! error TS9009: Assigning properties to functions without declaring them is not supported with --isolatedDeclarations. Add an explicit declaration for the properties assigned to this function.