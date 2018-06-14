/// <reference path="../harness.ts" />
/// <reference path="../../server/scriptVersionCache.ts"/>
/// <reference path="./tsserverProjectSystem.ts" />

namespace ts.textStorage {
    describe("Text storage", () => {
        const f = {
            path: "/a/app.ts",
            content: `
                let x = 1;
                let y = 2;
                function bar(a: number) {
                    return a + 1;
                }`
        };

        it("text based storage should be have exactly the same as script version cache", () => {

            const host = projectSystem.createServerHost([f]);

            const ts1 = new server.TextStorage(host, server.asNormalizedPath(f.path));
            const ts2 = new server.TextStorage(host, server.asNormalizedPath(f.path));

            ts1.useScriptVersionCache_TestOnly();
            ts2.useText();

            const lineMap = computeLineStarts(f.content);

            for (let line = 0; line < lineMap.length; line++) {
                const start = lineMap[line];
                const end = line === lineMap.length - 1 ? f.path.length : lineMap[line + 1];

                for (let offset = 0; offset < end - start; offset++) {
                    const pos1 = ts1.lineOffsetToPosition(line + 1, offset + 1);
                    const pos2 = ts2.lineOffsetToPosition(line + 1, offset + 1);
                    assert.isTrue(pos1 === pos2, `lineOffsetToPosition ${line + 1}-${offset + 1}: expected ${pos1} to equal ${pos2}`);
                }

                const {start: start1, length: length1 } = ts1.lineToTextSpan(line);
                const {start: start2, length: length2 } = ts2.lineToTextSpan(line);
                assert.isTrue(start1 === start2, `lineToTextSpan ${line}::start:: expected ${start1} to equal ${start2}`);
                assert.isTrue(length1 === length2, `lineToTextSpan ${line}::length:: expected ${length1} to equal ${length2}`);
            }

            for (let pos = 0; pos < f.content.length; pos++) {
                const { line: line1, offset: offset1 } = ts1.positionToLineOffset(pos);
                const { line: line2, offset: offset2 } = ts2.positionToLineOffset(pos);
                assert.isTrue(line1 === line2, `positionToLineOffset ${pos}::line:: expected ${line1} to equal ${line2}`);
                assert.isTrue(offset1 === offset2, `positionToLineOffset ${pos}::offset:: expected ${offset1} to equal ${offset2}`);
            }
        });

        it("should switch to script version cache if necessary", () => {
            const host = projectSystem.createServerHost([f]);
            const ts1 = new server.TextStorage(host, server.asNormalizedPath(f.path));

            ts1.getSnapshot();
            assert.isTrue(!ts1.hasScriptVersionCache_TestOnly(), "should not have script version cache - 1");

            ts1.edit(0, 5, "   ");
            assert.isTrue(ts1.hasScriptVersionCache_TestOnly(), "have script version cache - 1");

            ts1.useText();
            assert.isTrue(!ts1.hasScriptVersionCache_TestOnly(), "should not have script version cache - 2");

            ts1.getLineInfo(0);
            assert.isTrue(ts1.hasScriptVersionCache_TestOnly(), "have script version cache - 2");
        });
    });
}
