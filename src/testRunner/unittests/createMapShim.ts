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

        it("iterates values in insertion order and handles changes with string keys", () => {
            const expectedResult = "1:1;3:3;2:Y2;4:X4;0:X0;3:Y3;999:999;A:A;Z:Z;X:X;Y:Y;";

            // First, ensure the test actually has the same behavior as a native Map.
            let nativeMap = createMap<string>();
            const nativeMapForEachResult = testMapIterationAddedValues(stringKeys, nativeMap, /* useForEach */ true);
            assert.equal(nativeMapForEachResult, expectedResult, "nativeMap-forEach");

            nativeMap = createMap<string>();
            const nativeMapIteratorResult = testMapIterationAddedValues(stringKeys, nativeMap, /* useForEach */ false);
            assert.equal(nativeMapIteratorResult, expectedResult, "nativeMap-iterator");

            // Then, test the map shim.
            const MapShim = createMapShim(); // tslint:disable-line variable-name
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
            let nativeMap = createMap<any, string>();
            const nativeMapForEachResult = testMapIterationAddedValues(mixedKeys, nativeMap, /* useForEach */ true);
            assert.equal(nativeMapForEachResult, expectedResult, "nativeMap-forEach");

            nativeMap = createMap<any, string>();
            const nativeMapIteratorResult = testMapIterationAddedValues(mixedKeys, nativeMap, /* useForEach */ false);
            assert.equal(nativeMapIteratorResult, expectedResult, "nativeMap-iterator");

            // Then, test the map shim.
            const MapShim = createMapShim(); // tslint:disable-line variable-name
            let localShimMap = new MapShim<any, string>();
            const shimMapForEachResult = testMapIterationAddedValues(mixedKeys, localShimMap, /* useForEach */ true);
            assert.equal(shimMapForEachResult, expectedResult, "shimMap-forEach");

            localShimMap = new MapShim<any, string>();
            const shimMapIteratorResult = testMapIterationAddedValues(mixedKeys, localShimMap, /* useForEach */ false);
            assert.equal(shimMapIteratorResult, expectedResult, "shimMap-iterator");
        });
    });
}
