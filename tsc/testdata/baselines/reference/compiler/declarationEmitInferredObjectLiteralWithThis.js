//// [tests/cases/compiler/declarationEmitInferredObjectLiteralWithThis.ts] ////

//// [declarationEmitInferredObjectLiteralWithThis.ts]
export class C {
    foo() {
        return {
            self: this,
        };
    }

    prop = {
        self: this,
    };
}


//// [declarationEmitInferredObjectLiteralWithThis.js]
export class C {
    foo() {
        return {
            self: this,
        };
    }
    prop = {
        self: this,
    };
}
