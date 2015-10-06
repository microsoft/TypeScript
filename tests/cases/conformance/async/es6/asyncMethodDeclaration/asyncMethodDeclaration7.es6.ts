// @target: ES6
// @noEmitHelpers: true
// @experimentalAsyncFunctions: true
class D {
    superMethod() {}
    static staticSuperMethod() {}
}
let c = class extends D {
    async method() {
        super.superMethod();
        await undefined;
    }
    
    static async staticMethod() {
        super.staticSuperMethod();
        await undefined;
    }
}