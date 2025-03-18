//// [tests/cases/conformance/internalModules/DeclarationMerging/ClassAndModuleThatMergeWithModulesExportedStaticFunctionUsingClassPrivateStatics.ts] ////

//// [ClassAndModuleThatMergeWithModulesExportedStaticFunctionUsingClassPrivateStatics.ts]
class clodule<T> {
    id: string;
    value: T;

    private static sfn(id: string) { return 42; }
}

module clodule {
    // error: duplicate identifier expected
    export function fn<T>(x: T, y: T): number {
        return clodule.sfn('a');
    }
}



//// [ClassAndModuleThatMergeWithModulesExportedStaticFunctionUsingClassPrivateStatics.js]
class clodule {
    id;
    value;
    static sfn(id) { return 42; }
}
(function (clodule) {
    function fn(x, y) {
        return clodule.sfn('a');
    }
    clodule.fn = fn;
})(clodule || (clodule = {}));
