//// [esDecorators-classDeclaration-classThisReference.ts]
declare let dec: any;

@dec
class C {
    static { this; }
    static x: any = this;
    static accessor a: any = this;
    static m() { this; }
    static get g() { return this; }
}


//// [esDecorators-classDeclaration-classThisReference.js]
let C = (() => {
    let _classDecorators = [dec];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var C = class {
        static {
            __esDecorate(null, _classDescriptor = { value: this }, _classDecorators, { kind: "class", name: this.name }, null, _classExtraInitializers);
            C = _classThis = _classDescriptor.value;
        }
        static { _classThis; }
        static x = _classThis;
        static #a_accessor_storage = _classThis;
        static get a() { return this.#a_accessor_storage; }
        static set a(value) { this.#a_accessor_storage = value; }
        static m() { this; }
        static get g() { return this; }
        static {
            __runInitializers(_classThis, _classExtraInitializers);
        }
    };
    return C;
})();
