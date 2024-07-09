// Checking basic subtype relations with construct signatures

module ConstructSignature {
    interface Base { // T
        // M's
        new (x: number): void; // BUG 842221
        new (x: number, y: number): number;
    }

    // S's
    interface I extends Base {
        // N's
        new (x: number): number; // satisfies subtype for both of base's call signatures
        new (x: number, y: number): boolean; // so this one hides the base type member that is identical modulo return types
    }

    interface Base2 { // T
        // M's
        new (x: number): number;
    }

    // S's
    interface I2 extends Base2 {
        // N's
        new (x: number): string; // error because return types don't match
    }

    // S's
    interface I3 extends Base2 {
        // N's
        new <T>(x: T): string; // ok, adds a new call signature
    }
}

module MemberWithConstructSignature {
    interface Base { // T
        // M's
        a: new (x: number) => void;
        a2: new (x: number, y: number) => void;
        a3: new <T>(x: T) => void;
    }

    var b: Base;
    var r = new b.a(1);

    // S's
    interface I extends Base {
        // N's
        a: new (x: number) => number; // ok because base returns void
        a2: new (x: number, y: number) => boolean; // ok because base returns void
        a3: new <T>(x: T) => string; // ok because base returns void
    }

    interface Base2 { // T
        // M's
        a: new (x: number) => number;
        a2: new <T>(x: T) => T;
    }

    // S's
    interface I2 extends Base2 {
        // N's
        a: new (x: number) => string; // error because base returns non-void;
    }

    // S's
    interface I3 extends Base2 {
        // N's
        a2: new <T>(x: T) => string; // error because base returns non-void;
    }
}