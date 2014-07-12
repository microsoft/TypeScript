declare function foo();
declare module foo {
    export function x(): any;
}
declare class foo { } // Should error


declare class foo2 { }
declare module foo2 {
    export function x(): any;
}
declare function foo2(); // Should error


function foo3() { }
module foo3 {
     export function x(): any { }
}
class foo3 { } // Should error