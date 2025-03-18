//// [tests/cases/compiler/unusedPrivateVariableInClass4.ts] ////

//// [unusedPrivateVariableInClass4.ts]
class greeter {
    private x: string;
    private y: string;
    public  z: string;

    public method1() {
        this.x;
    }
}

//// [unusedPrivateVariableInClass4.js]
class greeter {
    x;
    y;
    z;
    method1() {
        this.x;
    }
}
