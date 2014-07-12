//// [numberToString.js]
function f1(n) {
    return n;
}

function f2(s) {
}

f1(3);
f2(3); // error no coercion to string
f2(3 + ""); // ok + operator promotes
