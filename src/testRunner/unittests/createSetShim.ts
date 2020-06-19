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

                // Add a new key ("0") - the map should provide this
                // one in the next iteration.
                if (key === keys[0]) {
                    set.add(keys[0]);
                    set.add(keys[4]);
                    set.add(keys[3]);
                }
                else if (key === keys[1]) {
                    if (!addedThree) {
                        addedThree = true;

                        // Remove and re-add key "3"; the map should
                        // visit it after "0".
                        set.delete(keys[1]);
                        set.add(keys[1]);

                        // Change the value of "2"; the map should provide
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
                    // Check that the map behaves correctly when two items are
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

        it("iterates values in insertion order and handles changes with string keys", () => {
            const expectedResult = "1;3;2;4;0;3;999;A;Z;X;Y;";

            // First, ensure the test actually has the same behavior as a native Map.
            let nativeSet = new Set<string>();
            const nativeSetForEachResult = testSetIterationAddedValues(stringKeys, nativeSet, /* useForEach */ true);
            assert.equal(nativeSetForEachResult, expectedResult, "nativeSet-forEach");

            nativeSet = new Set<string>();
            const nativeSetIteratorResult = testSetIterationAddedValues(stringKeys, nativeSet, /* useForEach */ false);
            assert.equal(nativeSetIteratorResult, expectedResult, "nativeSet-iterator");

            // Then, test the map shim.
            const SetShim = ShimCollections.createSetShim(getIterator);
            let localShimSet = new SetShim<string>();
            const shimSetForEachResult = testSetIterationAddedValues(stringKeys, localShimSet, /* useForEach */ true);
            assert.equal(shimSetForEachResult, expectedResult, "shimSet-forEach");

            localShimSet = new SetShim<string>();
            const shimSetIteratorResult = testSetIterationAddedValues(stringKeys, localShimSet, /* useForEach */ false);
            assert.equal(shimSetIteratorResult, expectedResult, "shimSet-iterator");
        });

        it("iterates values in insertion order and handles changes with mixed-type keys", () => {
            const expectedResult = "true;3;2;4;false;3;null;undefined;Z;X;Y;";

            // First, ensure the test actually has the same behavior as a native Map.
            let nativeSet = new Set<any>();
            const nativeSetForEachResult = testSetIterationAddedValues(mixedKeys, nativeSet, /* useForEach */ true);
            assert.equal(nativeSetForEachResult, expectedResult, "nativeSet-forEach");

            nativeSet = new Set<any>();
            const nativeSetIteratorResult = testSetIterationAddedValues(mixedKeys, nativeSet, /* useForEach */ false);
            assert.equal(nativeSetIteratorResult, expectedResult, "nativeSet-iterator");

            // Then, test the map shim.
            const SetShim = ShimCollections.createSetShim(getIterator); // tslint:disable-line variable-name
            let localshimSet = new SetShim<any>();
            const shimSetForEachResult = testSetIterationAddedValues(mixedKeys, localshimSet, /* useForEach */ true);
            assert.equal(shimSetForEachResult, expectedResult, "shimSet-forEach");

            localshimSet = new SetShim<any>();
            const shimSetIteratorResult = testSetIterationAddedValues(mixedKeys, localshimSet, /* useForEach */ false);
            assert.equal(shimSetIteratorResult, expectedResult, "shimSet-iterator");
        });
    });
}
