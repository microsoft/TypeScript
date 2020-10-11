//// [renamingDestructuredPropertyInFunctionType.ts]
type F = ({a: string}) => void;

const f = ({a: string}) => string;


//// [renamingDestructuredPropertyInFunctionType.js]
var f = function (_a) {
    var string = _a.a;
    return string;
};
