// @noImplicitReturns: true
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