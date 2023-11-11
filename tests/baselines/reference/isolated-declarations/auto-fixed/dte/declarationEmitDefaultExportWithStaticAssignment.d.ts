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



//// [/.src/foo.d.ts]
export declare class Foo {
}

//// [/.src/index1.d.ts]
export default function Example(): void;

//// [/.src/index2.d.ts]
import { Foo } from './foo';
export { Foo };
export default function Example(): void;

//// [/.src/index3.d.ts]
export declare class Bar {
}
export default function Example(): void;

//// [/.src/index4.d.ts]
export declare function C(): any;
/// [Errors] ////

index1.ts(2,25): error TS9009: Assigning properties to functions without declaring them is not supported with --isolatedDeclarations. Add an explicit declaration for the properties assigned to this function.
index2.ts(3,25): error TS9009: Assigning properties to functions without declaring them is not supported with --isolatedDeclarations. Add an explicit declaration for the properties assigned to this function.
index3.ts(2,25): error TS9009: Assigning properties to functions without declaring them is not supported with --isolatedDeclarations. Add an explicit declaration for the properties assigned to this function.
index4.ts(5,17): error TS9009: Assigning properties to functions without declaring them is not supported with --isolatedDeclarations. Add an explicit declaration for the properties assigned to this function.


==== foo.ts (0 errors) ====
    export class Foo {}
    
==== index1.ts (1 errors) ====
    import {Foo} from './foo';
    export default function Example(): void {}
                            ~~~~~~~
!!! error TS9009: Assigning properties to functions without declaring them is not supported with --isolatedDeclarations. Add an explicit declaration for the properties assigned to this function.
    Example.Foo = Foo
    
==== index2.ts (1 errors) ====
    import {Foo} from './foo';
    export {Foo};
    export default function Example(): void {}
                            ~~~~~~~
!!! error TS9009: Assigning properties to functions without declaring them is not supported with --isolatedDeclarations. Add an explicit declaration for the properties assigned to this function.
    Example.Foo = Foo
    
==== index3.ts (1 errors) ====
    export class Bar {}
    export default function Example(): void {}
                            ~~~~~~~
!!! error TS9009: Assigning properties to functions without declaring them is not supported with --isolatedDeclarations. Add an explicit declaration for the properties assigned to this function.
    
    Example.Bar = Bar
    
==== index4.ts (1 errors) ====
    function A() {  }
    
    function B() { }
    
    export function C(): any {
                    ~
!!! error TS9009: Assigning properties to functions without declaring them is not supported with --isolatedDeclarations. Add an explicit declaration for the properties assigned to this function.
      return null;
    }
    
    C.A = A;
    C.B = B;