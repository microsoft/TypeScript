//// [tests/cases/conformance/classes/members/privateNames/privateNameAndPropertySignature.ts] ////

//// [privateNameAndPropertySignature.ts]
type A = {
    #foo: string;
    #bar(): string;
}

interface B {
    #foo: string;
    #bar(): string;
}

declare const x: {
    #foo: number;
    bar: {
        #baz: string;
        #taz(): string;
    }
    #baz(): string;
};

declare const y: [{ qux: { #quux: 3 } }];


//// [privateNameAndPropertySignature.js]
