/// <reference path="..\..\..\src\harness\harness.ts" />
/// <reference path="..\..\..\src\server\editorServices.ts" />

module ts {
    function editFlat(position: number, deletedLength: number, newText: string, source: string) {
        return source.substring(0, position) + newText + source.substring(position + deletedLength, source.length);
    }

    var testDataDir = "..\..\..\src\compiler";

    function bigTest() {
        editStress("scanner.ts", false);
        editStress("sys.ts", false);
        editStress("binder.ts", false);
    }

    function tstTest() {
        var fname = testDataDir + 'tst.ts';
        var content = ts.sys.readFile(fname);
        var lm = server.LineIndex.linesFromText(content);
        var lines = lm.lines;
        if (lines.length == 0) {
            return;
        }
        var lineMap = lm.lineMap;

        var lineIndex = new server.LineIndex();
        lineIndex.load(lines);

        var editedText = lineIndex.getText(0, content.length);

        var snapshot: server.LineIndex;
        var checkText: string;
        var insertString: string;

        // change 9 1 0 1 {"y"}
        var pos = lineColToPosition(lineIndex, 9, 1);
        insertString = "y";
        checkText = editFlat(pos, 0, insertString, content);
        snapshot = lineIndex.edit(pos, 0, insertString);
        editedText = snapshot.getText(0, checkText.length);

        assert.equal(editedText, checkText);

        // change 9 2 0 1 {"."}
        var pos = lineColToPosition(snapshot, 9, 2);
        insertString = ".";
        checkText = editFlat(pos, 0, insertString, checkText);
        snapshot = snapshot.edit(pos, 0, insertString);
        editedText = snapshot.getText(0, checkText.length);

        assert.equal(editedText, checkText);

        // change 9 3 0 1 {"\n"}
        var pos = lineColToPosition(snapshot, 9, 3);
        insertString = "\n";
        checkText = editFlat(pos, 0, insertString, checkText);
        snapshot = snapshot.edit(pos, 0, insertString);
        editedText = snapshot.getText(0, checkText.length);

        assert.equal(editedText, checkText);

        // change 10 1 0 10 {"\n\n\n\n\n\n\n\n\n\n"}
        pos = lineColToPosition(snapshot, 10, 1);
        insertString = "\n\n\n\n\n\n\n\n\n\n";
        checkText = editFlat(pos, 0, insertString, checkText);
        snapshot = snapshot.edit(pos, 0, insertString);
        editedText = snapshot.getText(0, checkText.length);

        assert.equal(editedText, checkText);

        // change 19 1 1 0
        pos = lineColToPosition(snapshot, 19, 1);
        checkText = editFlat(pos, 1, "", checkText);
        snapshot = snapshot.edit(pos, 1);
        editedText = snapshot.getText(0, checkText.length);

        assert.equal(editedText, checkText);

        // change 18 1 1 0
        pos = lineColToPosition(snapshot, 18, 1);
        checkText = editFlat(pos, 1, "", checkText);
        snapshot = snapshot.edit(pos, 1);
        editedText = snapshot.getText(0, checkText.length);

        assert.equal(editedText, checkText);

        function lineColToPosition(lineIndex: server.LineIndex, line: number, col: number) {
            var lineInfo = lineIndex.lineNumberToInfo(line);
            return (lineInfo.offset + col - 1);
        }
    }

    describe('VersionCache edit', () => {
        let testContent = `in this story:
the lazy brown fox
jumped over the cow
that ate the grass
that was purple at the tips
and grew 1cm per day`;

        let {lines, lineMap} = server.LineIndex.linesFromText(testContent);
        assert.isTrue(lines.length > 0, "Failed to initialize test text. Expected text to have at least one line");

        let lineIndex = new server.LineIndex();
        lineIndex.load(lines);

        function testEdit(position: number, deleteLength: number, insertString: string): void {
            let checkText = editFlat(position, deleteLength, insertString, testContent);
            let snapshot = lineIndex.edit(position, deleteLength, insertString);
            let editedText = snapshot.getText(0, snapshot.getLength());

            assert.equal(editedText, checkText);
        }

        it('Insert at end of file', () => {
            testEdit(testContent.length, 0, "hmmmm...\r\n");
        });

        it('Unusual line endings merge', () => {
            testEdit(lines[0].length - 1, lines[1].length, "");
        });

        it('Delete whole line and nothing but line (last line)', () => {
            testEdit(lineMap[lineMap.length - 2], lines[lines.length - 1].length, "");
        });

        it('Delete whole line and nothing but line (first line)', () => {
            testEdit(0, lines[0].length, "");
        });

        it('Delete whole line (first line) and insert with no line breaks', () => {
            testEdit(0, lines[0].length, "moo, moo, moo! ");
        });

        it('Delete whole line (first line) and insert with multiple line breaks', () => {
            testEdit(0, lines[0].length, "moo, \r\nmoo, \r\nmoo! ");
        });

        it('Delete multiple lines and nothing but lines (first and second lines)', () => {
            testEdit(0, lines[0].length + lines[1].length, "");
        });

        it('Delete multiple lines and nothing but lines (second and third lines)', () => {
            testEdit(lines[0].length, lines[1].length + lines[2].length, "");
        });

        it('Insert multiple line breaks', () => {
            testEdit(21, 1, "cr...\r\ncr...\r\ncr...\r\ncr...\r\ncr...\r\ncr...\r\ncr...\r\ncr...\r\ncr...\r\ncr...\r\ncr...\r\ncr");
        });

        it('Insert multiple line breaks', () => {
            testEdit(21, 1, "cr...\r\ncr...\r\ncr");
        });

        it('Insert multiple line breaks with leading \\n', () => {
            testEdit(21, 1, "\ncr...\r\ncr...\r\ncr");
        });

        it('Single line no line breaks deleted or inserted, delete 1 char', () => {
            testEdit(21, 1, "");
        });

        it('Single line no line breaks deleted or inserted, insert 1 char', () => {
            testEdit(21, 0, "b");
        });

        it('Single line no line breaks deleted or inserted, delete 1, insert 2 chars', () => {
            testEdit(21, 1, "cr");
        });

        it('Delete across line break (just the line break)', () => {
            testEdit(21, 22, "");
        });

        it('Delete across line break', () => {
            testEdit(21, 32, "");
        });

        it('Delete across multiple line breaks and insert no line breaks', () => {
            testEdit(21, 42, "");
        });

        it('Delete across multiple line breaks and insert text', () => {
            testEdit(21, 42, "slithery ");
        });
    });

    function editStress(fname: string, timing: boolean) {
        var content = ts.sys.readFile(testDataDir + fname);
        var lm = server.LineIndex.linesFromText(content);
        var lines = lm.lines;
        if (lines.length == 0) {
            return;
        }
        var lineMap = lm.lineMap;

        var lineIndex = new server.LineIndex();
        lineIndex.load(lines);
        var totalChars = content.length;
        var rsa: number[] = [];
        var la: number[] = [];
        var las: number[] = [];
        var elas: number[] = [];
        var ersa: number[] = [];
        var ela: number[] = [];
        var etotalChars = totalChars;
        var j: number;

        var startTime: number;
        for (j = 0; j < 100000; j++) {
            rsa[j] = Math.floor(Math.random() * totalChars);
            la[j] = Math.floor(Math.random() * (totalChars - rsa[j]));
            if (la[j] > 4) {
                las[j] = 4;
            }
            else {
                las[j] = la[j];
            }
            if (j < 4000) {
                ersa[j] = Math.floor(Math.random() * etotalChars);
                ela[j] = Math.floor(Math.random() * (etotalChars - ersa[j]));
                if (ela[j] > 4) {
                    elas[j] = 4;
                }
                else {
                    elas[j] = ela[j];
                }
                etotalChars += (las[j] - elas[j]);
            }
        }
        if (timing) {
            startTime = Date.now();
        }
        for (j = 0; j < 2000; j++) {
            var s2 = lineIndex.getText(rsa[j], la[j]);
            if (!timing) {
                var s1 = content.substring(rsa[j], rsa[j] + la[j]);
                assert.equal(s1, s2);
            }
        }
        if (timing) {
            console.log("range (average length 1/4 file size): " + ((Date.now() - startTime) / 2).toFixed(3) + " us");
        }
        //        console.log("check1");
        if (timing) {
            startTime = Date.now();
        }
        for (j = 0; j < 10000; j++) {
            var s2 = lineIndex.getText(rsa[j], las[j]);
            if (!timing) {
                var s1 = content.substring(rsa[j], rsa[j] + las[j]);
                assert.equal(s1, s2);
            }
        }
        //        console.log("check2");
        if (timing) {
            console.log("range (average length 4 chars): " + ((Date.now() - startTime) / 10).toFixed(3) + " us");
        }

        if (timing) {
            startTime = Date.now();
        }
        var snapshot: server.LineIndex;
        for (j = 0; j < 2000; j++) {
            var insertString = content.substring(rsa[100000 - j], rsa[100000 - j] + las[100000 - j]);
            snapshot = lineIndex.edit(rsa[j], las[j], insertString);
            if (!timing) {
                var checkText = editFlat(rsa[j], las[j], insertString, content);
                var snapText = snapshot.getText(0, checkText.length);
                if (checkText != snapText) {
                    assert.equal(s1, s2);
                }
            }
        }
        //        console.log("check3");
        if (timing) {
            console.log("edit (average length 4): " + ((Date.now() - startTime) / 2).toFixed(3) + " us");
        }

        var svc = server.ScriptVersionCache.fromString(content);
        checkText = content;
        if (timing) {
            startTime = Date.now();
        }
        for (j = 0; j < 2000; j++) {
            insertString = content.substring(rsa[j], rsa[j] + las[j]);
            svc.edit(ersa[j], elas[j], insertString);
            if (!timing) {
                checkText = editFlat(ersa[j], elas[j], insertString, checkText);
            }
            if (0 == (j % 4)) {
                var snap = svc.getSnapshot();
                if (!timing) {
                    snapText = snap.getText(0, checkText.length);
                    if (checkText != snapText) {
                        assert.equal(s1, s2);
                    }
                }
            }
        }
        if (timing) {
            console.log("edit ScriptVersionCache: " + ((Date.now() - startTime) / 2).toFixed(3) + " us");
        }

        //        console.log("check4");
        if (timing) {
            startTime = Date.now();
        }
        for (j = 0; j < 5000; j++) {
            insertString = content.substring(rsa[100000 - j], rsa[100000 - j] + la[100000 - j]);
            snapshot = lineIndex.edit(rsa[j], la[j], insertString);
            if (!timing) {
                checkText = editFlat(rsa[j], la[j], insertString, content);
                snapText = snapshot.getText(0, checkText.length);
                if (checkText != snapText) {
                    assert.equal(s1, s2);
                }
            }
        }
        if (timing) {
            console.log("edit (average length 1/4th file size): " + ((Date.now() - startTime) / 5).toFixed(3) + " us");
        }

        var t: ts.LineAndCharacter;
        var errorCount = 0;
        if (timing) {
            startTime = Date.now();
        }
        //        console.log("check5");
        for (j = 0; j < 100000; j++) {
            var lp = lineIndex.charOffsetToLineNumberAndPos(rsa[j]);
            if (!timing) {
                var lac = ts.computeLineAndCharacterOfPosition(lineMap, rsa[j]);
                assert.equal(lac.line, lp.line, "Line number mismatch " + lac.line + " " + lp.line + " " + j);
                assert.equal(lac.character, (lp.offset + 1), "Charachter offset mismatch " + lac.character + " " + (lp.offset + 1) + " " + j);
            }
        }
        //        console.log("check6");
        if (timing) {
            console.log("line/offset from pos: " + ((Date.now() - startTime) / 100).toFixed(3) + " us");
        }

        if (timing) {
            startTime = Date.now();
        }

        var outer = 1;
        if (timing) {
            outer = 100;
        }
        for (var ko = 0; ko < outer; ko++) {
            for (var k = 0, llen = lines.length; k < llen; k++) {
                var lineInfo = lineIndex.lineNumberToInfo(k + 1);
                var lineIndexOffset = lineInfo.offset;
                if (!timing) {
                    var lineMapOffset = lineMap[k];
                    assert.equal(lineIndexOffset, lineMapOffset);
                }
            }
        }
        if (timing) {
            console.log("start pos from line: " + (((Date.now() - startTime) / lines.length) * 10).toFixed(3) + " us");
        }
    }

    //function edTest() {
    //    tstTest();
    //    bigTest();
    //}

    //edTest();
}
