import * as ts from "../../_namespaces/ts";

const tsConfig: ts.projectSystem.File = {
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
const packageJson: ts.projectSystem.File = {
    path: "/package.json",
    content: JSON.stringify(packageJsonContent, undefined, 2)
};

describe("unittests:: tsserver:: packageJsonInfo", () => {
    it("detects new package.json files that are added, caches them, and watches them", () => {
        // Initialize project without package.json
        const { projectService, host } = setup([tsConfig]);
        assert.isUndefined(projectService.packageJsonCache.getInDirectory("/" as ts.Path));

        // Add package.json
        host.writeFile(packageJson.path, packageJson.content);
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
        packageJsonInfo = projectService.packageJsonCache.getInDirectory("/" as ts.Path)!;
        assert.isUndefined(packageJsonInfo.dependencies);
    });

    it("finds package.json on demand, watches for deletion, and removes them from cache", () => {
        // Initialize project with package.json
        const { projectService, host } = setup();
        projectService.getPackageJsonsVisibleToFile("/src/whatever/blah.ts" as ts.Path);
        assert.ok(projectService.packageJsonCache.getInDirectory("/" as ts.Path));

        // Delete package.json
        host.deleteFile(packageJson.path);
        assert.isUndefined(projectService.packageJsonCache.getInDirectory("/" as ts.Path));
    });

    it("finds multiple package.json files when present", () => {
        // Initialize project with package.json at root
        const { projectService, host } = setup();
        // Add package.json in /src
        host.writeFile("/src/package.json", packageJson.content);
        assert.lengthOf(projectService.getPackageJsonsVisibleToFile("/a.ts" as ts.Path), 1);
        assert.lengthOf(projectService.getPackageJsonsVisibleToFile("/src/b.ts" as ts.Path), 2);
    });

    it("handles errors in json parsing of package.json", () => {
        const packageJsonContent = `{ "mod" }`;
        const { projectService, host } = setup([tsConfig, { path: packageJson.path, content: packageJsonContent }]);
        projectService.getPackageJsonsVisibleToFile("/src/whatever/blah.ts" as ts.Path);
        const packageJsonInfo = projectService.packageJsonCache.getInDirectory("/" as ts.Path)!;
        assert.isFalse(packageJsonInfo.parseable);

        host.writeFile(packageJson.path, packageJson.content);
        projectService.getPackageJsonsVisibleToFile("/src/whatever/blah.ts" as ts.Path);
        const packageJsonInfo2 = projectService.packageJsonCache.getInDirectory("/" as ts.Path)!;
        assert.ok(packageJsonInfo2);
        assert.ok(packageJsonInfo2.dependencies);
        assert.ok(packageJsonInfo2.devDependencies);
        assert.ok(packageJsonInfo2.peerDependencies);
        assert.ok(packageJsonInfo2.optionalDependencies);
    });

    it("handles empty package.json", () => {
        const packageJsonContent = "";
        const { projectService, host } = setup([tsConfig, { path: packageJson.path, content: packageJsonContent }]);
        projectService.getPackageJsonsVisibleToFile("/src/whatever/blah.ts" as ts.Path);
        const packageJsonInfo = projectService.packageJsonCache.getInDirectory("/" as ts.Path)!;
        assert.isFalse(packageJsonInfo.parseable);

        host.writeFile(packageJson.path, packageJson.content);
        projectService.getPackageJsonsVisibleToFile("/src/whatever/blah.ts" as ts.Path);
        const packageJsonInfo2 = projectService.packageJsonCache.getInDirectory("/" as ts.Path)!;
        assert.ok(packageJsonInfo2);
        assert.ok(packageJsonInfo2.dependencies);
        assert.ok(packageJsonInfo2.devDependencies);
        assert.ok(packageJsonInfo2.peerDependencies);
        assert.ok(packageJsonInfo2.optionalDependencies);
    });
});

function setup(files: readonly ts.projectSystem.File[] = [tsConfig, packageJson]) {
    const host = ts.projectSystem.createServerHost(files);
    const session = ts.projectSystem.createSession(host);
    const projectService = session.getProjectService();
    projectService.openClientFile(files[0].path);
    const project = ts.projectSystem.configuredProjectAt(projectService, 0);
    return { host, session, project, projectService };
}
