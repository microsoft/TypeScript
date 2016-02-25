//// [noImplicitReturnsWithProtectedBlocks3.ts]
declare function log(s: string): void;
declare function get(): number;

function main1() : number {
    try {
        return get();
    }
    catch(e) {
        log("in catch");
    }
}

//// [noImplicitReturnsWithProtectedBlocks3.js]
function main1() {
    try {
        return get();
    }
    catch (e) {
        log("in catch");
    }
}
