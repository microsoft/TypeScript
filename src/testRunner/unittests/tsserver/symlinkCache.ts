import * as ts from "../../_namespaces/ts.js";
import {
    baselineTsserverLogs,
    openFilesForSession,
    TestSession,
} from "../helpers/tsserver.js";
import {
    File,
    SymLink,
    TestServerHost,
} from "../helpers/virtualFileSystemWithWatch.js";

describe("unittests:: tsserver:: symlinkCache::", () => {
    it("contains symlinks discovered by project references resolution after program creation", () => {
        const appTsconfigJson: File = {
            path: "/home/src/projects/project/packages/app/tsconfig.json",
            content: `
        {
            "compilerOptions": {
                "module": "commonjs",
                "outDir": "dist",
                "rootDir": "src",
                "baseUrl": "."
            }
            "references": [{ "path": "../dep" }]
        }`,
        };

        const appSrcIndexTs: File = {
            path: "/home/src/projects/project/packages/app/src/index.ts",
            content: `import "dep/does/not/exist";`,
        };

        const depPackageJson: File = {
            path: "/home/src/projects/project/packages/dep/package.json",
            content: `{ "name": "dep", "main": "dist/index.js", "types": "dist/index.d.ts" }`,
        };

        const depTsconfigJson: File = {
            path: "/home/src/projects/project/packages/dep/tsconfig.json",
            content: `
        {
            "compilerOptions": { "outDir": "dist", "rootDir": "src", "module": "commonjs" }
        }`,
        };

        const depSrcIndexTs: File = {
            path: "/home/src/projects/project/packages/dep/src/index.ts",
            content: `
        import "./sub/folder";`,
        };

        const depSrcSubFolderIndexTs: File = {
            path: "/home/src/projects/project/packages/dep/src/sub/folder/index.ts",
            content: `export const dep = 0;`,
        };

        const link: SymLink = {
            path: "/home/src/projects/project/packages/app/node_modules/dep",
            symLink: "../../dep",
        };
        const host = TestServerHost.createServerHost([
            appTsconfigJson,
            appSrcIndexTs,
            depPackageJson,
            depTsconfigJson,
            depSrcIndexTs,
            depSrcSubFolderIndexTs,
            link,
        ]);
        const session = new TestSession(host);
        openFilesForSession([appSrcIndexTs], session);
        const project = session.getProjectService().configuredProjects.get(appTsconfigJson.path)!;
        session.logger.log(`Symlinked directories: ${JSON.stringify(project.getSymlinkCache()?.getSymlinkedDirectories()?.get(link.path + "/" as ts.Path), undefined, " ")}`);
        baselineTsserverLogs("symlinkCache", "contains symlinks discovered by project references resolution after program creation", session);
    });

    it("works for paths close to the root", () => {
        const cache = ts.createSymlinkCache("/", ts.createGetCanonicalFileName(/*useCaseSensitiveFileNames*/ false));
        // Used to crash, #44953
        const map = ts.createModeAwareCache<ts.ResolvedTypeReferenceDirectiveWithFailedLookupLocations>();
        map.set("foo", /*mode*/ undefined, {
            resolvedTypeReferenceDirective: {
                primary: true,
                originalPath: "/foo",
                resolvedFileName: "/one/two/foo",
            },
        });
        cache.setSymlinksFromResolutions(ts.noop, ts.noop, map);
    });
});
