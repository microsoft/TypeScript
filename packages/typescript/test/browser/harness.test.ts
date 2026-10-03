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
    test("mock method", context => {
        const target = {
            value: 0,
            increment(amount: number) {
                this.value += amount;
                return this.value;
            },
        };
        const method = context.mock.method(target, "increment");
        assert.strictEqual(target.increment(2), 2);
        assert.strictEqual(method.mock.callCount(), 1);
    });

    assert.deepStrictEqual(await runRegisteredTests([]), {
        total: 4,
        passed: 2,
        skipped: [
            { name: "skipped test", reason: "test reason" },
            { name: "skipped suite > nested test", reason: "suite reason" },
        ],
        failures: [],
    });
});
