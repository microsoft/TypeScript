namespace ts {
    describe("unittests:: services:: projectService", () => {
        it("does not return default configured projects for node_modules", () => {
            const rootFilePath = server.asNormalizedPath("/project/index.ts");
            const rootProjectPath = server.asNormalizedPath("/project/tsconfig.json");
            const nodeModulesFilePath1 = server.asNormalizedPath("/project/node_modules/@types/a/index.d.ts");
            const nodeModulesProjectPath1 = server.asNormalizedPath("/project/node_modules/@types/a/tsconfig.json");
            const nodeModulesFilePath2 = server.asNormalizedPath("/project/node_modules/@types/b/index.d.ts");
            const serverHost = projectSystem.createServerHost([
                { path: rootFilePath, content: "import 'a'; import 'b';" },
                { path: rootProjectPath, content: "{}" },
                { path: nodeModulesFilePath1, content: "{}" },
                { path: nodeModulesProjectPath1, content: "{}" },
                { path: nodeModulesFilePath2, content: "{}" },
            ]);
            const projectService = projectSystem.createProjectService(serverHost, { useSingleInferredProject: true });

            const openRootFileResult = projectService.openClientFile(rootFilePath);
            assert.strictEqual(openRootFileResult.configFileName?.toString(), rootProjectPath);

            const openNodeModulesFileResult1 = projectService.openClientFile(nodeModulesFilePath1);
            assert.strictEqual(openNodeModulesFileResult1.configFileName?.toString(), nodeModulesProjectPath1);

            const openNodeModulesFileResult2 = projectService.openClientFile(nodeModulesFilePath2);
            assert.isUndefined(openNodeModulesFileResult2.configFileName);

            const rootProject = projectService.findProject(rootProjectPath)!;
            assert.isTrue(rootProject.containsFile(rootFilePath));
            assert.isTrue(rootProject.containsFile(nodeModulesFilePath1));
            assert.isTrue(rootProject.containsFile(nodeModulesFilePath2));
        });
    });
}