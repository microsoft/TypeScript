//// [tests/cases/compiler/numericPropertyCompoundAssignmentAfterDisjunction.ts] ////

//// [numericPropertyCompoundAssignmentAfterDisjunction.ts]
class Decoder {
    remaining = 0;
    consume(size: number) {
        if (this.remaining === 0 || size === 0) return;
        this.remaining -= size;
    }
}


//// [numericPropertyCompoundAssignmentAfterDisjunction.js]
"use strict";
class Decoder {
    remaining = 0;
    consume(size) {
        if (this.remaining === 0 || size === 0)
            return;
        this.remaining -= size;
    }
}
