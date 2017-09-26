/// <reference path="extractTestHelpers.ts" />

namespace ts {
    function testExtractRangeFailed(caption: string, s: string, expectedErrors: string[]) {
        return it(caption, () => {
            const t = extractTest(s);
            const file = createSourceFile("a.ts", t.source, ScriptTarget.Latest, /*setParentNodes*/ true);
            const selectionRange = t.ranges.get("selection");
            if (!selectionRange) {
                throw new Error(`Test ${s} does not specify selection range`);
            }
            const result = refactor.extractSymbol.getRangeToExtract(file, createTextSpanFromBounds(selectionRange.start, selectionRange.end));
            assert(result.targetRange === undefined, "failure expected");
            const sortedErrors = result.errors.map(e => <string>e.messageText).sort();
            assert.deepEqual(sortedErrors, expectedErrors.sort(), "unexpected errors");
        });
    }

    function testExtractRange(s: string): void {
        const t = extractTest(s);
        const f = createSourceFile("a.ts", t.source, ScriptTarget.Latest, /*setParentNodes*/ true);
        const selectionRange = t.ranges.get("selection");
        if (!selectionRange) {
            throw new Error(`Test ${s} does not specify selection range`);
        }
        const result = refactor.extractSymbol.getRangeToExtract(f, createTextSpanFromBounds(selectionRange.start, selectionRange.end));
        const expectedRange = t.ranges.get("extracted");
        if (expectedRange) {
            let start: number, end: number;
            if (ts.isArray(result.targetRange.range)) {
                start = result.targetRange.range[0].getStart(f);
                end = ts.lastOrUndefined(result.targetRange.range).getEnd();
            }
            else {
                start = result.targetRange.range.getStart(f);
                end = result.targetRange.range.getEnd();
            }
            assert.equal(start, expectedRange.start, "incorrect start of range");
            assert.equal(end, expectedRange.end, "incorrect end of range");
        }
        else {
            assert.isTrue(!result.targetRange, `expected range to extract to be undefined`);
        }
    }

    describe("extractRanges", () => {
        it("get extract range from selection", () => {
            testExtractRange(`
                [#|
                [$|var x = 1;
                var y = 2;|]|]
            `);
            testExtractRange(`
                [#|
                var x = 1;
                var y = 2|];
            `);
            testExtractRange(`
                [#|var x = 1|];
                var y = 2;
            `);
            testExtractRange(`
                if ([#|[#extracted|a && b && c && d|]|]) {
                }
            `);
            testExtractRange(`
                if [#|(a && b && c && d|]) {
                }
            `);
            testExtractRange(`
                if (a && b && c && d) {
                [#|    [$|var x = 1;
                    console.log(x);|]    |]
                }
            `);
            testExtractRange(`
                [#|
                if (a) {
                    return 100;
                } |]
            `);
            testExtractRange(`
                function foo() {
                [#|    [$|if (a) {
                    }
                    return 100|] |]
                }
            `);
            testExtractRange(`
                [#|
                [$|l1:
                if (x) {
                    break l1;
                }|]|]
            `);
            testExtractRange(`
                [#|
                [$|l2:
                {
                    if (x) {
                    }
                    break l2;
                }|]|]
            `);
            testExtractRange(`
                while (true) {
                [#|    if(x) {
                    }
                    break;  |]
                }
            `);
            testExtractRange(`
                while (true) {
                [#|    if(x) {
                    }
                    continue;  |]
                }
            `);
            testExtractRange(`
                l3:
                {
                    [#|
                    if (x) {
                    }
                    break l3; |]
                }
            `);
            testExtractRange(`
                function f() {
                    while (true) {
                [#|
                        if (x) {
                            return;
                        } |]
                    }
                }
            `);
            testExtractRange(`
                function f() {
                    while (true) {
                [#|
                        [$|if (x) {
                        }
                        return;|]
                |]
                    }
                }
            `);
            testExtractRange(`
                function f() {
                    return [#|  [$|1 + 2|]  |]+ 3;
                    }
                }
            `);
            testExtractRange(`
                function f() {
                    return [$|1 + [#|2 + 3|]|];
                    }
                }
            `);
            testExtractRange(`
                function f() {
                    return [$|1 + 2 + [#|3 + 4|]|];
                    }
                }
            `);
        });

        testExtractRangeFailed("extractRangeFailed1",
        `
namespace A {
function f() {
    [#|
    let x = 1
    if (x) {
        return 10;
    }
    |]
}
}
        `,
        [
            "Cannot extract range containing conditional return statement."
        ]);

        testExtractRangeFailed("extractRangeFailed2",
        `
namespace A {
function f() {
    while (true) {
    [#|
        let x = 1
        if (x) {
            break;
        }
    |]
    }
}
}
        `,
        [
            "Cannot extract range containing conditional break or continue statements."
        ]);

        testExtractRangeFailed("extractRangeFailed3",
        `
namespace A {
function f() {
    while (true) {
    [#|
        let x = 1
        if (x) {
            continue;
        }
    |]
    }
}
}
        `,
        [
            "Cannot extract range containing conditional break or continue statements."
        ]);

        testExtractRangeFailed("extractRangeFailed4",
        `
namespace A {
function f() {
    l1: {
    [#|
        let x = 1
        if (x) {
            break l1;
        }
    |]
    }
}
}
        `,
        [
            "Cannot extract range containing labeled break or continue with target outside of the range."
        ]);

        testExtractRangeFailed("extractRangeFailed5",
        `
namespace A {
function f() {
    [#|
    try {
        f2()
        return 10;
    }
    catch (e) {
    }
    |]
}
function f2() {
}
}
        `,
        [
            "Cannot extract range containing conditional return statement."
        ]);

        testExtractRangeFailed("extractRangeFailed6",
        `
namespace A {
function f() {
    [#|
    try {
        f2()
    }
    catch (e) {
        return 10;
    }
    |]
}
function f2() {
}
}
        `,
        [
            "Cannot extract range containing conditional return statement."
        ]);

        testExtractRangeFailed("extractRangeFailed7",
        `
function test(x: number) {
while (x) {
    x--;
    [#|break;|]
}
}
        `,
        [
            "Cannot extract range containing conditional break or continue statements."
        ]);

        testExtractRangeFailed("extractRangeFailed8",
        `
function test(x: number) {
switch (x) {
    case 1:
        [#|break;|]
}
}
        `,
        [
            "Cannot extract range containing conditional break or continue statements."
        ]);

        testExtractRangeFailed("extractRangeFailed9",
        `var x = ([#||]1 + 2);`,
        [
            "Cannot extract empty range."
        ]);

        testExtractRangeFailed("extract-method-not-for-token-expression-statement", `[#|a|]`, ["Select more than a single identifier."]);
    });
}