namespace ts.projectSystem {
    describe("unittests:: tsserver:: typeOnlyImportChains", () => {
        it("named export -> type-only namespace import -> named export -> named import", () => {
            const a = {
                path: "/a.ts",
                content: "export class A {}"
            };
            const b = {
                path: "/b.ts",
                content: "import type * as a from './a'; export { a };"
            };
            const c = {
                path: "/c.ts",
                content: "import { a } from './b'; new a.A();"
            };

            assertUsageError([a, b, c], c);
        });

        it("named export -> type-only named import -> named export -> named import", () => {
            const a = {
                path: "/a.ts",
                content: "export class A {}"
            };
            const b = {
                path: "/b.ts",
                content: "import type { A } from './a'; export { A };"
            };
            const c = {
                path: "/c.ts",
                content: "import { A } from './b'; new A();"
            };

            assertUsageError([a, b, c], c);
        });

        it("named export -> type-only namespace import -> export equals -> import equals", () => {
            const a = {
                path: "/a.ts",
                content: "export class A {}"
            };
            const b = {
                path: "/b.ts",
                content: "import type * as a from './a'; export = a;"
            };
            const c = {
                path: "/c.ts",
                content: "import a = require('./b'); new a.A();"
            };

            assertUsageError([a, b, c], c);
        });

        it("named export -> type-only namespace import -> export default -> import default", () => {
            const a = {
                path: "/a.ts",
                content: "export class A {}"
            };
            const b = {
                path: "/b.ts",
                content: "import type * as a from './a'; export default a;"
            };
            const c = {
                path: "/c.ts",
                content: "import a from './b'; new a.A();"
            };

            assertUsageError([a, b, c], c);
        });

        it("export default -> type-only import default -> export default -> import default", () => {
            const a = {
                path: "/a.ts",
                content: "export defai;t class A {}"
            };
            const b = {
                path: "/b.ts",
                content: "import type A from './a'; export default A;"
            };
            const c = {
                path: "/c.ts",
                content: "import A from './b'; new A();"
            };

            assertUsageError([a, b, c], c);
        });
    });

    function assertUsageError(files: readonly TestFSWithWatch.File[], openFile: TestFSWithWatch.File) {
        const host = createServerHost(files);
        const session = createSession(host);
        openFilesForSession([openFile], session);
        const req = makeSessionRequest<protocol.SemanticDiagnosticsSyncRequestArgs>(
            protocol.CommandTypes.SemanticDiagnosticsSync,
            { file: openFile.path }
        );
        const diagnostics = session.executeCommand(req).response as protocol.Diagnostic[];
        assert.lengthOf(diagnostics, 1);
        assert.oneOf(diagnostics[0].code, [
            Diagnostics._0_cannot_be_used_as_a_value_because_it_was_imported_using_import_type.code,
            Diagnostics._0_cannot_be_used_as_a_value_because_it_was_exported_using_export_type.code
        ]);
    }
}
