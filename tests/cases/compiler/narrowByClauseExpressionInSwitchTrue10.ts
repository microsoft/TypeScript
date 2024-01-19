// @strict: true
// @noEmit: true

function foo(cond1: boolean, cond2: boolean) {
    switch (true) {
        case cond1 || cond2:
            cond1; // boolean
            //  ^?
            cond2; // boolean
            //  ^?
            break;

        case cond2:
            cond1; // false
            //  ^?
            cond2;; // never
            //  ^?
            break;

        default:
            cond1; // false
            //  ^?
            cond2; // false
            //  ^?
            break;
    }

    cond1; // boolean
    //  ^?
    cond2; // boolean
    //  ^?
}

function blah(cond1: boolean, cond2: boolean) {
    if (cond1 || cond2) {
        cond1; // boolean
        //  ^?
        cond2; // boolean
        //  ^?
    } else if (cond2) {
        cond1; // false
        //  ^?
        cond2; // never
        //  ^?
    } else {
        cond1; // false
        //  ^?
        cond2; // false
        //  ^?
    }

    cond1; // boolean
    //  ^?
    cond2; // boolean
    //  ^?
}
