namespace ts {
    describe("unittests:: createMapShim", () => {

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

        function testMapIterationAddedValues<K>(keys: K[], map: Map<K, string>, useForEach: boolean): string {
            let resultString = "";

            map.set(keys[0], "1");
            map.set(keys[1], "3");
            map.set(keys[2], "2");
            map.set(keys[3], "4");

            let addedThree = false;
            const doForEach = (value: string, key: K) => {
                resultString += `${key}:${value};`;

                // Add a new key ("0") - the map should provide this
                // one in the next iteration.
                if (key === keys[0]) {
                    map.set(keys[0], "X1");
                    map.set(keys[4], "X0");
                    map.set(keys[3], "X4");
                }
                else if (key === keys[1]) {
                    if (!addedThree) {
                        addedThree = true;

                        // Remove and re-add key "3"; the map should
                        // visit it after "0".
                        map.delete(keys[1]);
                        map.set(keys[1], "Y3");

                        // Change the value of "2"; the map should provide
                        // it when visiting the key.
                        map.set(keys[2], "Y2");
                    }
                    else {
                        // Check that an entry added when we visit the
                        // currently last entry will still be visited.
                        map.set(keys[5], "999");
                    }
                }
                else if (key === keys[5]) {
                    // Ensure that clear() behaves correctly same as removing all keys.
                    map.set(keys[6], "A");
                    map.set(keys[7], "B");
                    map.set(keys[8], "C");
                }
                else if (key === keys[6]) {
                    map.clear();
                    map.set(keys[9], "Z");
                }
                else if (key === keys[9]) {
                    // Check that the map behaves correctly when two items are
                    // added and removed immediately.
                    map.set(keys[10], "X");
                    map.set(keys[11], "X1");
                    map.set(keys[12], "X2");
                    map.delete(keys[11]);
                    map.delete(keys[12]);
                    map.set(keys[13], "Y");
                }
            };

            if (useForEach) {
                map.forEach(doForEach);
            }
            else {
                // Use an iterator.
                const iterator = map.entries();
                while (true) {
                    const iterResult = iterator.next();
                    if (iterResult.done) {
                        break;
                    }

                    const [key, value] = iterResult.value;
                    doForEach(value, key);
                }
            }

            return resultString;
        }

        let MapShim!: MapConstructor;
        beforeEach(() => {
            function getIterator<I extends readonly any[] | ReadonlySet<any> | ReadonlyMap<any, any> | undefined>(iterable: I): Iterator<
                I extends ReadonlyMap<infer K, infer V> ? [K, V] :
                I extends ReadonlySet<infer T> ? T :
                I extends readonly (infer T)[] ? T :
                I extends undefined ? undefined :
                never>;
            function getIterator(iterable: readonly any[] | ReadonlySet<any> | ReadonlyMap<any, any> | undefined): Iterator<any> | undefined {
                // override `ts.getIterator` with a version that allows us to iterate over a `MapShim` in an environment with a native `Map`.
                if (iterable instanceof MapShim) return iterable.entries();
                return ts.getIterator(iterable);
            }

            MapShim = ShimCollections.createMapShim(getIterator);
            afterEach(() => {
                MapShim = undefined!;
            });
        });

        it("iterates values in insertion order and handles changes with string keys", () => {
            const expectedResult = "1:1;3:3;2:Y2;4:X4;0:X0;3:Y3;999:999;A:A;Z:Z;X:X;Y:Y;";

            // First, ensure the test actually has the same behavior as a native Map.
            let nativeMap = new Map<string, string>();
            const nativeMapForEachResult = testMapIterationAddedValues(stringKeys, nativeMap, /* useForEach */ true);
            assert.equal(nativeMapForEachResult, expectedResult, "nativeMap-forEach");

            nativeMap = new Map<string, string>();
            const nativeMapIteratorResult = testMapIterationAddedValues(stringKeys, nativeMap, /* useForEach */ false);
            assert.equal(nativeMapIteratorResult, expectedResult, "nativeMap-iterator");

            // Then, test the map shim.
            let localShimMap = new MapShim<string, string>();
            const shimMapForEachResult = testMapIterationAddedValues(stringKeys, localShimMap, /* useForEach */ true);
            assert.equal(shimMapForEachResult, expectedResult, "shimMap-forEach");

            localShimMap = new MapShim<string, string>();
            const shimMapIteratorResult = testMapIterationAddedValues(stringKeys, localShimMap, /* useForEach */ false);
            assert.equal(shimMapIteratorResult, expectedResult, "shimMap-iterator");
        });

        it("iterates values in insertion order and handles changes with mixed-type keys", () => {
            const expectedResult = "true:1;3:3;2:Y2;4:X4;false:X0;3:Y3;null:999;undefined:A;Z:Z;X:X;Y:Y;";

            // First, ensure the test actually has the same behavior as a native Map.
            let nativeMap = new Map<any, string>();
            const nativeMapForEachResult = testMapIterationAddedValues(mixedKeys, nativeMap, /* useForEach */ true);
            assert.equal(nativeMapForEachResult, expectedResult, "nativeMap-forEach");

            nativeMap = new Map<any, string>();
            const nativeMapIteratorResult = testMapIterationAddedValues(mixedKeys, nativeMap, /* useForEach */ false);
            assert.equal(nativeMapIteratorResult, expectedResult, "nativeMap-iterator");

            // Then, test the map shim.
            let localShimMap = new MapShim<any, string>();
            const shimMapForEachResult = testMapIterationAddedValues(mixedKeys, localShimMap, /* useForEach */ true);
            assert.equal(shimMapForEachResult, expectedResult, "shimMap-forEach");

            localShimMap = new MapShim<any, string>();
            const shimMapIteratorResult = testMapIterationAddedValues(mixedKeys, localShimMap, /* useForEach */ false);
            assert.equal(shimMapIteratorResult, expectedResult, "shimMap-iterator");
        });

        it("create from Array", () => {
            const map = new MapShim([["a", "b"]]);
            assert.equal(map.size, 1);
            assert.isTrue(map.has("a"));
            assert.equal(map.get("a"), "b");
        });

        it("create from Map", () => {
            const map1 = new MapShim([["a", "b"]]);
            const map2 = new MapShim(map1);
            assert.equal(map1.size, 1);
            assert.equal(map2.size, 1);
            assert.isTrue(map2.has("a"));
            assert.equal(map2.get("a"), "b");
        });

        it("set when not present", () => {
            const map = new MapShim<string, string>();
            const result = map.set("a", "b");
            assert.equal(map.size, 1);
            assert.strictEqual(result, map);
            assert.isTrue(map.has("a"));
            assert.equal(map.get("a"), "b");
        });

        it("set when present", () => {
            const map = new MapShim<string, string>();
            map.set("a", "z");
            const result = map.set("a", "b");
            assert.equal(map.size, 1);
            assert.strictEqual(result, map);
            assert.isTrue(map.has("a"));
            assert.equal(map.get("a"), "b");
        });

        it("has when not present", () => {
            const map = new MapShim<string, string>();
            assert.isFalse(map.has("a"));
        });

        it("has when present", () => {
            const map = new MapShim<string, string>();
            map.set("a", "b");
            assert.isTrue(map.has("a"));
        });

        it("get when not present", () => {
            const map = new MapShim<string, string>();
            assert.isUndefined(map.get("a"));
        });

        it("get when present", () => {
            const map = new MapShim<string, string>();
            map.set("a", "b");
            assert.equal(map.get("a"), "b");
        });

        it("delete when not present", () => {
            const map = new MapShim<string, string>();
            assert.isFalse(map.delete("a"));
        });

        it("delete when present", () => {
            const map = new MapShim<string, string>();
            map.set("a", "b");
            assert.isTrue(map.delete("a"));
        });

        it("delete twice when present", () => {
            const map = new MapShim<string, string>();
            map.set("a", "b");
            assert.isTrue(map.delete("a"));
            assert.isFalse(map.delete("a"));
        });

        it("remove only item and iterate", () => {
            const map = new MapShim<string, string>();
            map.set("a", "b");
            map.delete("a");
            const actual = arrayFrom(map.keys());
            assert.deepEqual(actual, []);
        });

        it("remove first item and iterate", () => {
            const map = new MapShim<string, string>();
            map.set("a", "b");
            map.set("c", "d");
            map.delete("a");
            assert.deepEqual(arrayFrom(map.keys()), ["c"]);
            assert.deepEqual(arrayFrom(map.values()), ["d"]);
            assert.deepEqual(arrayFrom(map.entries()), [["c", "d"]]);
        });

        it("remove last item and iterate", () => {
            const map = new MapShim<string, string>();
            map.set("a", "b");
            map.set("c", "d");
            map.delete("c");
            assert.deepEqual(arrayFrom(map.keys()), ["a"]);
            assert.deepEqual(arrayFrom(map.values()), ["b"]);
            assert.deepEqual(arrayFrom(map.entries()), [["a", "b"]]);
        });

        it("remove middle item and iterate", () => {
            const map = new MapShim<string, string>();
            map.set("a", "b");
            map.set("c", "d");
            map.set("e", "f");
            map.delete("c");
            assert.deepEqual(arrayFrom(map.keys()), ["a", "e"]);
            assert.deepEqual(arrayFrom(map.values()), ["b", "f"]);
            assert.deepEqual(arrayFrom(map.entries()), [["a", "b"], ["e", "f"]]);
        });

        it("keys", () => {
            const map = new MapShim<string, string>();
            map.set("c", "d");
            map.set("a", "b");
            assert.deepEqual(arrayFrom(map.keys()), ["c", "a"]);
        });

        it("values", () => {
            const map = new MapShim<string, string>();
            map.set("c", "d");
            map.set("a", "b");
            assert.deepEqual(arrayFrom(map.values()), ["d", "b"]);
        });

        it("entries", () => {
            const map = new MapShim<string, string>();
            map.set("c", "d");
            map.set("a", "b");
            assert.deepEqual(arrayFrom(map.entries()), [["c", "d"], ["a", "b"]]);
        });

        it("forEach", () => {
            const map = new MapShim<string, string>();
            map.set("c", "d");
            map.set("a", "b");
            const actual: [string, string][] = [];
            map.forEach((value, key) => { actual.push([key, value]); });
            assert.deepEqual(actual, [["c", "d"], ["a", "b"]]);
        });
    });
}
