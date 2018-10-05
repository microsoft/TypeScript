namespace ts {
    describe("showTSConfig", () => {
        function showTSConfigCorrectly(name: string, commandLinesArgs: string[]) {
            describe(name, () => {
                const commandLine = parseCommandLine(commandLinesArgs);
                const initResult = convertToTSConfig(commandLine, `/${name}/tsconfig.json`, { getCurrentDirectory() { return `/${name}`; }, useCaseSensitiveFileNames: true });
                const outputFileName = `showConfig/${name.replace(/[^a-z0-9\-. ]/ig, "")}/tsconfig.json`;

                it(`Correct output for ${outputFileName}`, () => {
                    // tslint:disable-next-line:no-null-keyword
                    Harness.Baseline.runBaseline(outputFileName, JSON.stringify(initResult, null, 4) + "\n");
                });
            });
        }

        showTSConfigCorrectly("Default initialized TSConfig", ["--showConfig"]);

        showTSConfigCorrectly("Show TSConfig with files options", ["--showConfig", "file0.st", "file1.ts", "file2.ts"]);

        showTSConfigCorrectly("Show TSConfig with boolean value compiler options", ["--showConfig", "--noUnusedLocals"]);

        showTSConfigCorrectly("Show TSConfig with enum value compiler options", ["--showConfig", "--target", "es5", "--jsx", "react"]);

        showTSConfigCorrectly("Show TSConfig with list compiler options", ["--showConfig", "--types", "jquery,mocha"]);

        showTSConfigCorrectly("Show TSConfig with list compiler options with enum value", ["--showConfig", "--lib", "es5,es2015.core"]);

        showTSConfigCorrectly("Show TSConfig with incorrect compiler option", ["--showConfig", "--someNonExistOption"]);

        showTSConfigCorrectly("Show TSConfig with incorrect compiler option value", ["--showConfig", "--lib", "nonExistLib,es5,es2015.promise"]);

        showTSConfigCorrectly("Show TSConfig with advanced options", ["--showConfig", "--declaration", "--declarationDir", "lib", "--skipLibCheck", "--noErrorTruncation"]);
    });
}