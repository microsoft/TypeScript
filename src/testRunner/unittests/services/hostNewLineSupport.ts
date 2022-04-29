namespace ts {
    describe("unittests:: services:: hostNewLineSupport", () => {
        function testLSWithFiles(settings: CompilerOptions, files: Harness.Compiler.TestFile[]) {
            function snapFor(path: string): IScriptSnapshot | undefined {
                if (path === "lib.d.ts") {
                    return ScriptSnapshot.fromString("");
                }
                const result = find(files, f => f.unitName === path);
                return result && ScriptSnapshot.fromString(result.content);
            }
            const lshost: LanguageServiceHost = {
                getCompilationSettings: () => settings,
                getScriptFileNames: () => map(files, f => f.unitName),
                getScriptVersion: () => "1",
                getScriptSnapshot: name => snapFor(name),
                getDefaultLibFileName: () => "lib.d.ts",
                getCurrentDirectory: () => "",
                readFile: name => {
                    const snap = snapFor(name);
                    if (!snap) return undefined;
                    return snap.getText(0, snap.getLength());
                },
                fileExists: name => !!snapFor(name),
            };
            return createLanguageService(lshost);
        }

        function verifyNewLines(content: string, options: CompilerOptions) {
            const ls = testLSWithFiles(options, [{
                content,
                fileOptions: {},
                unitName: "input.ts"
            }]);
            const result = ls.getEmitOutput("input.ts");
            assert(!result.emitSkipped, "emit was skipped");
            assert(result.outputFiles.length === 1, "a number of files other than 1 was output");
            assert(result.outputFiles[0].name === "input.js", `Expected output file name input.js, but got ${result.outputFiles[0].name}`);
            assert(result.outputFiles[0].text.match(options.newLine === NewLineKind.CarriageReturnLineFeed ? /\r\n/ : /[^\r]\n/), "expected to find appropriate newlines");
            assert(!result.outputFiles[0].text.match(options.newLine === NewLineKind.CarriageReturnLineFeed ? /[^\r]\n/ : /\r\n/), "expected not to find inappropriate newlines");
        }

        function verifyBothNewLines(content: string) {
            verifyNewLines(content, { newLine: NewLineKind.CarriageReturnLineFeed });
            verifyNewLines(content, { newLine: NewLineKind.LineFeed });
        }

        function verifyOutliningSpanNewLines(content: string, options: CompilerOptions) {
            const ls = testLSWithFiles(options, [{
                content,
                fileOptions: {},
                unitName: "input.ts"
            }]);
            const span = ls.getOutliningSpans("input.ts")[0];
            const textAfterSpanCollapse = content.substring(span.textSpan.start + span.textSpan.length);
            assert(textAfterSpanCollapse.match(options.newLine === NewLineKind.CarriageReturnLineFeed ? /\r\n/ : /[^\r]\n/), "expected to find appropriate newlines");
            assert(!textAfterSpanCollapse.match(options.newLine === NewLineKind.CarriageReturnLineFeed ? /[^\r]\n/ : /\r\n/), "expected not to find inappropriate newlines");
        }

        it("should exist and respect provided compiler options", () => {
            verifyBothNewLines(`
                function foo() {
                    return 2 + 2;
                }
            `);
        });

        it("should respect CRLF line endings around outlining spans", () => {
            verifyOutliningSpanNewLines("// comment not included\r\n// #region name\r\nlet x: string = \"x\";\r\n// #endregion name\r\n",
                { newLine: NewLineKind.CarriageReturnLineFeed });
        });

        it("should respect LF line endings around outlining spans", () => {
            verifyOutliningSpanNewLines("// comment not included\n// #region name\nlet x: string = \"x\";\n// #endregion name\n\n",
                { newLine: NewLineKind.LineFeed });
        });
    });
}
