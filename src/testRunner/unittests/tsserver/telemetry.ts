import { createLoggerWithInMemoryLogs } from "../../../harness/tsserverLogger";
import * as ts from "../../_namespaces/ts";
import {
    baselineTsserverLogs,
    closeFilesForSession,
    createSession,
    openExternalProjectForSession,
    openFilesForSession,
    toExternalFiles,
} from "../helpers/tsserver";
import { createServerHost, File } from "../helpers/virtualFileSystemWithWatch";

describe("unittests:: tsserver:: project telemetry", () => {
    it("does nothing for inferred project", () => {
        const file = makeFile("/a.js");
        const host = createServerHost([file]);
        const session = createSession(host, {
            canUseEvents: true,
            logger: createLoggerWithInMemoryLogs(host)
        });
        openFilesForSession([file], session);
        baselineTsserverLogs("telemetry", "does nothing for inferred project", session);
    });

    it("only sends an event once", () => {
        const file = makeFile("/a/a.ts");
        const file2 = makeFile("/b.ts");
        const tsconfig = makeFile("/a/tsconfig.json", {});

        const host = createServerHost([file, file2, tsconfig]);
        const session = createSession(host, {
            canUseEvents: true,
            logger: createLoggerWithInMemoryLogs(host)
        });
        openFilesForSession([file], session);
        closeFilesForSession([file], session);
        openFilesForSession([file2], session);
        openFilesForSession([file], session);
        baselineTsserverLogs("telemetry", "only sends an event once", session);
    });

    it("counts files by extension", () => {
        const files = ["ts.ts", "tsx.tsx", "moo.ts", "dts.d.ts", "jsx.jsx", "js.js", "badExtension.badExtension"].map(f => makeFile(`/src/${f}`));
        const notIncludedFile = makeFile("/bin/ts.js");
        const compilerOptions: ts.CompilerOptions = { allowJs: true };
        const tsconfig = makeFile("/tsconfig.json", { compilerOptions, include: ["src"] });

        const host = createServerHost([...files, notIncludedFile, tsconfig]);
        const session = createSession(host, {
            canUseEvents: true,
            logger: createLoggerWithInMemoryLogs(host)
        });
        openFilesForSession([files[0]], session);
        baselineTsserverLogs("telemetry", "counts files by extension", session);
    });

    it("works with external project", () => {
        const file1 = makeFile("/a.ts");
        const host = createServerHost([file1]);
        const session = createSession(host, {
            canUseEvents: true,
            logger: createLoggerWithInMemoryLogs(host)
        });
        const compilerOptions: ts.server.protocol.CompilerOptions = { strict: true };

        const projectFileName = "/hunter2/foo.csproj";

        open();

        // Also test that opening an external project only sends an event once.
        closeFilesForSession([file1], session);

        session.executeCommandSeq<ts.server.protocol.CloseExternalProjectRequest>({
            command: ts.server.protocol.CommandTypes.CloseExternalProject,
            arguments: { projectFileName }
        });

        open();
        baselineTsserverLogs("telemetry", "works with external project", session);

        function open(): void {
            openExternalProjectForSession({
                rootFiles: toExternalFiles([file1.path]),
                options: compilerOptions,
                projectFileName,
            }, session);
            openFilesForSession([file1], session); // Only on file open the project will be updated
        }
    });

    it("does not expose paths", () => {
        const file = makeFile("/a.ts");

        const compilerOptions: ts.CompilerOptions = {
            project: "",
            outFile: "hunter2.js",
            outDir: "hunter2",
            rootDir: "hunter2",
            baseUrl: "hunter2",
            rootDirs: ["hunter2"],
            typeRoots: ["hunter2"],
            types: ["hunter2"],
            sourceRoot: "hunter2",
            mapRoot: "hunter2",
            jsxFactory: "hunter2",
            out: "hunter2",
            reactNamespace: "hunter2",
            charset: "hunter2",
            locale: "hunter2",
            declarationDir: "hunter2",
            paths: {
                "*": ["hunter2"],
            },

            // Boolean / number options get through
            declaration: true,

            // List of string enum gets through -- but only if legitimately a member of the enum
            lib: ["es6", "dom", "hunter2"],

            // Sensitive data doesn't get through even if sent to an option of safe type
            checkJs: "hunter2" as any as boolean,
        };
        (compilerOptions as any).unknownCompilerOption = "hunter2"; // These are always ignored.
        const tsconfig = makeFile("/tsconfig.json", { compilerOptions, files: ["/a.ts"] });

        const host = createServerHost([file, tsconfig]);
        const session = createSession(host, {
            canUseEvents: true,
            logger: createLoggerWithInMemoryLogs(host)
        });
        openFilesForSession([file], session);
        baselineTsserverLogs("telemetry", "does not expose paths", session);
    });

    it("sends telemetry for extends, files, include, exclude, and compileOnSave", () => {
        const file = makeFile("/hunter2/a.ts");
        const tsconfig = makeFile("/tsconfig.json", {
            compilerOptions: {},
            extends: "hunter2.json",
            files: ["hunter2/a.ts"],
            include: ["hunter2"],
            exclude: ["hunter2"],
            compileOnSave: true,
        });
        const host = createServerHost([file, tsconfig]);
        const session = createSession(host, {
            canUseEvents: true,
            logger: createLoggerWithInMemoryLogs(host)
        });
        openFilesForSession([file], session);
        baselineTsserverLogs("telemetry", "sends telemetry for extends, files, include, exclude, and compileOnSave", session);
    });

    const autoJsCompilerOptions = {
        // Apparently some options are added by default.
        allowJs: true,
        allowSyntheticDefaultImports: true,
        maxNodeModuleJsDepth: 2,
        skipLibCheck: true,
        noEmit: true
    };

    it("sends telemetry for typeAcquisition settings", () => {
        const file = makeFile("/a.js");
        const jsconfig = makeFile("/jsconfig.json", {
            compilerOptions: {},
            typeAcquisition: {
                enable: true,
                include: ["hunter2", "hunter3"],
                exclude: [],
            },
        });
        const host = createServerHost([file, jsconfig]);
        const session = createSession(host, {
            canUseEvents: true,
            logger: createLoggerWithInMemoryLogs(host)
        });
        openFilesForSession([file], session);
        baselineTsserverLogs("telemetry", "sends telemetry for typeAcquisition settings", session);
    });

    it("sends telemetry for file sizes", () => {
        const jsFile = makeFile("/a.js", "1");
        const tsFile = makeFile("/b.ts", "12");
        const tsconfig = makeFile("/jsconfig.json", {
            compilerOptions: autoJsCompilerOptions
        });
        const host = createServerHost([tsconfig, tsFile, jsFile]);
        const session = createSession(host, {
            canUseEvents: true,
            logger: createLoggerWithInMemoryLogs(host)
        });
        openFilesForSession([jsFile], session);
        baselineTsserverLogs("telemetry", "sends telemetry for file sizes", session);
    });

    it("detects whether language service was disabled", () => {
        const file = makeFile("/a.js");
        const tsconfig = makeFile("/jsconfig.json", {});
        const host = createServerHost([tsconfig, file]);
        const session = createSession(host, {
            canUseEvents: true,
            logger: createLoggerWithInMemoryLogs(host)
        });
        const fileSize = ts.server.maxProgramSizeForNonTsFiles + 1;
        host.getFileSize = () => fileSize;
        openFilesForSession([file], session);
        baselineTsserverLogs("telemetry", "detects whether language service was disabled", session);
    });

    describe("open files telemetry", () => {
        it("sends event for inferred project", () => {
            const ajs = makeFile("/a.js", "// @ts-check\nconst x = 0;");
            const bjs = makeFile("/b.js");
            const host = createServerHost([ajs, bjs]);
            const session = createSession(host, {
                canUseEvents: true,
                logger: createLoggerWithInMemoryLogs(host)
            });
            openFilesForSession([ajs, bjs], session);

            // No repeated send for opening a file seen before.
            openFilesForSession([bjs], session);
            baselineTsserverLogs("telemetry", "sends event for inferred project", session);
        });

        it("not for '.ts' file", () => {
            const ats = makeFile("/a.ts", "");
            const host = createServerHost([ats]);
            const session = createSession(host, {
                canUseEvents: true,
                logger: createLoggerWithInMemoryLogs(host)
            });
            openFilesForSession([ats], session);
            baselineTsserverLogs("telemetry", "not for ts file", session);
        });

        it("even for project with 'ts-check' in config", () => {
            const file = makeFile("/a.js");
            const compilerOptions: ts.CompilerOptions = { checkJs: true };
            const jsconfig = makeFile("/jsconfig.json", { compilerOptions });
            const host = createServerHost([jsconfig, file]);
            const session = createSession(host, {
                canUseEvents: true,
                logger: createLoggerWithInMemoryLogs(host)
            });
            openFilesForSession([file], session);
            baselineTsserverLogs("telemetry", "even for project with ts-check in config", session);
        });
    });
});

function makeFile(path: string, content: {} = ""): File {
    return { path, content: ts.isString(content) ? content : JSON.stringify(content) };
}
