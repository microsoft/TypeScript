// @strict: true
// @noEmit: true

function foo(cond1: boolean, cond2: boolean) {
    switch (true) {
        case cond1:
            cond1; // Should be true
            //  ^?
            cond2; // Should be boolean
            //  ^?
            break;

        case cond2:
            cond1; // Should be false?
            //  ^?
            cond2; // Should be true
            //  ^?
            break;

        default:
            cond1; // Should be false?
            //  ^?
            cond2; // Should be false?
            //  ^?
            break;
    }

    cond1; // Should be boolean
    //  ^?
    cond2; // Should be boolean
    //  ^?
}
