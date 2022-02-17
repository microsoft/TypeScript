namespace ts.projectSystem {
    const appTsconfigJson: File = {
        path: "/packages/app/tsconfig.json",
        content: `
        {
            "compilerOptions": {
                "module": "commonjs",
                "outDir": "dist",
                "rootDir": "src",
                "baseUrl": "."
            }
            "references": [{ "path": "../dep" }]
        }`
    };

    const appSrcIndexTs: File = {
        path: "/packages/app/src/index.ts",
        content: `import "dep/does/not/exist";`
    };

    const depPackageJson: File = {
        path: "/packages/dep/package.json",
        content: `{ "name": "dep", "main": "dist/index.js", "types": "dist/index.d.ts" }`
    };

    const depTsconfigJson: File = {
        path: "/packages/dep/tsconfig.json",
        content: `
        {
            "compilerOptions": { "outDir": "dist", "rootDir": "src", "module": "commonjs" }
        }`
    };

    const depSrcIndexTs: File = {
        path: "/packages/dep/src/index.ts",
        content: `
        import "./sub/folder";`
    };

    const depSrcSubFolderIndexTs: File = {
        path: "/packages/dep/src/sub/folder/index.ts",
        content: `export const dep = 0;`
    };

    const link: SymLink = {
        path: "/packages/app/node_modules/dep",
        symLink: "../../dep",
    };

    describe("unittests:: tsserver:: symlinkCache", () => {
        it("contains symlinks discovered by project references resolution after program creation", () => {
            const { session, projectService } = setup();
            openFilesForSession([appSrcIndexTs], session);
            const project = projectService.configuredProjects.get(appTsconfigJson.path)!;
            assert.deepEqual(
                project.getSymlinkCache()?.getSymlinkedDirectories()?.get(link.path + "/" as Path),
                { real: "/packages/dep/", realPath: "/packages/dep/" as Path }
            );
        });

        it("works for paths close to the root", () => {
            const cache = createSymlinkCache("/", createGetCanonicalFileName(/*useCaseSensitiveFileNames*/ false));
            // Used to crash, #44953
            const map = createModeAwareCache<ResolvedTypeReferenceDirective | undefined>();
            map.set("foo", /*mode*/ undefined, {
                primary: true,
                originalPath: "/foo",
                resolvedFileName: "/one/two/foo",
            });
            cache.setSymlinksFromResolutions([], map);
        });
    });

    function setup() {
        const host = createServerHost([
            appTsconfigJson,
            appSrcIndexTs,
            depPackageJson,
            depTsconfigJson,
            depSrcIndexTs,
            depSrcSubFolderIndexTs,
            link,
        ]);
        const session = createSession(host);
        const projectService = session.getProjectService();
        return {
            host,
            projectService,
            session,
        };
    }
}
