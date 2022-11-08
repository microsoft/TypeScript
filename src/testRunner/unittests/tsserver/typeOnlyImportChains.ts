import * as ts from "../../_namespaces/ts";

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

        assertUsageError([a, b, c], c, ts.Diagnostics._0_cannot_be_used_as_a_value_because_it_was_imported_using_import_type);
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

        assertUsageError([a, b, c], c, ts.Diagnostics._0_cannot_be_used_as_a_value_because_it_was_imported_using_import_type);
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

        assertUsageError([a, b, c], c, ts.Diagnostics._0_cannot_be_used_as_a_value_because_it_was_imported_using_import_type);
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

        assertUsageError([a, b, c], c, ts.Diagnostics._0_cannot_be_used_as_a_value_because_it_was_imported_using_import_type);
    });

    it("export default -> type-only import default -> export default -> import default", () => {
        const a = {
            path: "/a.ts",
            content: "export default class A {}"
        };
        const b = {
            path: "/b.ts",
            content: "import type A from './a'; export default A;"
        };
        const c = {
            path: "/c.ts",
            content: "import A from './b'; new A();"
        };

        assertUsageError([a, b, c], c, ts.Diagnostics._0_cannot_be_used_as_a_value_because_it_was_imported_using_import_type);
    });

    it("named export -> type-only export from -> export star from -> named import", () => {
        const a = {
            path: "/a.ts",
            content: "export class A {}"
        };
        const b = {
            path: "/b.ts",
            content: "export type { A } from './a';"
        };
        const c = {
            path: "/c.ts",
            content: "export * from './b';"
        };
        const d = {
            path: "/d.ts",
            content: "import { A } from './c'; new A();"
        };

        assertUsageError([a, b, c, d], d, ts.Diagnostics._0_cannot_be_used_as_a_value_because_it_was_exported_using_export_type);
    });

    it("named export -> export namespace from -> type-only named import -> named export -> named import", () => {
        const a = {
            path: "/a.ts",
            content: "export class A {}"
        };
        const b = {
            path: "/b.ts",
            content: "export * as a from './a';"
        };
        const c = {
            path: "/c.ts",
            content: "import type { a } from './b'; export { a };"
        };
        const d = {
            path: "/d.ts",
            content: "import { a } from './c'; new a.A();"
        };

        assertUsageError([a, b, c, d], d, ts.Diagnostics._0_cannot_be_used_as_a_value_because_it_was_imported_using_import_type);
    });

    it("named export -> type-only export from -> export namespace from -> named import", () => {
        const a = {
            path: "/a.ts",
            content: "export class A {}"
        };
        const b = {
            path: "/b.ts",
            content: "export type { A } from './a';"
        };
        const c = {
            path: "/c.ts",
            content: "export * as a from './b';"
        };
        const d = {
            path: "/d.ts",
            content: "import { a } from './c'; new a.A();"
        };

        assertUsageError([a, b, c, d], d, ts.Diagnostics.Property_0_does_not_exist_on_type_1);
    });
});

function assertUsageError(files: readonly ts.TestFSWithWatch.File[], openFile: ts.TestFSWithWatch.File, diagnostic: ts.DiagnosticMessage) {
    const host = ts.projectSystem.createServerHost(files);
    const session = ts.projectSystem.createSession(host);
    ts.projectSystem.openFilesForSession([openFile], session);
    const req = ts.projectSystem.makeSessionRequest<ts.projectSystem.protocol.SemanticDiagnosticsSyncRequestArgs>(
        ts.projectSystem.protocol.CommandTypes.SemanticDiagnosticsSync,
        { file: openFile.path }
    );
    const diagnostics = session.executeCommand(req).response as ts.projectSystem.protocol.Diagnostic[];
    assert.lengthOf(diagnostics, 1);
    assert.equal(diagnostics[0].code, diagnostic.code);
}
