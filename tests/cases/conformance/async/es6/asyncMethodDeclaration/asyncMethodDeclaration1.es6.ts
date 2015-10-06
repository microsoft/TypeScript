// @target: ES6
// @noEmitHelpers: true
// @experimentalAsyncFunctions: true
class C {
    async method() {
        await undefined;
    }
    
    static async staticMethod() {
        await undefined;
    }
}