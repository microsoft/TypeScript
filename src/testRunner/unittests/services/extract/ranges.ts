import * as ts from "../../../_namespaces/ts.js";
import { extractTest } from "./helpers.js";

function testExtractRangeFailed(caption: string, s: string, expectedErrors: readonly string[]) {
    return it(caption, () => {
        const t = extractTest(s);
        const file = ts.createSourceFile("a.ts", t.source, ts.ScriptTarget.Latest, /*setParentNodes*/ true);
        const selectionRange = t.ranges.get("selection");
        if (!selectionRange) {
            throw new Error(`Test ${s} does not specify selection range`);
        }
        const result = ts.refactor.extractSymbol.getRangeToExtract(file, ts.createTextSpanFromRange(selectionRange), /*invoked*/ false);
        assert(result.targetRange === undefined, "failure expected");
        const sortedErrors = result.errors.map(e => e.messageText as string).sort();
        assert.deepEqual(sortedErrors, expectedErrors.slice().sort(), "unexpected errors");
    });
}

function testExtractRange(caption: string, s: string) {
    return it(caption, () => {
        const t = extractTest(s);
        const f = ts.createSourceFile("a.ts", t.source, ts.ScriptTarget.Latest, /*setParentNodes*/ true);
        const selectionRange = t.ranges.get("selection");
        if (!selectionRange) {
            throw new Error(`Test ${s} does not specify selection range`);
        }
        const result = ts.refactor.extractSymbol.getRangeToExtract(f, ts.createTextSpanFromRange(selectionRange));
        const expectedRange = t.ranges.get("extracted");
        if (expectedRange) {
            let pos: number, end: number;
            const targetRange = result.targetRange!;
            if (ts.isArray(targetRange.range)) {
                pos = targetRange.range[0].getStart(f);
                end = ts.last(targetRange.range).getEnd();
            }
            else {
                pos = targetRange.range.getStart(f);
                end = targetRange.range.getEnd();
            }
            assert.equal(pos, expectedRange.pos, "incorrect pos of range");
            assert.equal(end, expectedRange.end, "incorrect end of range");
        }
        else {
            assert.isTrue(!result.targetRange, `expected range to extract to be undefined`);
        }
    });
}

describe("unittests:: services:: extract:: extractRanges", () => {
    describe("get extract range from selection", () => {
        testExtractRange(
            "extractRange1",
            `
                [#|
                [$|var x = 1;
                var y = 2;|]|]
            `,
        );
        testExtractRange(
            "extractRange2",
            `
                [$|[#|var x = 1;
                var y = 2|];|]
            `,
        );
        testExtractRange(
            "extractRange3",
            `
                [#|var x = [$|1|]|];
                var y = 2;
            `,
        );
        testExtractRange(
            "extractRange4",
            `
                var x = [$|10[#|00|]|];
            `,
        );
        testExtractRange(
            "extractRange5",
            `
                [$|va[#|r foo = 1;
                var y = 200|]0;|]
            `,
        );
        testExtractRange(
            "extractRange6",
            `
                var x = [$|fo[#|o.bar.baz()|]|];
            `,
        );
        testExtractRange(
            "extractRange7",
            `
                if ([#|[#extracted|a && b && c && d|]|]) {
                }
            `,
        );
        testExtractRange(
            "extractRange8",
            `
                if [#|(a && b && c && d|]) {
                }
            `,
        );
        testExtractRange(
            "extractRange9",
            `
                if ([$|a[#|a && b && c && d|]d|]) {
                }
            `,
        );
        testExtractRange(
            "extractRange10",
            `
                if (a && b && c && d) {
                [#|    [$|var x = 1;
                    console.log(x);|]    |]
                }
            `,
        );
        testExtractRange(
            "extractRange11",
            `
                [#|
                if (a) {
                    return 100;
                } |]
            `,
        );
        testExtractRange(
            "extractRange12",
            `
                function foo() {
                [#|    [$|if (a) {
                    }
                    return 100|] |]
                }
            `,
        );
        testExtractRange(
            "extractRange13",
            `
                [#|
                [$|l1:
                if (x) {
                    break l1;
                }|]|]
            `,
        );
        testExtractRange(
            "extractRange14",
            `
                [#|
                [$|l2:
                {
                    if (x) {
                    }
                    break l2;
                }|]|]
            `,
        );
        testExtractRange(
            "extractRange15",
            `
                while (true) {
                [#|    if(x) {
                    }
                    break;  |]
                }
            `,
        );
        testExtractRange(
            "extractRange16",
            `
                while (true) {
                [#|    if(x) {
                    }
                    continue;  |]
                }
            `,
        );
        testExtractRange(
            "extractRange17",
            `
                l3:
                {
                    [#|
                    if (x) {
                    }
                    break l3; |]
                }
            `,
        );
        testExtractRange(
            "extractRange18",
            `
                function f() {
                    while (true) {
                [#|
                        if (x) {
                            return;
                        } |]
                    }
                }
            `,
        );
        testExtractRange(
            "extractRange19",
            `
                function f() {
                    while (true) {
                [#|
                        [$|if (x) {
                        }
                        return;|]
                |]
                    }
                }
            `,
        );
        testExtractRange(
            "extractRange20",
            `
                function f() {
                    return [#|  [$|1 + 2|]  |]+ 3;
                    }
                }
            `,
        );
        testExtractRange(
            "extractRange21",
            `
                function f(x: number) {
                    [#|[$|try {
                        x++;
                    }
                    finally {
                        return 1;
                    }|]|]
                }
            `,
        );

        // Variable statements
        testExtractRange("extractRange22", `[#|let x = [$|1|];|]`);
        testExtractRange("extractRange23", `[#|let x = [$|1|], y;|]`);
        testExtractRange("extractRange24", `[#|[$|let x = 1, y = 1;|]|]`);

        // Variable declarations
        testExtractRange("extractRange25", `let [#|x = [$|1|]|];`);
        testExtractRange("extractRange26", `let [#|x = [$|1|]|], y = 2;`);
        testExtractRange("extractRange27", `let x = 1, [#|y = [$|2|]|];`);

        // Return statements
        testExtractRange("extractRange28", `[#|return [$|1|];|]`);

        // For statements
        testExtractRange("extractRange29", `for ([#|var i = [$|1|]|]; i < 2; i++) {}`);
        testExtractRange("extractRange30", `for (var i = [#|[$|1|]|]; i < 2; i++) {}`);
    });

    testExtractRangeFailed(
        "extractRangeFailed1",
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
        [ts.refactor.extractSymbol.Messages.cannotExtractRangeContainingConditionalReturnStatement.message],
    );

    testExtractRangeFailed(
        "extractRangeFailed2",
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
        [ts.refactor.extractSymbol.Messages.cannotExtractRangeContainingConditionalBreakOrContinueStatements.message],
    );

    testExtractRangeFailed(
        "extractRangeFailed3",
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
        [ts.refactor.extractSymbol.Messages.cannotExtractRangeContainingConditionalBreakOrContinueStatements.message],
    );

    testExtractRangeFailed(
        "extractRangeFailed4",
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
        [ts.refactor.extractSymbol.Messages.cannotExtractRangeContainingLabeledBreakOrContinueStatementWithTargetOutsideOfTheRange.message],
    );

    testExtractRangeFailed(
        "extractRangeFailed5",
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
        [ts.refactor.extractSymbol.Messages.cannotExtractRangeContainingConditionalReturnStatement.message],
    );

    testExtractRangeFailed(
        "extractRangeFailed6",
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
        [ts.refactor.extractSymbol.Messages.cannotExtractRangeContainingConditionalReturnStatement.message],
    );

    testExtractRangeFailed(
        "extractRangeFailed7",
        `
function test(x: number) {
while (x) {
    x--;
    [#|break;|]
}
}
            `,
        [ts.refactor.extractSymbol.Messages.cannotExtractRangeContainingConditionalBreakOrContinueStatements.message],
    );

    testExtractRangeFailed(
        "extractRangeFailed8",
        `
function test(x: number) {
switch (x) {
    case 1:
        [#|break;|]
}
}
            `,
        [ts.refactor.extractSymbol.Messages.cannotExtractRangeContainingConditionalBreakOrContinueStatements.message],
    );

    testExtractRangeFailed("extractRangeFailed9", `var x = ([#||]1 + 2);`, [ts.refactor.extractSymbol.Messages.cannotExtractEmpty.message]);

    testExtractRangeFailed(
        "extractRangeFailed10",
        `
                function f() {
                    return 1 + [#|2 + 3|];
                    }
                }
            `,
        [ts.refactor.extractSymbol.Messages.cannotExtractRange.message],
    );

    testExtractRangeFailed(
        "extractRangeFailed11",
        `
                function f(x: number) {
                    while (true) {
                        [#|try {
                            x++;
                        }
                        finally {
                            break;
                        }|]
                    }
                }
            `,
        [ts.refactor.extractSymbol.Messages.cannotExtractRangeContainingConditionalBreakOrContinueStatements.message],
    );

    testExtractRangeFailed("extractRangeFailed12", `let [#|x|];`, [ts.refactor.extractSymbol.Messages.statementOrExpressionExpected.message]);

    testExtractRangeFailed("extractRangeFailed13", `[#|return;|]`, [ts.refactor.extractSymbol.Messages.cannotExtractRange.message]);

    testExtractRangeFailed(
        "extractRangeFailed14",
        `
                switch(1) {
                    case [#|1:
                        break;|]
                }
            `,
        [ts.refactor.extractSymbol.Messages.cannotExtractRange.message],
    );

    testExtractRangeFailed(
        "extractRangeFailed15",
        `
                switch(1) {
                    case [#|1:
                        break|];
                }
            `,
        [ts.refactor.extractSymbol.Messages.cannotExtractRange.message],
    );

    // Documentation only - it would be nice if the result were [$|1|]
    testExtractRangeFailed(
        "extractRangeFailed16",
        `
                switch(1) {
                    [#|case 1|]:
                        break;
                }
            `,
        [ts.refactor.extractSymbol.Messages.cannotExtractRange.message],
    );

    // Documentation only - it would be nice if the result were [$|1|]
    testExtractRangeFailed(
        "extractRangeFailed17",
        `
                switch(1) {
                    [#|case 1:|]
                        break;
                }
            `,
        [ts.refactor.extractSymbol.Messages.cannotExtractRange.message],
    );

    testExtractRangeFailed("extractRangeFailed18", `[#|{ 1;|] }`, [ts.refactor.extractSymbol.Messages.cannotExtractRange.message]);

    testExtractRangeFailed("extractRangeFailed19", `[#|/** @type {number} */|] const foo = 1;`, [ts.refactor.extractSymbol.Messages.cannotExtractJSDoc.message]);

    testExtractRangeFailed("extract-method-not-for-token-expression-statement", `[#|a|]`, [ts.refactor.extractSymbol.Messages.cannotExtractIdentifier.message]);
});
