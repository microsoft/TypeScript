import assert from "node:assert";
import { test as nodeTest } from "node:test";
import defaultTest, {
    describe,
    runRegisteredTests,
    test,
} from "./harness.ts";

nodeTest("browser test harness preserves skip options", async () => {
    assert.strictEqual(defaultTest, test);
    test("skipped test", { skip: "test reason" }, () => assert.fail("skipped test ran"));
    describe("skipped suite", { skip: "suite reason" }, () => {
        test("nested test", () => assert.fail("skipped suite ran"));
    });
    describe("nested suite", () => {
        test("passing test", () => {});
    });

    assert.deepStrictEqual(await runRegisteredTests([]), {
        passed: 1,
        skipped: [
            { name: "skipped test", reason: "test reason" },
            { name: "skipped suite > nested test", reason: "suite reason" },
        ],
        failures: [],
    });
});
