//// [tests/cases/compiler/noImplicitReturnsWithProtectedBlocks1.ts] ////

//// [noImplicitReturnsWithProtectedBlocks1.ts]
declare function log(s: string): void;
declare function get(): number;

function main1() : number {
    try {
        return get();
    }
    finally {
        log("in finally");
    }
}

//// [noImplicitReturnsWithProtectedBlocks1.js]
function main1() {
    try {
        return get();
    }
    finally {
        log("in finally");
    }
}
