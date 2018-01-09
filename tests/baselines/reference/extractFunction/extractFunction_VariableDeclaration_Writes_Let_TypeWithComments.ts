// ==ORIGINAL==

function f() {
    let a = 1;
    /*[#|*/let x: /*A*/ "a" /*B*/ | /*C*/ 'b' /*D*/ = 'a';
    a++;/*|]*/
    a; x;
}
// ==SCOPE::Extract to inner function in function 'f'==

function f() {
    let a = 1;
    let x: /*A*/ "a" /*B*/ | /*C*/ 'b' /*D*/ = /*RENAME*/newFunction();
    a; x;

    function newFunction() {
        let x: /*A*/ "a" /*B*/ | /*C*/ 'b' /*D*/ = 'a';
        a++;
        return x;
    }
}
// ==SCOPE::Extract to function in global scope==

function f() {
    let a = 1;
    let x: (/*A*/ "a" /*B*/ | /*C*/ 'b' /*D*/) | undefined;
    ({ x, a } = /*RENAME*/newFunction(a));
    a; x;
}

function newFunction(a: number) {
    let x: /*A*/ "a" /*B*/ | /*C*/ 'b' /*D*/ = 'a';
    a++;
    return { x, a };
}
