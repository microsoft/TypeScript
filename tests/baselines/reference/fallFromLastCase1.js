//// [tests/cases/compiler/fallFromLastCase1.ts] ////

//// [fallFromLastCase1.ts]
declare function use(a: string);

function foo1(a: number) {
    switch (a) {
        case 1:
            use("1");
            break;
        case 2:
            use("2");
    }
}


function foo2(a: number) {
    switch (a) {
        case 1:
            use("1");
            break;
        default:
            use("2");
    }
}

//// [fallFromLastCase1.js]
function foo1(a) {
    switch (a) {
        case 1:
            use("1");
            break;
        case 2:
            use("2");
    }
}
function foo2(a) {
    switch (a) {
        case 1:
            use("1");
            break;
        default:
            use("2");
    }
}
