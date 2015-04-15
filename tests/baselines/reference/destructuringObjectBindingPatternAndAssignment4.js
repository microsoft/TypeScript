//// [destructuringObjectBindingPatternAndAssignment4.ts]
interface K {
    [str: string]: string;
}
interface K1 {
    k: string;
}
var {k}: K|K1 = { k: "string" };

function barn() {
    return {};
}
var {2: baz1} = barn()

interface J {
    [str: string]: number;
}
function zz() {
    return {
        "cat": "dog"
    }
}

var {"can": can}: J = zz();

//// [destructuringObjectBindingPatternAndAssignment4.js]
var k = ({ k: "string" }).k;
function barn() {
    return {};
}
var baz1 = (barn())[2];
function zz() {
    return {
        "cat": "dog"
    };
}
var can = (zz())["can"];
