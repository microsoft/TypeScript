import * as Harness from "../_namespaces/Harness";
import * as ts from "../_namespaces/ts";
import * as Utils from "../_namespaces/Utils";

describe("unittests:: skipNonSemanticJSDocParsing", () => {
    const Diff = require("diff");

    function diffSourceFiles(name: string, content: string) {
        it(name, () => {
            const sourceFile = ts.createSourceFile("file.ts", content, ts.ScriptTarget.ESNext, /*setParentNodes*/ undefined, /*scriptKind*/ undefined);
            assert.isTrue(sourceFile && sourceFile.parseDiagnostics.length === 0, "no errors issued");
            const sourceFileSkipped = ts.createSourceFile("file.ts", content, ts.ScriptTarget.ESNext, /*setParentNodes*/ undefined, /*scriptKind*/ undefined, /*skipNonSemanticJSDoc*/ true);
            assert.isTrue(sourceFileSkipped && sourceFileSkipped.parseDiagnostics.length === 0, "no errors issued");

            const patch = Diff.createTwoFilesPatch("withJSDoc", "withoutJSDoc", Utils.sourceFileToJSON(sourceFile), Utils.sourceFileToJSON(sourceFileSkipped), "With JSDoc", "Without JSDoc");
            Harness.Baseline.runBaseline("skipNonSemanticJSDocParsing/" + name + ".diff", patch);
        });
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
