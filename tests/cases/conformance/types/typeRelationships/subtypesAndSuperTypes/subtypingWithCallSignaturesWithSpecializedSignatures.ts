// same as subtypingWithCallSignatures but with additional specialized signatures that should not affect the results

module CallSignature {
    interface Base { // T
        // M's
        (x: 'a'): void;
        (x: string, y: number): void;
    }

    // S's
    interface I extends Base {
        // N's
        (x: 'a'): number; // ok because base returns void
        (x: string, y: number): number; // ok because base returns void
        <T>(x: T): string; // ok because base returns void
    }

    interface Base2 { // T
        // M's
        (x: 'a'): number;
        (x: string): number;
    }

    // S's
    interface I2 extends Base2 {
        // N's
        (x: 'a'): string;
        (x: string): string; // error because base returns non-void;
    }

    // S's
    interface I3 extends Base2 {
        // N's
        <T>(x: T): string; // ok, adds a new call signature
    }
}

module MemberWithCallSignature {
    interface Base { // T
        // M's
        a: {
            (x: 'a'): void;
            (x: string): void;
        }
        a2: {
            (x: 'a', y: number): void;
            (x: string, y: number): void;
        }
        a3: <T>(x: T) => void;
    }

    // S's
    interface I extends Base {
        // N's
        a: (x: string) => number; // ok because base returns void
        a2: (x: string, y: number) => boolean; // ok because base returns void
        a3: <T>(x: T) => string; // ok because base returns void
    }

    interface Base2 { // T
        // M's
        a: {
            (x: 'a'): number;
            (x: string): number;
        }
        a2: <T>(x: T) => T;
    }

    // S's
    interface I2 extends Base2 {
        // N's
        a: (x: string) => string; // error because base returns non-void;
    }

    // S's
    interface I3 extends Base2 {
        // N's
        a2: <T>(x: T) => string; // error because base returns non-void;
    }
}