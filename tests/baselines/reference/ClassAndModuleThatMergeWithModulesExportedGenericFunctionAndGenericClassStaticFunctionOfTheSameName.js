//// [tests/cases/conformance/internalModules/DeclarationMerging/ClassAndModuleThatMergeWithModulesExportedGenericFunctionAndGenericClassStaticFunctionOfTheSameName.ts] ////

//// [ClassAndModuleThatMergeWithModulesExportedGenericFunctionAndGenericClassStaticFunctionOfTheSameName.ts]
class clodule<T> {
    id: string;
    value: T;

    static fn<U>(id: U) { }
}

module clodule {
    // error: duplicate identifier expected
    export function fn<T>(x: T, y: T): T {
        return x;
    }
}



//// [ClassAndModuleThatMergeWithModulesExportedGenericFunctionAndGenericClassStaticFunctionOfTheSameName.js]
class clodule {
    id;
    value;
    static fn(id) { }
}
(function (clodule) {
    // error: duplicate identifier expected
    function fn(x, y) {
        return x;
    }
    clodule.fn = fn;
})(clodule || (clodule = {}));
