import * as Harness from "../../_namespaces/Harness.js";
import * as ts from "../../_namespaces/ts.js";

describe("unittests:: config:: initTSConfig", () => {
    function initTSConfigCorrectly(name: string, commandLinesArgs: string[]) {
        describe(name, () => {
            const commandLine = ts.parseCommandLine(commandLinesArgs);
            const initResult = ts.generateTSConfig(commandLine.options, commandLine.fileNames, "\n");
            const outputFileName = `config/initTSConfig/${name.replace(/[^a-z0-9\-. ]/gi, "")}/tsconfig.json`;

            it(`Correct output for ${outputFileName}`, () => {
                Harness.Baseline.runBaseline(outputFileName, initResult, { PrintDiff: true });
            });
        });
    }

    initTSConfigCorrectly("Default initialized TSConfig", ["--init"]);

    initTSConfigCorrectly("Initialized TSConfig with files options", ["--init", "file0.st", "file1.ts", "file2.ts"]);

    initTSConfigCorrectly("Initialized TSConfig with boolean value compiler options", ["--init", "--noUnusedLocals"]);

    initTSConfigCorrectly("Initialized TSConfig with enum value compiler options", ["--init", "--target", "es5", "--jsx", "react"]);

    initTSConfigCorrectly("Initialized TSConfig with list compiler options", ["--init", "--types", "jquery,mocha"]);

    initTSConfigCorrectly("Initialized TSConfig with list compiler options with enum value", ["--init", "--lib", "es5,es2015.core"]);

    initTSConfigCorrectly("Initialized TSConfig with incorrect compiler option", ["--init", "--someNonExistOption"]);

    initTSConfigCorrectly("Initialized TSConfig with incorrect compiler option value", ["--init", "--lib", "nonExistLib,es5,es2015.promise"]);

    initTSConfigCorrectly("Initialized TSConfig with advanced options", ["--init", "--declaration", "--declarationDir", "lib", "--skipLibCheck", "--noErrorTruncation"]);

    initTSConfigCorrectly("Initialized TSConfig with --help", ["--init", "--help"]);

    initTSConfigCorrectly("Initialized TSConfig with --watch", ["--init", "--watch"]);
});
