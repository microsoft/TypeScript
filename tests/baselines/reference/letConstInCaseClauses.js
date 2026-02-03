//// [tests/cases/compiler/letConstInCaseClauses.ts] ////

//// [letConstInCaseClauses.ts]
var x = 10;
var y = 20;
{
    let x = 1;
    let y = 2;
    console.log(x)
    switch (x) {
        case 10:
            let x = 20;
    }
    switch (y) {
        case 10:
            let y = 20;
    }
}

{
    const x = 1;
    const y = 2;
    console.log(x)
    switch (x) {
        case 10:
            const x = 20;
    }
    switch (y) {
        case 10:
            const y = 20;
    }
}

//// [letConstInCaseClauses.js]
var x = 10;
var y = 20;
{
    var x_1 = 1;
    var y_1 = 2;
    console.log(x_1);
    switch (x_1) {
        case 10:
            var x_2 = 20;
    }
    switch (y_1) {
        case 10:
            var y_2 = 20;
    }
}
{
    var x_3 = 1;
    var y_3 = 2;
    console.log(x_3);
    switch (x_3) {
        case 10:
            var x_4 = 20;
    }
    switch (y_3) {
        case 10:
            var y_4 = 20;
    }
}
