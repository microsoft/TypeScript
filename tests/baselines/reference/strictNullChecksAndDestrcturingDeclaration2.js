//// [strictNullChecksAndDestrcturingDeclaration2.ts]

// Repro from #10078

declare class A {
    f({x}?: {
        x?: boolean;
    }): void;
}
declare class B {
    f({x, y}?: {
        x?: boolean;
        y?: boolean;
    }): void;
}

//// [strictNullChecksAndDestrcturingDeclaration2.js]
// Repro from #10078


//// [strictNullChecksAndDestrcturingDeclaration2.d.ts]
declare class A {
    f({x}?: {
        x?: boolean;
    }): void;
}
declare class B {
    f({x, y}?: {
        x?: boolean;
        y?: boolean;
    }): void;
}
