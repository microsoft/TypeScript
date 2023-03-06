// @declaration: true
function f(a: 0): 0;
function f(a: 1): 1;
function f(a: 0 | 1) {
    return a;
}

f.x = 2;
