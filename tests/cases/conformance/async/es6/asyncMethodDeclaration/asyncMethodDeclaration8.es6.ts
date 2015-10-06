// @target: ES6
// @noEmitHelpers: true
// @experimentalAsyncFunctions: true
class D {
    superMethod() {}
    static staticSuperMethod() {}
}
export default class extends D {
    async method() {
        super.superMethod();
        await undefined;
    }
    
    static async staticMethod() {
        super.staticSuperMethod();
        await undefined;
    }
}