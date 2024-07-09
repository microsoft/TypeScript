// @target: ES6

var results: string[];

{
    let [, b, , a] = results;
    let x = {
        a,
        b
    }
}


function f([, a, , b, , , , s, , , ] = results) {
    a = s[1];
    b = s[2];
}