//// [narrowExceptionVariableInCatchClause.ts]
declare function isFooError(x: any): x is { type: 'foo'; dontPanic(); };

function tryCatch() {
    try {
        // do stuff...
    }
    catch (err) { // err is implicitly 'any' and cannot be annotated

        if (isFooError(err)) {
            err.dontPanic(); // OK
            err.doPanic(); // ERROR: Property 'doPanic' does not exist on type '{...}'
        }

        else if (err instanceof Error) {
            err.message;
            err.massage; // ERROR: Property 'massage' does not exist on type 'Error'
        }

        else {
            throw err;
        }
    }
}


//// [narrowExceptionVariableInCatchClause.js]
function tryCatch() {
    try {
        // do stuff...
    }
    catch (err) { // err is implicitly 'any' and cannot be annotated
        if (isFooError(err)) {
            err.dontPanic(); // OK
            err.doPanic(); // ERROR: Property 'doPanic' does not exist on type '{...}'
        }
        else if (err instanceof Error) {
            err.message;
            err.massage; // ERROR: Property 'massage' does not exist on type 'Error'
        }
        else {
            throw err;
        }
    }
}
