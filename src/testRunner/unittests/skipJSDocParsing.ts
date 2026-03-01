import * as Diff from "diff";
import * as Harness from "../_namespaces/Harness.js";
import * as ts from "../_namespaces/ts.js";
import * as Utils from "../_namespaces/Utils.js";

describe("unittests:: skipJSDocParsing", () => {
    const kinds = [
        ts.JSDocParsingMode.ParseAll,
        ts.JSDocParsingMode.ParseForTypeErrors,
        ts.JSDocParsingMode.ParseForTypeInfo,
        ts.JSDocParsingMode.ParseNone,
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
                    const sourceFile = ts.createSourceFile(filename, content, { languageVersion: ts.ScriptTarget.ESNext, jsDocParsingMode: undefined });
                    assert.isTrue(sourceFile && sourceFile.parseDiagnostics.length === 0, "no errors issued");
                    const sourceFileSkipped = ts.createSourceFile(filename, content, { languageVersion: ts.ScriptTarget.ESNext, jsDocParsingMode });
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
