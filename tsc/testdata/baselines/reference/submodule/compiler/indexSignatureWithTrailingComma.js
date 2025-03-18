//// [tests/cases/compiler/indexSignatureWithTrailingComma.ts] ////

//// [indexSignatureWithTrailingComma.ts]
type A = {
    [key: string,]: string;
};

interface B {
    [key: string,]: string;
}

class C {
    [key: string,]: null;
}


//// [indexSignatureWithTrailingComma.js]
class C {
}
