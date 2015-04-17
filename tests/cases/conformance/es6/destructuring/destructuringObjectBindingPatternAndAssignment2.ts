interface I {
    j: number;
    [str: string]: number;
}
interface J {
    [str: string]: number;
}
function zz() {
    return {
        "cat": "dog",
    }
}

function zz1(): J {
    return {
        "cat": 1,
    }
}

function yy() {
    return {}
}

var {j}: I| J = { j: 1000 };
var {cat} = zz();
var {"cat":cart} = zz();

var {can}: J = {}; 
var {can1}: J = zz1(); 


function f() {
    var { z }: { z: number } = { z };
}

interface K {
    [idx: number]: boolean
}

var {1: boo}: K = { 1: true };
var {1: boo1}: K = { };

function bar(): K {
    return { };
}
var {1: baz} = bar();