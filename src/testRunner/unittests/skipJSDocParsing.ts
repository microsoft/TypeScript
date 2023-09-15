import * as Harness from "../_namespaces/Harness";
import * as ts from "../_namespaces/ts";
import * as Utils from "../_namespaces/Utils";

describe("unittests:: skipJSDocParsing", () => {
    const Diff = require("diff");

    const kinds = [
        ts.JSDocParsingMode.KeepAll,
        ts.JSDocParsingMode.KeepSemanticOnly,
        ts.JSDocParsingMode.SkipAll,
    ];
    const filenames = [
        "file.ts",
        "file.js",
    ];
    function diffSourceFiles(name: string, content: string) {
        for (const jsDocParsingMode of kinds) {
            const kindName = ts.Debug.formatEnum(jsDocParsingMode, (ts as any).JSDocParsingMode);
            for (const filename of filenames) {
                const testName = `${name}-${kindName}-${filename}`;
                it(testName, () => {
                    const sourceFile = ts.createSourceFile(filename, content, ts.ScriptTarget.ESNext, /*jsDocParsingMode*/ undefined, /*setParentNodes*/ undefined, /*scriptKind*/ undefined);
                    assert.isTrue(sourceFile && sourceFile.parseDiagnostics.length === 0, "no errors issued");
                    const sourceFileSkipped = ts.createSourceFile(filename, content, ts.ScriptTarget.ESNext, jsDocParsingMode, /*setParentNodes*/ undefined, /*scriptKind*/ undefined);
                    assert.isTrue(sourceFileSkipped && sourceFileSkipped.parseDiagnostics.length === 0, "no errors issued");

                    const patch = Diff.createTwoFilesPatch("default", kindName, Utils.sourceFileToJSON(sourceFile), Utils.sourceFileToJSON(sourceFileSkipped));
                    Harness.Baseline.runBaseline("skipJSDocParsing/" + testName + ".diff", patch);
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
