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