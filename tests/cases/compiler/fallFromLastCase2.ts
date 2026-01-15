// @noFallthroughCasesInSwitch: true

declare function use(a: string);

function foo1(a: number) {
    switch (a) {
        case 1:
            use("1");
            break;
        case 2:
            use("2");
        case 3:
            use("3");
    }
}


function foo2(a: number) {
    switch (a) {
        case 1:
            use("1");
            break;
        default:
            use("2");
        case 2:
            use("3");
    }
}