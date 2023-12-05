import * as ts from "../../_namespaces/ts";
import {
    dedent,
} from "../../_namespaces/Utils";
import {
    jsonToReadableText,
} from "../helpers";
import {
    baselineTsserverLogs,
    openFilesForSession,
    protocolFileLocationFromSubstring,
    TestSession,
} from "../helpers/tsserver";
import {
    createServerHost,
    File,
    libFile,
} from "../helpers/virtualFileSystemWithWatch";

describe("unittests:: tsserver:: auxiliaryProject::", () => {
    it("AuxiliaryProject does not remove scrips from InferredProject", () => {
        const aTs: File = {
            path: "/a.ts",
            content: `import { B } from "./b";`,
        };
        const bDts: File = {
            path: "/b.d.ts",
            content: `export declare class B {}`,
        };
        const bJs: File = {
            path: "/b.js",
            content: `export class B {}`,
        };
        const host = createServerHost([aTs, bDts, bJs]);
        const session = new TestSession(host);
        openFilesForSession([aTs], session);

        // Open file is in inferred project
        const inferredProject = session.getProjectService().inferredProjects[0];

        // getNoDtsResolutionProject will create an AuxiliaryProject with a.ts and b.js
        session.executeCommandSeq<ts.server.protocol.FindSourceDefinitionRequest>({
            command: ts.server.protocol.CommandTypes.FindSourceDefinition,
            arguments: protocolFileLocationFromSubstring(aTs, "B"),
        });
        const auxProject = inferredProject.getNoDtsResolutionProject(aTs.path as ts.server.NormalizedPath);

        // b.js ScriptInfo is now available because it's contained by the AuxiliaryProject.
        // The AuxiliaryProject should never be the default project for anything, so
        // the ScriptInfo should still report being an orphan, and getting its default
        // project should throw.
        const bJsScriptInfo = ts.Debug.checkDefined(session.getProjectService().getScriptInfo(bJs.path));
        assert(bJsScriptInfo.isOrphan());
        assert(bJsScriptInfo.isContainedByBackgroundProject());
        assert.deepEqual(bJsScriptInfo.containingProjects, [auxProject]);
        assert.throws(() => bJsScriptInfo.getDefaultProject());

        // When b.js is opened in the editor, it should be put into an InferredProject
        // even though it's still contained by the AuxiliaryProject.
        openFilesForSession([bJs], session);
        assert(!bJsScriptInfo.isOrphan());
        assert(bJsScriptInfo.isContainedByBackgroundProject());
        assert.equal(bJsScriptInfo.getDefaultProject().projectKind, ts.server.ProjectKind.Inferred);
        baselineTsserverLogs("auxiliaryProject", "does not remove scrips from InferredProject", session);
    });

    it("file is added later through finding definition", () => {
        const indexFile: File = {
            path: "/user/users/projects/myproject/index.ts",
            content: dedent`
                import { command } from "yargs";
                command("foo", yargs => {
                    yargs.positional();
                });
            `,
        };
        const host = createServerHost({
            "/user/users/projects/myproject/node_modules/@types/yargs/package.json": jsonToReadableText({
                name: "@types/yargs",
                version: "1.0.0",
                types: "./index.d.ts",
            }),
            "/user/users/projects/myproject/node_modules/@types/yargs/callback.d.ts": dedent`
                export declare class Yargs { positional(): Yargs; }
            `,
            "/user/users/projects/myproject/node_modules/@types/yargs/index.d.ts": dedent` 
                import { Yargs } from "./callback";
                export declare function command(command: string, cb: (yargs: Yargs) => void): void;
            `,
            "/user/users/projects/myproject/node_modules/yargs/package.json": jsonToReadableText({
                name: "yargs",
                version: "1.0.0",
                main: "index.js",
            }),
            "/user/users/projects/myproject/node_modules/yargs/callback.js": dedent`
                export class Yargs { positional() { } }
            `,
            "/user/users/projects/myproject/node_modules/yargs/index.js": dedent`
                // Specifically didnt have ./callback import to ensure that resolving module sepcifier adds the file to project at later stage
                export function command(cmd, cb) { cb(Yargs) }
            `,
            [indexFile.path]: indexFile.content,
            [libFile.path]: libFile.content,
        });
        const session = new TestSession(host);
        openFilesForSession([indexFile], session);
        session.executeCommandSeq<ts.server.protocol.FindSourceDefinitionRequest>({
            command: ts.server.protocol.CommandTypes.FindSourceDefinition,
            arguments: protocolFileLocationFromSubstring(indexFile, "positional"),
        });
        session.executeCommandSeq<ts.server.protocol.FindSourceDefinitionRequest>({
            command: ts.server.protocol.CommandTypes.FindSourceDefinition,
            arguments: protocolFileLocationFromSubstring(indexFile, "positional"),
        });
        session.executeCommandSeq<ts.server.protocol.FindSourceDefinitionRequest>({
            command: ts.server.protocol.CommandTypes.FindSourceDefinition,
            arguments: protocolFileLocationFromSubstring(indexFile, "command", { index: 1 }),
        });
        baselineTsserverLogs("auxiliaryProject", "file is added later through finding definition", session);
    });

    it("resolution is reused from different folder", () => {
        const indexFile: File = {
            path: "/user/users/projects/myproject/some/index.ts",
            content: dedent`
                import { random } from "../folder/random";
                import { command } from "yargs";
                command("foo", yargs => {
                    yargs.positional();
                });
            `,
        };
        const host = createServerHost({
            "/user/users/projects/myproject/node_modules/@types/yargs/package.json": jsonToReadableText({
                name: "@types/yargs",
                version: "1.0.0",
                types: "./index.d.ts",
            }),
            "/user/users/projects/myproject/node_modules/@types/yargs/callback.d.ts": dedent`
                export declare class Yargs { positional(): Yargs; }
            `,
            "/user/users/projects/myproject/node_modules/@types/yargs/index.d.ts": dedent` 
                import { Yargs } from "./callback";
                export declare function command(command: string, cb: (yargs: Yargs) => void): void;
            `,
            "/user/users/projects/myproject/node_modules/yargs/package.json": jsonToReadableText({
                name: "yargs",
                version: "1.0.0",
                main: "index.js",
            }),
            "/user/users/projects/myproject/node_modules/yargs/callback.js": dedent`
                export class Yargs { positional() { } }
            `,
            "/user/users/projects/myproject/node_modules/yargs/index.js": dedent`
                // Specifically didnt have ./callback import to ensure that resolving module sepcifier adds the file to project at later stage
                export function command(cmd, cb) { cb(Yargs) }
            `,
            "/user/users/projects/myproject/folder/random.ts": dedent`
                import { Yargs } from "yargs/callback";
            `,
            [indexFile.path]: indexFile.content,
            [libFile.path]: libFile.content,
        });
        const session = new TestSession(host);
        openFilesForSession([indexFile], session);
        session.executeCommandSeq<ts.server.protocol.FindSourceDefinitionRequest>({
            command: ts.server.protocol.CommandTypes.FindSourceDefinition,
            arguments: protocolFileLocationFromSubstring(indexFile, "positional"),
        });
        baselineTsserverLogs("auxiliaryProject", "resolution is reused from different folder", session);
    });
});
