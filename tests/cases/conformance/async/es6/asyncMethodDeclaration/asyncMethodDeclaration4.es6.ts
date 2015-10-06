// @target: ES6
// @noEmitHelpers: true
// @experimentalAsyncFunctions: true
export default class {
    async method() {
        await undefined;
    }
    
    static async staticMethod() {
        await undefined;
    }
}