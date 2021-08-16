namespace ts {
    describe("unittests:: createSetShim", () => {
        const stringKeys = [
            "1",
            "3",
            "2",
            "4",
            "0",
            "999",
            "A",
            "B",
            "C",
            "Z",
            "X",
            "X1",
            "X2",
            "Y"
        ];

        const mixedKeys = [
            true,
            3,
            { toString() { return "2"; } },
            "4",
            false,
            null, // eslint-disable-line no-null/no-null
            undefined,
            "B",
            { toString() { return "C"; } },
            "Z",
            "X",
            { toString() { return "X1"; } },
            "X2",
            "Y"
        ];

        function testSetIterationAddedValues<K>(keys: K[], set: Set<K>, useForEach: boolean): string {
            let resultString = "";

            set.add(keys[0]);
            set.add(keys[1]);
            set.add(keys[2]);
            set.add(keys[3]);

            let addedThree = false;
            const doForEach = (key: K) => {
                resultString += `${key};`;

                // Add a new key ("0") - the set should provide this
                // one in the next iteration.
                if (key === keys[0]) {
                    set.add(keys[0]);
                    set.add(keys[4]);
                    set.add(keys[3]);
                }
                else if (key === keys[1]) {
                    if (!addedThree) {
                        addedThree = true;

                        // Remove and re-add key "3"; the set should
                        // visit it after "0".
                        set.delete(keys[1]);
                        set.add(keys[1]);

                        // Change the value of "2"; the set should provide
                        // it when visiting the key.
                        set.add(keys[2]);
                    }
                    else {
                        // Check that an entry added when we visit the
                        // currently last entry will still be visited.
                        set.add(keys[5]);
                    }
                }
                else if (key === keys[5]) {
                    // Ensure that clear() behaves correctly same as removing all keys.
                    set.add(keys[6]);
                    set.add(keys[7]);
                    set.add(keys[8]);
                }
                else if (key === keys[6]) {
                    set.clear();
                    set.add(keys[9]);
                }
                else if (key === keys[9]) {
                    // Check that the set behaves correctly when two items are
                    // added and removed immediately.
                    set.add(keys[10]);
                    set.add(keys[11]);
                    set.add(keys[12]);
                    set.delete(keys[11]);
                    set.delete(keys[12]);
                    set.add(keys[13]);
                }
            };

            if (useForEach) {
                set.forEach(doForEach);
            }
            else {
                // Use an iterator.
                const iterator = set.values();
                while (true) {
                    const iterResult = iterator.next();
                    if (iterResult.done) {
                        break;
                    }

                    doForEach(iterResult.value);
                }
            }

            return resultString;
        }

        let SetShim!: SetConstructor;
        beforeEach(() => {
            function getIterator<I extends readonly any[] | ReadonlySet<any> | ReadonlyESMap<any, any> | undefined>(iterable: I): Iterator<
                I extends ReadonlyESMap<infer K, infer V> ? [K, V] :
                I extends ReadonlySet<infer T> ? T :
                I extends readonly (infer T)[] ? T :
                I extends undefined ? undefined :
                never>;
            function getIterator(iterable: readonly any[] | ReadonlySet<any> | ReadonlyESMap<any, any> | undefined): Iterator<any> | undefined {
                // override `ts.getIterator` with a version that allows us to iterate over a `SetShim` in an environment with a native `Set`.
                if (iterable instanceof SetShim) return iterable.values();
                return ts.getIterator(iterable);
            }

            SetShim = ShimCollections.createSetShim(getIterator);
            afterEach(() => {
                SetShim = undefined!;
            });
        });

        it("iterates values in insertion order and handles changes with string keys", () => {
            const expectedResult = "1;3;2;4;0;3;999;A;Z;X;Y;";

            // First, ensure the test actually has the same behavior as a native Set.
            let nativeSet = new Set<string>();
            const nativeSetForEachResult = testSetIterationAddedValues(stringKeys, nativeSet, /* useForEach */ true);
            assert.equal(nativeSetForEachResult, expectedResult, "nativeSet-forEach");

            nativeSet = new Set<string>();
            const nativeSetIteratorResult = testSetIterationAddedValues(stringKeys, nativeSet, /* useForEach */ false);
            assert.equal(nativeSetIteratorResult, expectedResult, "nativeSet-iterator");

            // Then, test the set shim.
            let localShimSet = new SetShim<string>();
            const shimSetForEachResult = testSetIterationAddedValues(stringKeys, localShimSet, /* useForEach */ true);
            assert.equal(shimSetForEachResult, expectedResult, "shimSet-forEach");

            localShimSet = new SetShim<string>();
            const shimSetIteratorResult = testSetIterationAddedValues(stringKeys, localShimSet, /* useForEach */ false);
            assert.equal(shimSetIteratorResult, expectedResult, "shimSet-iterator");
        });

        it("iterates values in insertion order and handles changes with mixed-type keys", () => {
            const expectedResult = "true;3;2;4;false;3;null;undefined;Z;X;Y;";

            // First, ensure the test actually has the same behavior as a native Set.
            let nativeSet = new Set<any>();
            const nativeSetForEachResult = testSetIterationAddedValues(mixedKeys, nativeSet, /* useForEach */ true);
            assert.equal(nativeSetForEachResult, expectedResult, "nativeSet-forEach");

            nativeSet = new Set<any>();
            const nativeSetIteratorResult = testSetIterationAddedValues(mixedKeys, nativeSet, /* useForEach */ false);
            assert.equal(nativeSetIteratorResult, expectedResult, "nativeSet-iterator");

            // Then, test the set shim.
            let localshimSet = new SetShim<any>();
            const shimSetForEachResult = testSetIterationAddedValues(mixedKeys, localshimSet, /* useForEach */ true);
            assert.equal(shimSetForEachResult, expectedResult, "shimSet-forEach");

            localshimSet = new SetShim<any>();
            const shimSetIteratorResult = testSetIterationAddedValues(mixedKeys, localshimSet, /* useForEach */ false);
            assert.equal(shimSetIteratorResult, expectedResult, "shimSet-iterator");
        });

        it("create from Array", () => {
            const set = new SetShim(["a"]);
            assert.equal(set.size, 1);
            assert.isTrue(set.has("a"));
        });

        it("create from set", () => {
            const set1 = new SetShim(["a"]);
            const set2 = new SetShim(set1);
            assert.equal(set1.size, 1);
            assert.equal(set2.size, 1);
            assert.isTrue(set2.has("a"));
        });

        it("add when not present", () => {
            const set = new SetShim<string>();
            const result = set.add("a");
            assert.equal(set.size, 1);
            assert.strictEqual(result, set);
            assert.isTrue(set.has("a"));
        });

        it("add when present", () => {
            const set = new SetShim<string>();
            set.add("a");
            const result = set.add("a");
            assert.equal(set.size, 1);
            assert.strictEqual(result, set);
            assert.isTrue(set.has("a"));
        });

        it("has when not present", () => {
            const set = new SetShim<string>();
            assert.isFalse(set.has("a"));
        });

        it("has when present", () => {
            const set = new SetShim<string>();
            set.add("a");
            assert.isTrue(set.has("a"));
        });

        it("delete when not present", () => {
            const set = new SetShim<string>();
            assert.isFalse(set.delete("a"));
        });

        it("delete when present", () => {
            const set = new SetShim<string>();
            set.add("a");
            assert.isTrue(set.delete("a"));
        });

        it("delete twice when present", () => {
            const set = new SetShim<string>();
            set.add("a");
            assert.isTrue(set.delete("a"));
            assert.isFalse(set.delete("a"));
        });

        it("remove only item and iterate", () => {
            const set = new SetShim<string>();
            set.add("a");
            set.delete("a");
            const actual = arrayFrom(set.keys());
            assert.deepEqual(actual, []);
        });

        it("remove first item and iterate", () => {
            const set = new SetShim<string>();
            set.add("a");
            set.add("c");
            set.delete("a");
            assert.deepEqual(arrayFrom(set.keys()), ["c"]);
            assert.deepEqual(arrayFrom(set.values()), ["c"]);
            assert.deepEqual(arrayFrom(set.entries()), [["c", "c"]]);
        });

        it("remove last item and iterate", () => {
            const set = new SetShim<string>();
            set.add("a");
            set.add("c");
            set.delete("c");
            assert.deepEqual(arrayFrom(set.keys()), ["a"]);
            assert.deepEqual(arrayFrom(set.values()), ["a"]);
            assert.deepEqual(arrayFrom(set.entries()), [["a", "a"]]);
        });

        it("remove middle item and iterate", () => {
            const set = new SetShim<string>();
            set.add("a");
            set.add("c");
            set.add("e");
            set.delete("c");
            assert.deepEqual(arrayFrom(set.keys()), ["a", "e"]);
            assert.deepEqual(arrayFrom(set.values()), ["a", "e"]);
            assert.deepEqual(arrayFrom(set.entries()), [["a", "a"], ["e", "e"]]);
        });

        it("keys", () => {
            const set = new SetShim<string>();
            set.add("c");
            set.add("a");
            assert.deepEqual(arrayFrom(set.keys()), ["c", "a"]);
        });

        it("values", () => {
            const set = new SetShim<string>();
            set.add("c");
            set.add("a");
            assert.deepEqual(arrayFrom(set.values()), ["c", "a"]);
        });

        it("entries", () => {
            const set = new SetShim<string>();
            set.add("c");
            set.add("a");
            assert.deepEqual(arrayFrom(set.entries()), [["c", "c"], ["a", "a"]]);
        });

        it("forEach", () => {
            const set = new SetShim<string>();
            set.add("c");
            set.add("a");
            const actual: [string, string][] = [];
            set.forEach((value, key) => actual.push([key, value]));
            assert.deepEqual(actual, [["c", "c"], ["a", "a"]]);
        });
    });
}
