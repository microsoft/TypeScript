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
var clodule = /** @class */ (function () {
    function clodule() {
    }
    clodule.sfn = function (id) { return 42; };
    return clodule;
}());
(function (clodule) {
    // error: duplicate identifier expected
    function fn(x, y) {
        return clodule.sfn('a');
    }
    clodule.fn = fn;
})(clodule || (clodule = {}));
