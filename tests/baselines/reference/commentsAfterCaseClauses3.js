//// [tests/cases/compiler/commentsAfterCaseClauses3.ts] ////

//// [commentsAfterCaseClauses3.ts]
function getSecurity(level) {
    switch(level){
        case 0: /*Zero*/
        case 1: /*One*/ 
        case 2: /*two*/
            // Leading comments
            return "Hi";
        case 3: /*three*/
        case 4: /*four*/
            return "hello";
        case 5: /*five*/
        default:  /*six*/
            return "world";
    }
    
}

//// [commentsAfterCaseClauses3.js]
function getSecurity(level) {
    switch (level) {
        case 0: /*Zero*/
        case 1: /*One*/
        case 2: /*two*/
            // Leading comments
            return "Hi";
        case 3: /*three*/
        case 4: /*four*/
            return "hello";
        case 5: /*five*/
        default: /*six*/
            return "world";
    }
}
