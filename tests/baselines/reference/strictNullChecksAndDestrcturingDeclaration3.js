//// [strictNullChecksAndDestrcturingDeclaration3.ts]

// Repro from #10078

declare class A {
    f({x}?: {
        x?: boolean;
    }): void;
}
declare class B extends A {
    f({x, y}?: {
        x?: boolean;
        y?: boolean;
    }): void;
}

//// [strictNullChecksAndDestrcturingDeclaration3.js]
// Repro from #10078


//// [strictNullChecksAndDestrcturingDeclaration3.d.ts]
declare class A {
    f({x}?: {
        x?: boolean;
    }): void;
}
declare class B extends A {
    f({x, y}?: {
        x?: boolean;
        y?: boolean;
    }): void;
}
