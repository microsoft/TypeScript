import * as ts from "../../_namespaces/ts";

describe("unittests:: tsserver:: Semantic operations on Syntax server", () => {
    function setup() {
        const file1: ts.projectSystem.File = {
            path: `${ts.tscWatch.projectRoot}/a.ts`,
            content: `import { y, cc } from "./b";
import { something } from "something";
class c { prop = "hello"; foo() { return this.prop; } }`
        };
        const file2: ts.projectSystem.File = {
            path: `${ts.tscWatch.projectRoot}/b.ts`,
            content: `export { cc } from "./c";
import { something } from "something";
                export const y = 10;`
        };
        const file3: ts.projectSystem.File = {
            path: `${ts.tscWatch.projectRoot}/c.ts`,
            content: `export const cc = 10;`
        };
        const something: ts.projectSystem.File = {
            path: `${ts.tscWatch.projectRoot}/node_modules/something/index.d.ts`,
            content: "export const something = 10;"
        };
        const configFile: ts.projectSystem.File = {
            path: `${ts.tscWatch.projectRoot}/tsconfig.json`,
            content: "{}"
        };
        const host = ts.projectSystem.createServerHost([file1, file2, file3, something, ts.projectSystem.libFile, configFile]);
        const session = ts.projectSystem.createSession(host, { syntaxOnly: true, useSingleInferredProject: true, logger: ts.projectSystem.createLoggerWithInMemoryLogs(host) });
        return { host, session, file1, file2, file3, something, configFile };
    }

    function verifySessionException<T extends ts.server.protocol.Request>(session: ts.projectSystem.TestSession, request: Partial<T>) {
        try {
            session.executeCommandSeq(request);
        }
        catch (e) {
            session.logger.info(e.message);
        }
    }

    it("open files are added to inferred project even if config file is present and semantic operations fail", () => {
        const { session, file1, file2, file3, something } = setup();
        ts.projectSystem.openFilesForSession([file1], session);
        verifyCompletions();
        verifyGoToDefToB();

        ts.projectSystem.openFilesForSession([file2], session);
        verifyCompletions();
        verifyGoToDefToB();
        verifyGoToDefToC();

        ts.projectSystem.openFilesForSession([file3], session);
        ts.projectSystem.openFilesForSession([something], session);

        // Close open files and verify resolutions
        ts.projectSystem.closeFilesForSession([file3], session);
        ts.projectSystem.closeFilesForSession([file2], session);

        ts.projectSystem.baselineTsserverLogs("syntacticServer", "files go to inferred project and semantic operations fail", session);

        function verifyCompletions() {
            verifySessionException<ts.projectSystem.protocol.CompletionsRequest>(session, {
                command: ts.projectSystem.protocol.CommandTypes.Completions,
                arguments: ts.projectSystem.protocolFileLocationFromSubstring(file1, "prop", { index: 1 })
            });
        }

        function verifyGoToDefToB() {
            verifySessionException<ts.projectSystem.protocol.DefinitionAndBoundSpanRequest>(session, {
                command: ts.projectSystem.protocol.CommandTypes.DefinitionAndBoundSpan,
                arguments: ts.projectSystem.protocolFileLocationFromSubstring(file1, "y")
            });
        }

        function verifyGoToDefToC() {
            verifySessionException<ts.projectSystem.protocol.DefinitionAndBoundSpanRequest>(session, {
                command: ts.projectSystem.protocol.CommandTypes.DefinitionAndBoundSpan,
                arguments: ts.projectSystem.protocolFileLocationFromSubstring(file1, "cc")
            });
        }
    });

    it("throws on unsupported commands", () => {
        const { session, file1 } = setup();
        const service = session.getProjectService();
        ts.projectSystem.openFilesForSession([file1], session);
        verifySessionException<ts.projectSystem.protocol.SemanticDiagnosticsSyncRequest>(session, {
            type: "request",
            seq: 1,
            command: ts.projectSystem.protocol.CommandTypes.SemanticDiagnosticsSync,
            arguments: { file: file1.path }
        });

        const project = service.inferredProjects[0];
        try {
            project.getLanguageService().getSemanticDiagnostics(file1.path);
        }
        catch (e) {
            session.logger.info(e.message);
        }
        ts.projectSystem.baselineTsserverLogs("syntacticServer", "throws on unsupported commands", session);
    });

    it("should not include auto type reference directives", () => {
        const { host, session, file1 } = setup();
        const atTypes: ts.projectSystem.File = {
            path: `/node_modules/@types/somemodule/index.d.ts`,
            content: "export const something = 10;"
        };
        host.ensureFileOrFolder(atTypes);
        ts.projectSystem.openFilesForSession([file1], session);
        ts.projectSystem.baselineTsserverLogs("syntacticServer", "should not include auto type reference directives", session);
    });

    it("should not include referenced files from unopened files", () => {
        const file1: ts.projectSystem.File = {
            path: `${ts.tscWatch.projectRoot}/a.ts`,
            content: `///<reference path="b.ts"/>
///<reference path="${ts.tscWatch.projectRoot}/node_modules/something/index.d.ts"/>
function fooA() { }`
        };
        const file2: ts.projectSystem.File = {
            path: `${ts.tscWatch.projectRoot}/b.ts`,
            content: `///<reference path="./c.ts"/>
///<reference path="${ts.tscWatch.projectRoot}/node_modules/something/index.d.ts"/>
function fooB() { }`
        };
        const file3: ts.projectSystem.File = {
            path: `${ts.tscWatch.projectRoot}/c.ts`,
            content: `function fooC() { }`
        };
        const something: ts.projectSystem.File = {
            path: `${ts.tscWatch.projectRoot}/node_modules/something/index.d.ts`,
            content: "function something() {}"
        };
        const configFile: ts.projectSystem.File = {
            path: `${ts.tscWatch.projectRoot}/tsconfig.json`,
            content: "{}"
        };
        const host = ts.projectSystem.createServerHost([file1, file2, file3, something, ts.projectSystem.libFile, configFile]);
        const session = ts.projectSystem.createSession(host, { syntaxOnly: true, useSingleInferredProject: true });
        const service = session.getProjectService();
        ts.projectSystem.openFilesForSession([file1], session);
        ts.projectSystem.checkNumberOfProjects(service, { inferredProjects: 1 });
        const project = service.inferredProjects[0];
        ts.projectSystem.checkProjectActualFiles(project, ts.emptyArray);

        ts.projectSystem.openFilesForSession([file2], session);
        ts.projectSystem.checkNumberOfProjects(service, { inferredProjects: 1 });
        assert.isFalse(project.dirty);
        project.updateGraph();
        ts.projectSystem.checkProjectActualFiles(project, ts.emptyArray);

        ts.projectSystem.closeFilesForSession([file2], session);
        ts.projectSystem.checkNumberOfProjects(service, { inferredProjects: 1 });
        assert.isTrue(project.dirty);
        ts.projectSystem.checkProjectActualFiles(project, ts.emptyArray);
    });
});
