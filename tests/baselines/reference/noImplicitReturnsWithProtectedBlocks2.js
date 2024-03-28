//// [tests/cases/compiler/noImplicitReturnsWithProtectedBlocks2.ts] ////

//// [noImplicitReturnsWithProtectedBlocks2.ts]
declare function log(s: string): void;
declare function get(): number;

function main1() : number {
    try {
        return get();
    }
    catch(e) {
        log("in catch");
    }
    finally {
        log("in finally");
    }
}

//// [noImplicitReturnsWithProtectedBlocks2.js]
function main1() {
    try {
        return get();
    }
    catch (e) {
        log("in catch");
    }
    finally {
        log("in finally");
    }
}
