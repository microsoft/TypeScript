// same as subtypingWithCallSignatures but with additional specialized signatures that should not affect the results

module CallSignature {
    interface Base { // T
        // M's
        new (x: 'a'): void;
        new (x: string, y: number): void;
    }

    // S's
    interface I extends Base {
        // N's
        new (x: 'a'): number; // ok because base returns void
        new (x: string, y: number): number; // ok because base returns void
        new <T>(x: T): string; // ok because base returns void
    }   

    interface Base2 { // T
        // M's
        new (x: 'a'): number;
        new (x: string): number;
    }

    // S's
    interface I2 extends Base2 {
        // N's
        new (x: 'a'): string;
        new (x: string): string; // error because base returns non-void;
    }

    // S's
    interface I3 extends Base2 {
        // N's
        new <T>(x: T): string; // ok, adds a new call signature
    }
}

module MemberWithCallSignature {
    interface Base { // T
        // M's
        a: {
            new (x: 'a'): void;
            new (x: string): void;
        }
        a2: {
            new (x: 'a', y: number): void;
            new (x: string, y: number): void;
        }
        a3: new <T>(x: T) => void;
    }

    // S's
    interface I extends Base {
        // N's
        a: new (x: string) => number; // ok because base returns void
        a2: new  (x: string, y: number) => boolean; // ok because base returns void
        a3: new <T>(x: T) => string; // ok because base returns void
    }

    interface Base2 { // T
        // M's
        a: {
            new (x: 'a'): number;
            new (x: string): number;
        }
        a2: new <T>(x: T) => T;
    }

    // S's
    interface I2 extends Base2 {
        // N's
        a: new (x: string) => string; // error because base returns non-void;
    }

    // S's
    interface I3 extends Base2 {
        // N's
        a2: new <T>(x: T) => string; // error because base returns non-void;
    }
}