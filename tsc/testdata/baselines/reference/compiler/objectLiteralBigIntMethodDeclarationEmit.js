//// [tests/cases/compiler/objectLiteralBigIntMethodDeclarationEmit.ts] ////

//// [objectLiteralBigIntMethodDeclarationEmit.ts]
export const foo = {
    1n() {
        return 1;
    },
    2() {
        return 2;
    }
};

export class Foo {
    1n() {
        return 1;
    }
    2() {
        return 2;
    }
}



//// [objectLiteralBigIntMethodDeclarationEmit.js]
export const foo = {
    1n() {
        return 1;
    },
    2() {
        return 2;
    }
};
export class Foo {
    1n() {
        return 1;
    }
    2() {
        return 2;
    }
}


//// [objectLiteralBigIntMethodDeclarationEmit.d.ts]
export declare const foo: {
    1n(): number;
    2(): number;
};
export declare class Foo {
    1n(): number;
    2(): number;
}
