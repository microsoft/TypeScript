// @module: amd
// @Filename: internalInstanceMemberAccessibility_0.d.ts
export declare class Base1 {
    internal foo(): string;
}

// @Filename: internalInstanceMemberAccessibility_1.ts
import { Base1 } from "./internalInstanceMemberAccessibility_0";

class Derived1 extends Base1 {
    x = super.foo(); // error
    y() {
        return super.foo(); // error
    }
}

declare class Base2 {
    internal foo(): string;
}

class Derived2 extends Base2 {
    x = super.foo(); // ok
    y() {
        return super.foo(); // ok
    }
}