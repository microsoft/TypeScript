import * as Harness from "../_namespaces/Harness";
import * as ts from "../_namespaces/ts";
import * as Utils from "../_namespaces/Utils";

describe("unittests:: jsDocParsingKind", () => {
    const Diff = require("diff");

    const kinds = [
        ts.JSDocParsingKind.KeepAll,
        ts.JSDocParsingKind.KeepSemanticOnly,
        ts.JSDocParsingKind.SkipAll,
    ];
    const filenames = [
        "file.ts",
        "file.js",
    ];
    function diffSourceFiles(name: string, content: string) {
        for (const jsDocParsingKind of kinds) {
            const kindName = ts.Debug.formatEnum(jsDocParsingKind, (ts as any).JSDocParsingKind);
            for (const filename of filenames) {
                const testName = `${name}-${kindName}-${filename}`;
                it(testName, () => {
                    const sourceFile = ts.createSourceFile(filename, content, ts.ScriptTarget.ESNext, /*setParentNodes*/ undefined, /*scriptKind*/ undefined);
                    assert.isTrue(sourceFile && sourceFile.parseDiagnostics.length === 0, "no errors issued");
                    const sourceFileSkipped = ts.createSourceFile(filename, content, ts.ScriptTarget.ESNext, /*setParentNodes*/ undefined, /*scriptKind*/ undefined, jsDocParsingKind);
                    assert.isTrue(sourceFileSkipped && sourceFileSkipped.parseDiagnostics.length === 0, "no errors issued");

                    const patch = Diff.createTwoFilesPatch("default", kindName, Utils.sourceFileToJSON(sourceFile), Utils.sourceFileToJSON(sourceFileSkipped));
                    Harness.Baseline.runBaseline("jsDocParsingKind/" + testName + ".diff", patch);
                });
            }
        }
    }

    diffSourceFiles(
        "deprecated",
        `
/** @deprecated */
function imDeprecated() {}
imDeprecated()
/**
 * {@see imDeprecated}
 * @deprecated
 */
function imDeprecated2() {}
imDeprecated2()
    `,
    );

    diffSourceFiles(
        "see",
        `
/**
 * @typedef {any} A
 */

/**
 * @see {@link A}
 * @see {@linkcode A}
 * @see {@linkplain A}
 */
let foo;
    `,
    );

    diffSourceFiles(
        "link",
        `
import type { A } from "./a";

/** {@link A} */
export interface B {}
    `,
    );
});
