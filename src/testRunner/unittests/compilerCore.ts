import * as ts from "../_namespaces/ts.js";

describe("unittests:: compilerCore", () => {
    describe("equalOwnProperties", () => {
        it("correctly equates objects", () => {
            assert.isTrue(ts.equalOwnProperties({}, {}));
            assert.isTrue(ts.equalOwnProperties({ a: 1 }, { a: 1 }));
            assert.isTrue(ts.equalOwnProperties({ a: 1, b: 2 }, { b: 2, a: 1 }));
        });
        it("correctly identifies unmatched objects", () => {
            assert.isFalse(ts.equalOwnProperties({}, { a: 1 }), "missing left property");
            assert.isFalse(ts.equalOwnProperties({ a: 1 }, {}), "missing right property");
            assert.isFalse(ts.equalOwnProperties({ a: 1 }, { a: 2 }), "differing property");
        });
        it("correctly identifies undefined vs hasOwnProperty", () => {
            assert.isFalse(ts.equalOwnProperties({}, { a: undefined }), "missing left property");
            assert.isFalse(ts.equalOwnProperties({ a: undefined }, {}), "missing right property");
        });
        it("truthiness", () => {
            const trythyTest = (l: any, r: any) => !!l === !!r;
            assert.isFalse(ts.equalOwnProperties({}, { a: 1 }, trythyTest), "missing left truthy property");
            assert.isFalse(ts.equalOwnProperties({}, { a: 0 }, trythyTest), "missing left falsey property");
            assert.isFalse(ts.equalOwnProperties({ a: 1 }, {}, trythyTest), "missing right truthy property");
            assert.isFalse(ts.equalOwnProperties({ a: 0 }, {}, trythyTest), "missing right falsey property");
            assert.isTrue(ts.equalOwnProperties({ a: 1 }, { a: "foo" as any }, trythyTest), "valid equality");
        });
        it("all equal", () => {
            assert.isFalse(ts.equalOwnProperties({}, { a: 1 }, () => true), "missing left property");
            assert.isFalse(ts.equalOwnProperties({ a: 1 }, {}, () => true), "missing right property");
            assert.isTrue(ts.equalOwnProperties({ a: 1 }, { a: 2 }, () => true), "valid equality");
        });
    });
    describe("customSet", () => {
        it("mutation", () => {
            const set = ts.createSet<number, number>(x => x % 2, (x, y) => (x % 4) === (y % 4));
            assert.equal(set.size, 0);

            const newSet = set.add(0);
            assert.strictEqual(newSet, set);
            assert.equal(set.size, 1);

            set.add(1);
            assert.equal(set.size, 2);

            set.add(2); // Collision with 0
            assert.equal(set.size, 3);

            set.add(3); // Collision with 1
            assert.equal(set.size, 4);

            set.add(4); // Already present as 0
            assert.equal(set.size, 4);

            set.add(5); // Already present as 1
            assert.equal(set.size, 4);

            assert.isTrue(set.has(6));
            assert.isTrue(set.has(7));

            assert.isTrue(set.delete(8));
            assert.equal(set.size, 3);
            assert.isFalse(set.has(8));
            assert.isFalse(set.delete(8));

            assert.isTrue(set.delete(9));
            assert.equal(set.size, 2);

            assert.isTrue(set.delete(10));
            assert.equal(set.size, 1);

            assert.isTrue(set.delete(11));
            assert.equal(set.size, 0);
        });
        it("resizing", () => {
            const set = ts.createSet<number, number>(x => x % 2, (x, y) => x === y);
            const elementCount = 100;

            for (let i = 0; i < elementCount; i++) {
                assert.isFalse(set.has(i));
                set.add(i);
                assert.isTrue(set.has(i));
                assert.equal(set.size, i + 1);
            }

            for (let i = 0; i < elementCount; i++) {
                assert.isTrue(set.has(i));
                set.delete(i);
                assert.isFalse(set.has(i));
                assert.equal(set.size, elementCount - (i + 1));
            }
        });
        it("clear", () => {
            const set = ts.createSet<number, number>(x => x % 2, (x, y) => (x % 4) === (y % 4));
            for (let j = 0; j < 2; j++) {
                for (let i = 0; i < 100; i++) {
                    set.add(i);
                }
                assert.equal(set.size, 4);

                set.clear();
                assert.equal(set.size, 0);
                assert.isFalse(set.has(0));
            }
        });
        it("forEach", () => {
            const set = ts.createSet<number, number>(x => x % 2, (x, y) => (x % 4) === (y % 4));
            for (let i = 0; i < 100; i++) {
                set.add(i);
            }

            const values: number[] = [];
            const keys: number[] = [];
            set.forEach((value, key) => {
                values.push(value);
                keys.push(key);
            });

            assert.equal(values.length, 4);

            values.sort();
            keys.sort();

            // NB: first equal value wins (i.e. not [96, 97, 98, 99])
            const expected = [0, 1, 2, 3];
            assert.deepEqual(values, expected);
            assert.deepEqual(keys, expected);
        });
        it("iteration", () => {
            const set = ts.createSet<number, number>(x => x % 2, (x, y) => (x % 4) === (y % 4));
            for (let i = 0; i < 4; i++) {
                set.add(i);
            }

            const expected = [0, 1, 2, 3];
            let actual: number[];

            actual = ts.arrayFrom(set.keys());
            actual.sort();
            assert.deepEqual(actual, expected);

            actual = ts.arrayFrom(set.values());
            actual.sort();
            assert.deepEqual(actual, expected);

            const actualTuple = ts.arrayFrom(set.entries());
            assert.isFalse(actualTuple.some(([v, k]) => v !== k));
            actual = actualTuple.map(([v, _]) => v);
            actual.sort();
            assert.deepEqual(actual, expected);
        });
        it("string hash code", () => {
            interface Thing {
                x: number;
                y: string;
            }

            const set = ts.createSet<Thing, string>(t => t.y, (t, u) => t.x === u.x && t.y === u.y);

            const thing1: Thing = {
                x: 1,
                y: "a",
            };

            const thing2: Thing = {
                x: 2,
                y: "b",
            };

            const thing3: Thing = {
                x: 3,
                y: "a", // Collides with thing1
            };

            set.add(thing1);
            set.add(thing2);
            set.add(thing3);

            assert.equal(set.size, 3);

            assert.isTrue(set.has(thing1));
            assert.isTrue(set.has(thing2));
            assert.isTrue(set.has(thing3));

            assert.isFalse(set.has({
                x: 4,
                y: "a", // Collides with thing1
            }));

            assert.isFalse(set.has({
                x: 5,
                y: "c", // No collision
            }));
        });
    });
});
