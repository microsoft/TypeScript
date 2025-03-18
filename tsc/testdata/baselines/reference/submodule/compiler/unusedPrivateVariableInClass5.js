//// [tests/cases/compiler/unusedPrivateVariableInClass5.ts] ////

//// [unusedPrivateVariableInClass5.ts]
class greeter {
    private x: string;
    private y: string;
    public  z: string;

    constructor() {
        this.x;
    }
}

//// [unusedPrivateVariableInClass5.js]
class greeter {
    x;
    y;
    z;
    constructor() {
        this.x;
    }
}
