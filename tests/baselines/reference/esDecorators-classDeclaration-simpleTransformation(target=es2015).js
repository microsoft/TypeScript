//// [esDecorators-classDeclaration-simpleTransformation.ts]
declare let dec: any;

@dec
class C {
}


//// [esDecorators-classDeclaration-simpleTransformation.js]
let C = (() => {
    var _a;
    let _classDecorators = [dec];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var C = (_a = class {
        },
        __setFunctionName(_a, "C"),
        (() => {
            __esDecorate(null, _classDescriptor = { value: _a }, _classDecorators, { kind: "class", name: _a.name }, null, _classExtraInitializers);
            C = _classThis = _classDescriptor.value;
            __runInitializers(_classThis, _classExtraInitializers);
        })(),
        _a);
    return C;
})();
