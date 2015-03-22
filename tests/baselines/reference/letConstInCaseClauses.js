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
    var _x = 1;
    var _y = 2;
    console.log(_x);
    switch (_x) {
        case 10:
            var _x_1 = 20;
    }
    switch (_y) {
        case 10:
            var _y_1 = 20;
    }
}
{
    var _x_2 = 1;
    var _y_2 = 2;
    console.log(_x_2);
    switch (_x_2) {
        case 10:
            var _x_3 = 20;
    }
    switch (_y_2) {
        case 10:
            var _y_3 = 20;
    }
}
