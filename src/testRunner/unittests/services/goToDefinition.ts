import { protocol } from "../../_namespaces/ts.server";
import { baselineTsserverLogs, createLoggerWithInMemoryLogs, createSession } from "../helpers/tsserver";
import { createServerHost, File } from "../helpers/virtualFileSystemWithWatch";

describe("unittests:: services:: goToDefinition", () => {
    it("does not issue errors on jsdoc in TS", () => {
        const files: File[] = [
            {
                path: "/packages/babel-loader/tsconfig.json",
                content:
                `
{
    "compilerOptions": {
        "target": "ES2018",
        "module": "commonjs",
        "strict": true,
        "esModuleInterop": true,
        "rootDir": "src",
        "outDir": "dist"
    },
    "include": ["src"],
}
`
            },
            {
                path: "/packages/babel-loader/src/index.ts",
                content:
                `
declare class Stuff {
    /** For more thorough tests, use {@link checkFooIs} */
    checkFooLengthIs(len: number): void;

    checkFooIs(value: object): void;
}
`
            },
        ];
        const host = createServerHost(files);
        const session = createSession(host, { logger: createLoggerWithInMemoryLogs(host) });
        // Open files in the two configured projects
        session.executeCommandSeq<protocol.UpdateOpenRequest>({
            command: protocol.CommandTypes.UpdateOpen,
            arguments: {
                openFiles: [
                    {
                        file: files[1].path, // babel-loader/src/index.ts
                        fileContent: files[1].content,
                    }
                ]
            }
        });
        session.executeCommandSeq<protocol.DefinitionRequest>({
            command: protocol.CommandTypes.Definition,
            arguments: {
                line: 3,
                offset: 45,
                file: "/packages/babel-loader/src/index.ts",
            },
        });
        // Now change `babel-loader` project to no longer import `core` project
        session.executeCommandSeq<protocol.SemanticDiagnosticsSyncRequest>({
            command: protocol.CommandTypes.SemanticDiagnosticsSync,
            arguments: {
                file: "/packages/babel-loader/src/index.ts",
            }
        });
        baselineTsserverLogs("goToDefinition", "does not issue errors on jsdoc in TS", session);

    });
});
