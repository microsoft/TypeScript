import { ConcurrentMap, ConcurrentMapWrapper } from "../../_namespaces/ts";

describe("unittests:: sharing:: concurrentMap", () => {
    it("round trip", () => {
        const map = new ConcurrentMapWrapper(new ConcurrentMap<number, string>());
        assert.equal(map.size, 0);
        assert.isFalse(map.has(1));
        map.set(1, "a");
        assert.equal(map.size, 1);
        assert.isTrue(map.has(1));
        map.delete(1);
        assert.equal(map.size, 0);
        assert.isFalse(map.has(1));
    });
    it("large inserts", () => {
        const map = new ConcurrentMapWrapper(new ConcurrentMap<number, number>());
        for (let i = 0; i < 10_000; i++) {
            map.insert(i, i);
        }
        assert.equal(map.size, 10_000);
    });
    it("large deletes", () => {
        const map = new ConcurrentMapWrapper(new ConcurrentMap<number, number>());
        for (let i = 0; i < 10_000; i++) {
            map.insert(i, i);
        }
        for (let i = 0; i < 10_000; i++) {
            map.delete(i);
        }
        assert.equal(map.size, 0);
    });
    describe("exchange", () => {
        it("sets key to value if missing", () => {
            const map = new ConcurrentMapWrapper(new ConcurrentMap<number, number>());
            map.exchange(1, 2);
            assert.equal(map.size, 1);
            assert.isTrue(map.has(1));
            assert.equal(map.get(1), 2);
        });
        it("overwrites key if present and value is not undefined", () => {
            const map = new ConcurrentMapWrapper(new ConcurrentMap<number, number>());
            map.set(1, 2);
            map.exchange(1, 3);
            assert.equal(map.size, 1);
            assert.isTrue(map.has(1));
            assert.equal(map.get(1), 3);
        });
        it("deletes key if present and value is undefined", () => {
            const map = new ConcurrentMapWrapper(new ConcurrentMap<number, number>());
            map.set(1, 2);
            map.exchange(1, /*value*/ undefined);
            assert.equal(map.size, 0);
            assert.isFalse(map.has(1));
            assert.equal(map.get(1), /*expected*/ undefined);
        });
        it("returns undefined if key was not present", () => {
            const map = new ConcurrentMapWrapper(new ConcurrentMap<number, number>());
            const result = map.exchange(1, 2);
            assert.isUndefined(result);
        });
        it("returns previous value if key was present", () => {
            const map = new ConcurrentMapWrapper(new ConcurrentMap<number, number>());
            map.set(1, 2);
            const result1 = map.exchange(1, 3);
            const result2 = map.exchange(1, /*value*/ undefined);
            assert.equal(result1, 2);
            assert.equal(result2, 3);
        });
    });
    describe("compareExchange", () => {
        it("sets key to value if expecting undefined and key not present", () => {
            const map = new ConcurrentMapWrapper(new ConcurrentMap<number, number>());
            map.compareExchange(1, /*expectedValue*/ undefined, 2);
            assert.equal(map.size, 1);
            assert.isTrue(map.has(1));
            assert.equal(map.get(1), 2);
        });
        it("does not set key to value if expecting undefined and key is present", () => {
            const map = new ConcurrentMapWrapper(new ConcurrentMap<number, number>());
            map.set(1, 2);
            map.compareExchange(1, /*expectedValue*/ undefined, 3);
            assert.equal(map.size, 1);
            assert.isTrue(map.has(1));
            assert.equal(map.get(1), 2);
        });
        it("overwrites key if present, expected value matches, and replacement value is not undefined", () => {
            const map = new ConcurrentMapWrapper(new ConcurrentMap<number, number>());
            map.set(1, 2);
            map.compareExchange(1, 2, 3);
            assert.equal(map.size, 1);
            assert.isTrue(map.has(1));
            assert.equal(map.get(1), 3);
        });
        it("does not overwrite key if present, expected value does not match, and replacement value is not undefined", () => {
            const map = new ConcurrentMapWrapper(new ConcurrentMap<number, number>());
            map.set(1, 2);
            map.compareExchange(1, 4, 3);
            assert.equal(map.size, 1);
            assert.isTrue(map.has(1));
            assert.equal(map.get(1), 2);
        });
        it("deletes key if present, expected value matches, and value is undefined", () => {
            const map = new ConcurrentMapWrapper(new ConcurrentMap<number, number>());
            map.set(1, 2);
            map.compareExchange(1, 2, /*replacementValue*/ undefined);
            assert.equal(map.size, 0);
            assert.isFalse(map.has(1));
            assert.equal(map.get(1), /*expected*/ undefined);
        });
        it("does not delete key if present, expected value does not match, and value is undefined", () => {
            const map = new ConcurrentMapWrapper(new ConcurrentMap<number, number>());
            map.set(1, 2);
            map.compareExchange(1, 3, /*replacementValue*/ undefined);
            assert.equal(map.size, 1);
            assert.isTrue(map.has(1));
            assert.equal(map.get(1), 2);
        });
        it("returns undefined if key was not present and expected value is undefined", () => {
            const map = new ConcurrentMapWrapper(new ConcurrentMap<number, number>());
            const result = map.compareExchange(1, /*expectedValue*/ undefined, 2);
            assert.isUndefined(result);
        });
        it("returns undefined if key was not present and expected value was not undefined", () => {
            const map = new ConcurrentMapWrapper(new ConcurrentMap<number, number>());
            const result = map.compareExchange(1, 2, 3);
            assert.isUndefined(result);
        });
        it("returns previous value if key was present and expected value matches", () => {
            const map = new ConcurrentMapWrapper(new ConcurrentMap<number, number>());
            map.set(1, 2);
            const result1 = map.compareExchange(1, 2, 3);
            const result2 = map.compareExchange(1, 3, /*value*/ undefined);
            assert.equal(result1, 2);
            assert.equal(result2, 3);
        });
        it("returns previous value if key was present and expected value did not match", () => {
            const map = new ConcurrentMapWrapper(new ConcurrentMap<number, number>());
            map.set(1, 2);
            const result1 = map.compareExchange(1, 3, 4);
            const result2 = map.compareExchange(1, 4, /*value*/ undefined);
            assert.equal(result1, 2);
            assert.equal(result2, 2);
        });
    });
});