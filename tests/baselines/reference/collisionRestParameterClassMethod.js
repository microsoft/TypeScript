//// [tests/cases/compiler/collisionRestParameterClassMethod.ts] ////

//// [collisionRestParameterClassMethod.ts]
class c1 {
    public foo(_i: number, ...restParameters) { //_i is error
        var _i = 10; // no error
    }
    public fooNoError(_i: number) { // no error
        var _i = 10; // no error
    }
    public f4(_i: number, ...rest); // no codegen no error
    public f4(_i: string, ...rest); // no codegen no error
    public f4(_i: any, ...rest) { // error
        var _i: any; // no error
    }

    public f4NoError(_i: number); // no error
    public f4NoError(_i: string); // no error
    public f4NoError(_i: any) { // no error
        var _i: any; // no error
    }
}

declare class c2 {
    public foo(_i: number, ...restParameters); // No error - no code gen
    public fooNoError(_i: number); // no error

    public f4(_i: number, ...rest); // no codegen no error
    public f4(_i: string, ...rest); // no codegen no error
    public f4NoError(_i: number); // no error
    public f4NoError(_i: string); // no error
}

class c3 {
    public foo(...restParameters) {
        var _i = 10; // no error
    }
    public fooNoError() {
        var _i = 10; // no error
    }
}

//// [collisionRestParameterClassMethod.js]
class c1 {
    foo(_i, ...restParameters) {
        var _i = 10; // no error
    }
    fooNoError(_i) {
        var _i = 10; // no error
    }
    f4(_i, ...rest) {
        var _i; // no error
    }
    f4NoError(_i) {
        var _i; // no error
    }
}
class c3 {
    foo(...restParameters) {
        var _i = 10; // no error
    }
    fooNoError() {
        var _i = 10; // no error
    }
}
