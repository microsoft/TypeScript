import {
    expect,
} from "chai";

import {
    mapLongExpressionToResult,
} from "../../../src/services/utilities";

describe("mapLongExpressionToResult", () => {
    it("should return the mapped value if it exists", () => {
        const mappings = {
            a: 10,
            b: 20,
            c: 30,
        };
        const value = "a";
        const x = 5;

        expect(mapLongExpressionToResult(value, x, mappings)).to.equal(10);
    });

    it("should return the default value if no mapping exists", () => {
        const mappings = {
            a: 10,
            b: 20,
            c: 30,
        };
        const value = "d";
        const x = 5;

        expect(mapLongExpressionToResult(value, x, mappings)).to.equal(5);
    });

    it("should handle empty mappings", () => {
        const mappings = {};
        const value = "any_value";
        const x = 100;

        expect(mapLongExpressionToResult(value, x, mappings)).to.equal(100);
    });
});
