import { createLoggerWithInMemoryLogs } from "../../../harness/tsserverLogger";
import { protocol } from "../../_namespaces/ts.server";
import {
    baselineTsserverLogs,
    createSession,
} from "../helpers/tsserver";
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
  /**
   * Register a function to be run on mod initialization...
   *
   * {@link https://lua-api.factorio.com/latest/LuaBootstrap.html#LuaBootstrap.on_init View documentation}
   * @param f The handler for this event. Passing nil will unregister it.
   * @remarks For more context, refer to the {@link https://lua-api.factorio.com/latest/Data-Lifecycle.html Data Lifecycle} page.
   * @example Initialize a players table in global for later use.
   *
   */
  on_init(f: (() => void) | undefined): void
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
                line: 6,
                offset: 13,
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
        baselineTsserverLogs("goToDefinition", "does not issue errors on jsdoc in TS2", session);

    });
});
