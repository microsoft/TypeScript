// @target: es5

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