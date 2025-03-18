//// [tests/cases/compiler/commentsAfterCaseClauses1.ts] ////

//// [commentsAfterCaseClauses1.ts]
function getSecurity(level) {
    switch(level){
        case 0: // Zero
        case 1: // one
        case 2: // two
            return "Hi";
        case 3: // three
        case 4   : // four
            return "hello";
        case 5: // five
        default:  // default
            return "world";
    }
}

//// [commentsAfterCaseClauses1.js]
function getSecurity(level) {
    switch (level) {
        case 0:
        case 1:
        case 2:
            return "Hi";
        case 3:
        case 4:
            return "hello";
        case 5:
        default:
            return "world";
    }
}
