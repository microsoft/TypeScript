namespace ts.projectSystem {
    describe("unittests:: tsserver:: forceConsistentCasingInFileNames", () => {
        it("works when extends is specified with a case insensitive file system", () => {
            const rootPath = "/Users/username/dev/project";
            const file1: File = {
                path: `${rootPath}/index.ts`,
                content: 'import {x} from "file2";',
            };
            const file2: File = {
                path: `${rootPath}/file2.js`,
                content: "",
            };
            const file2Dts: File = {
                path: `${rootPath}/types/file2/index.d.ts`,
                content: "export declare const x: string;",
            };
            const tsconfigAll: File = {
                path: `${rootPath}/tsconfig.all.json`,
                content: JSON.stringify({
                    compilerOptions: {
                        baseUrl: ".",
                        paths: { file2: ["./file2.js"] },
                        typeRoots: ["./types"],
                        forceConsistentCasingInFileNames: true,
                    },
                }),
            };
            const tsconfig: File = {
                path: `${rootPath}/tsconfig.json`,
                content: JSON.stringify({ extends: "./tsconfig.all.json" }),
            };

            const host = createServerHost([file1, file2, file2Dts, libFile, tsconfig, tsconfigAll], { useCaseSensitiveFileNames: false });
            const session = createSession(host);

            openFilesForSession([file1], session);
            const projectService = session.getProjectService();

            checkNumberOfProjects(projectService, { configuredProjects: 1 });

            const diagnostics = configuredProjectAt(projectService, 0).getLanguageService().getCompilerOptionsDiagnostics();
            assert.deepEqual(diagnostics, []);
        });
    });
}
