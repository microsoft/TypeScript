// @module: amd
// @filename: internalStaticMemberAccessibility_0.d.ts 
declare class Base1 {
    internal static foo: string;
}

// @filename: internalStaticMemberAccessibility_1.ts
/// <reference path="internalStaticMemberAccessibility_0.d.ts" />
class Derived1 extends Base1 {
    static bar = Base1.foo; // error
    bing = () => Base1.foo; // error
}

class Base2 {
    internal static foo: string;
}

class Derived2 extends Base2 {
    static bar = Base2.foo; // ok
    bing = () => Base2.foo; // ok
}