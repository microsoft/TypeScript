// @strict: true

// @filename: asserts.ts
function isNonNullable<T>(obj: T): asserts obj is NonNullable<T> {
    if (obj === undefined || obj === null) {
        throw new Error("Must not be a nullable value");
    }
}

export {
    isNonNullable
};

// @filename: test.ts
import * as asserts from "./asserts";

function test(obj: string | null): void {
    asserts.isNonNullable(obj);
    obj.trim();
}
