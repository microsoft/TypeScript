//// [renamingDestructuredPropertyInFunctionType2.ts]
type F = ({a: string}) => void;

const f = ({a: string}) => string;



//// [renamingDestructuredPropertyInFunctionType2.js]
var f = function (_a) {
    var string = _a.a;
    return string;
};
