namespace ts {
    describe("unittests:: shimMap", () => {

        function testMapIterationAddedValues(map: Map<string>, useForEach: boolean): string {
            let resultString = "";

            map.set("1", "1");
            map.set("3", "3");
            map.set("2", "2");
            map.set("4", "4");

            let addedThree = false;
            const doForEach = (value: string, key: string) => {
                resultString += `${key}:${value};`;

                // Add a new key ("0") - the map should provide this
                // one in the next iteration.
                if (key === "1") {
                    map.set("1", "X1");
                    map.set("0", "X0");
                    map.set("4", "X4");
                }
                else if (key === "3") {
                    if (!addedThree) {
                        addedThree = true;

                        // Remove and re-add key "3"; the map should
                        // visit it after "0".
                        map.delete("3");
                        map.set("3", "Y3");

                        // Change the value of "2"; the map should provide
                        // it when visiting the key.
                        map.set("2", "Y2");
                    }
                    else {
                        // Check that an entry added when we visit the
                        // currently last entry will still be visited.
                        map.set("999", "999");
                    }
                }
                else if (key === "999") {
                    // Ensure that clear() behaves correctly same as removing all keys.
                    map.set("A", "A");
                    map.set("B", "B");
                    map.set("C", "C");
                }
                else if (key === "A") {
                    map.clear();
                    map.set("Z", "Z");
                }
                else if (key === "Z") {
                    // Check that the map behaves correctly when two items are
                    // added and removed immediately.
                    map.set("X", "X");
                    map.set("X1", "X1");
                    map.set("X2", "X2");
                    map.delete("X1");
                    map.delete("X2");
                    map.set("Y", "Y");
                }
            };

            if (useForEach) {
                map.forEach(doForEach);
            }
            else {
                // Use an iterator.
                const iterator = map.entries();
                while (true) {
                    const { value: tuple, done } = iterator.next();
                    if (done) {
                        break;
                    }

                    doForEach(tuple[1], tuple[0]);
                }
            }

            return resultString;
        }

        it("iterates values in insertion order and handles changes", () => {
            const expectedResult = "1:1;3:3;2:Y2;4:X4;0:X0;3:Y3;999:999;A:A;Z:Z;X:X;Y:Y;";

            // First, ensure the test actually has the same behavior as a native Map.
            let nativeMap = createMap<string>();
            const nativeMapForEachResult = testMapIterationAddedValues(nativeMap, /* useForEach */ true);
            assert.equal(nativeMapForEachResult, expectedResult, "nativeMap-forEach");

            nativeMap = createMap<string>();
            const nativeMapIteratorResult = testMapIterationAddedValues(nativeMap, /* useForEach */ false);
            assert.equal(nativeMapIteratorResult, expectedResult, "nativeMap-iterator");

            // Then, test the shimMap.
            let localShimMap = new (shimMap())<string>();
            const shimMapForEachResult = testMapIterationAddedValues(localShimMap, /* useForEach */ true);
            assert.equal(shimMapForEachResult, expectedResult, "shimMap-forEach");

            localShimMap = new (shimMap())<string>();
            const shimMapIteratorResult = testMapIterationAddedValues(localShimMap, /* useForEach */ false);
            assert.equal(shimMapIteratorResult, expectedResult, "shimMap-iterator");

        });
    });
}
