import * as Harness from "../_namespaces/Harness.js";
import * as ts from "../_namespaces/ts.js";

describe("unittests:: jsonParserRecovery", () => {
    function parsesToValidSourceFileWithErrors(name: string, text: string) {
        it(name, () => {
            const file = ts.parseJsonText(name, text);
            assert(file.parseDiagnostics.length, "Should have parse errors");
            Harness.Baseline.runBaseline(
                `jsonParserRecovery/${name.replace(/[^\w-]/g, "_")}.errors.txt`,
                Harness.Compiler.getErrorBaseline([{
                    content: text,
                    unitName: name,
                }], file.parseDiagnostics),
            );

            // Will throw if parse tree does not cover full input text
            file.getChildren();
        });
    }

    parsesToValidSourceFileWithErrors("trailing identifier", "{} blah");
    parsesToValidSourceFileWithErrors("TypeScript code", "interface Foo {} blah");
    parsesToValidSourceFileWithErrors("Two comma-separated objects", "{}, {}");
    parsesToValidSourceFileWithErrors("Two objects", "{} {}");
    parsesToValidSourceFileWithErrors(
        "JSX",
        `
        interface Test {}

        const Header = () => (
          <div>
            <h1>Header</h1>
            <style jsx>
              {\`
                h1 {
                  color: red;
                }
              \`}
            </style>
          </div>
        )`,
    );
});
