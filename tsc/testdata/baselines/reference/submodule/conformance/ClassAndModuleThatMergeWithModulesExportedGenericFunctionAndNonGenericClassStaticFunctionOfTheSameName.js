//// [tests/cases/conformance/internalModules/DeclarationMerging/ClassAndModuleThatMergeWithModulesExportedGenericFunctionAndNonGenericClassStaticFunctionOfTheSameName.ts] ////

//// [ClassAndModuleThatMergeWithModulesExportedGenericFunctionAndNonGenericClassStaticFunctionOfTheSameName.ts]
class clodule<T> {
    id: string;
    value: T;

    static fn(id: string) { }
}

module clodule {
    // error: duplicate identifier expected
    export function fn<T>(x: T, y: T): T {
        return x;
    }
}



//// [ClassAndModuleThatMergeWithModulesExportedGenericFunctionAndNonGenericClassStaticFunctionOfTheSameName.js]
class clodule {
    id;
    value;
    static fn(id) { }
}
(function (clodule) {
    function fn(x, y) {
        return x;
    }
    clodule.fn = fn;
})(clodule || (clodule = {}));
