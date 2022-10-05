/*@internal*/
namespace ts.server {
export interface PackageJsonCache {
    addOrUpdate(fileName: ts.Path): void;
    forEach(action: (info: ts.ProjectPackageJsonInfo, fileName: ts.Path) => void): void;
    delete(fileName: ts.Path): void;
    get(fileName: ts.Path): ts.ProjectPackageJsonInfo | false | undefined;
    getInDirectory(directory: ts.Path): ts.ProjectPackageJsonInfo | undefined;
    directoryHasPackageJson(directory: ts.Path): ts.Ternary;
    searchDirectoryAndAncestors(directory: ts.Path): void;
}

export function createPackageJsonCache(host: ts.server.ProjectService): PackageJsonCache {
    const packageJsons = new ts.Map<string, ts.ProjectPackageJsonInfo>();
    const directoriesWithoutPackageJson = new ts.Map<string, true>();
    return {
        addOrUpdate,
        forEach: packageJsons.forEach.bind(packageJsons),
        get: packageJsons.get.bind(packageJsons),
        delete: fileName => {
            packageJsons.delete(fileName);
            directoriesWithoutPackageJson.set(ts.getDirectoryPath(fileName), true);
        },
        getInDirectory: directory => {
            return packageJsons.get(ts.combinePaths(directory, "package.json")) || undefined;
        },
        directoryHasPackageJson,
        searchDirectoryAndAncestors: directory => {
            ts.forEachAncestorDirectory(directory, ancestor => {
                if (directoryHasPackageJson(ancestor) !== ts.Ternary.Maybe) {
                    return true;
                }
                const packageJsonFileName = host.toPath(ts.combinePaths(ancestor, "package.json"));
                if (ts.tryFileExists(host, packageJsonFileName)) {
                    addOrUpdate(packageJsonFileName);
                }
                else {
                    directoriesWithoutPackageJson.set(ancestor, true);
                }
            });
        },
    };

    function addOrUpdate(fileName: ts.Path) {
        const packageJsonInfo = ts.Debug.checkDefined(ts.createPackageJsonInfo(fileName, host.host));
        packageJsons.set(fileName, packageJsonInfo);
        directoriesWithoutPackageJson.delete(ts.getDirectoryPath(fileName));
    }

    function directoryHasPackageJson(directory: ts.Path) {
        return packageJsons.has(ts.combinePaths(directory, "package.json")) ? ts.Ternary.True :
            directoriesWithoutPackageJson.has(directory) ? ts.Ternary.False :
            ts.Ternary.Maybe;
    }
}
}
