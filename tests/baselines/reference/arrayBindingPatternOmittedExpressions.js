//// [arrayBindingPatternOmittedExpressions.ts]
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

//// [arrayBindingPatternOmittedExpressions.js]
var results;
{
    let [, b, , a] = results;
    let x = {
        a,
        b
    };
}
function f([, a, , b, , , , s, , ,] = results) {
    a = s[1];
    b = s[2];
}
