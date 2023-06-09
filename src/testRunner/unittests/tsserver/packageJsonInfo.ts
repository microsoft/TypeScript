import { createLoggerWithInMemoryLogs } from "../../../harness/tsserverLogger";
import * as ts from "../../_namespaces/ts";
import {
    baselineTsserverLogs,
    createSession,
    openFilesForSession,
} from "../helpers/tsserver";
import {
    createServerHost,
    File,
} from "../helpers/virtualFileSystemWithWatch";

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

describe("unittests:: tsserver:: packageJsonInfo::", () => {
    it("detects new package.json files that are added, caches them, and watches them", () => {
        // Initialize project without package.json
        const { session, projectService, host } = setup([tsConfig]);
        assert.isUndefined(projectService.packageJsonCache.getInDirectory("/" as ts.Path));

        // Add package.json
        host.writeFile(packageJson.path, packageJson.content);
        session.testhost.baselineHost("Add package.json");
        let packageJsonInfo = projectService.packageJsonCache.getInDirectory("/" as ts.Path)!;
        assert.ok(packageJsonInfo);
        assert.ok(packageJsonInfo.dependencies);
        assert.ok(packageJsonInfo.devDependencies);
        assert.ok(packageJsonInfo.peerDependencies);
        assert.ok(packageJsonInfo.optionalDependencies);

        // Edit package.json
        host.writeFile(packageJson.path, JSON.stringify({
            ...packageJsonContent,
            dependencies: undefined
        }));
        session.testhost.baselineHost("Edit package.json");
        packageJsonInfo = projectService.packageJsonCache.getInDirectory("/" as ts.Path)!;
        assert.isUndefined(packageJsonInfo.dependencies);

        baselineTsserverLogs("packageJsonInfo", "detects new package.json files that are added, caches them, and watches them", session);
    });

    it("finds package.json on demand, watches for deletion, and removes them from cache", () => {
        // Initialize project with package.json
        const { session , projectService, host } = setup();
        projectService.getPackageJsonsVisibleToFile("/src/whatever/blah.ts" as ts.Path);
        assert.ok(projectService.packageJsonCache.getInDirectory("/" as ts.Path));

        // Delete package.json
        host.deleteFile(packageJson.path);
        session.testhost.baselineHost("delete packageJson");
        assert.isUndefined(projectService.packageJsonCache.getInDirectory("/" as ts.Path));
        baselineTsserverLogs("packageJsonInfo", "finds package.json on demand, watches for deletion, and removes them from cache", session);
    });

    it("finds multiple package.json files when present", () => {
        // Initialize project with package.json at root
        const { session, projectService, host } = setup();
        // Add package.json in /src
        host.writeFile("/src/package.json", packageJson.content);
        session.testhost.baselineHost("packageJson");
        assert.lengthOf(projectService.getPackageJsonsVisibleToFile("/a.ts" as ts.Path), 1);
        assert.lengthOf(projectService.getPackageJsonsVisibleToFile("/src/b.ts" as ts.Path), 2);
        baselineTsserverLogs("packageJsonInfo", "finds multiple package.json files when present", session);
    });

    it("handles errors in json parsing of package.json", () => {
        const packageJsonContent = `{ "mod" }`;
        const { session, projectService, host } = setup([tsConfig, { path: packageJson.path, content: packageJsonContent }]);
        projectService.getPackageJsonsVisibleToFile("/src/whatever/blah.ts" as ts.Path);
        const packageJsonInfo = projectService.packageJsonCache.getInDirectory("/" as ts.Path)!;
        assert.isFalse(packageJsonInfo.parseable);

        host.writeFile(packageJson.path, packageJson.content);
        session.testhost.baselineHost("packageJson");
        projectService.getPackageJsonsVisibleToFile("/src/whatever/blah.ts" as ts.Path);
        const packageJsonInfo2 = projectService.packageJsonCache.getInDirectory("/" as ts.Path)!;
        assert.ok(packageJsonInfo2);
        assert.ok(packageJsonInfo2.dependencies);
        assert.ok(packageJsonInfo2.devDependencies);
        assert.ok(packageJsonInfo2.peerDependencies);
        assert.ok(packageJsonInfo2.optionalDependencies);
        baselineTsserverLogs("packageJsonInfo", "handles errors in json parsing of package.json", session);
    });

    it("handles empty package.json", () => {
        const packageJsonContent = "";
        const { session, projectService, host } = setup([tsConfig, { path: packageJson.path, content: packageJsonContent }]);
        projectService.getPackageJsonsVisibleToFile("/src/whatever/blah.ts" as ts.Path);
        const packageJsonInfo = projectService.packageJsonCache.getInDirectory("/" as ts.Path)!;
        assert.isFalse(packageJsonInfo.parseable);

        host.writeFile(packageJson.path, packageJson.content);
        session.testhost.baselineHost("PackageJson");
        projectService.getPackageJsonsVisibleToFile("/src/whatever/blah.ts" as ts.Path);
        const packageJsonInfo2 = projectService.packageJsonCache.getInDirectory("/" as ts.Path)!;
        assert.ok(packageJsonInfo2);
        assert.ok(packageJsonInfo2.dependencies);
        assert.ok(packageJsonInfo2.devDependencies);
        assert.ok(packageJsonInfo2.peerDependencies);
        assert.ok(packageJsonInfo2.optionalDependencies);
        baselineTsserverLogs("packageJsonInfo", "handles empty package.json", session);
    });
});

function setup(files: readonly File[] = [tsConfig, packageJson]) {
    const host = createServerHost(files);
    const session = createSession(host, { logger: createLoggerWithInMemoryLogs(host) });
    openFilesForSession([files[0]], session);
    return { host, session, projectService: session.getProjectService() };
}
