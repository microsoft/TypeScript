namespace ts.projectSystem {
    const tsConfig: File = {
        path: "/tsconfig.json",
        content: "{}"
    };
    const packageJsonContent = {
        dependencies: {
            redux: "*"
        },
        peerDependencies: {
            react: "*"
        },
        optionalDependencies: {
            typescript: "*"
        },
        devDependencies: {
            webpack: "*"
        }
    };
    const packageJson: File = {
        path: "/package.json",
        content: JSON.stringify(packageJsonContent, undefined, 2)
    };

    describe("unittests:: tsserver:: packageJsonInfo", () => {
        it("detects new package.json files that are added, caches them, and watches them", () => {
            // Initialize project without package.json
            const { project, host, projectService } = setup([tsConfig]);
            projectService.openClientFile(tsConfig.path);
            assert.isUndefined(project.packageJsonCache.getInDirectory("/"));

            // Add package.json
            host.reloadFS([tsConfig, packageJson]);
            let packageJsonInfo = project.packageJsonCache.getInDirectory("/")!;
            assert.ok(packageJsonInfo);
            assert.ok(packageJsonInfo.dependencies);
            assert.ok(packageJsonInfo.devDependencies);
            assert.ok(packageJsonInfo.peerDependencies);
            assert.ok(packageJsonInfo.optionalDependencies);

            // Edit package.json
            host.reloadFS([
                tsConfig,
                {
                    ...packageJson,
                    content: JSON.stringify({
                        ...packageJsonContent,
                        dependencies: undefined
                    })
                }
            ]);
            packageJsonInfo = project.packageJsonCache.getInDirectory("/")!;
            assert.isUndefined(packageJsonInfo.dependencies);
        });
    });

    it("detects deletions of package.json files and removes them from cache", () => {
        // Initialize project with package.json
        const { project, host, projectService } = setup();
        projectService.openClientFile(tsConfig.path);
        assert.ok(project.packageJsonCache.get("/"));

        // Delete package.json
        host.reloadFS([tsConfig]);
        assert.isUndefined(project.packageJsonCache.get("/"));
    });

    it("finds package.json files not yet cached on demand when requested, then caches them", () => {
        // Initialize project with package.json but don’t load anything
        const { project } = setup([tsConfig, packageJson], /*openSomething*/ false);
        assert.isUndefined(project.packageJsonCache.get("/"));

        // Request package.json info for file path
        assert.lengthOf(project.getPackageJsonsVisibleToFile("/src/whatever/blah.ts"), 1);
        assert.ok(project.packageJsonCache.get("/"));
    });

    it("finds multiple package.json files when present", () => {
        // Initialize project with package.json at root
        const { project, host } = setup();
        // Add package.json in /src
        host.reloadFS([tsConfig, packageJson, { ...packageJson, path: "/src/package.json" }]);
        assert.lengthOf(project.getPackageJsonsVisibleToFile("/a.ts"), 1);
        assert.lengthOf(project.getPackageJsonsVisibleToFile("/src/b.ts"), 2);
    });

    function setup(files: readonly File[] = [tsConfig, packageJson], openSomething = true) {
        const host = createServerHost(files);
        const session = createSession(host);
        const projectService = session.getProjectService();
        if (openSomething) {
            projectService.openClientFile(files[0].path);
        }
        const project = configuredProjectAt(projectService, 0);
        return { host, session, project, projectService };
    }
}
