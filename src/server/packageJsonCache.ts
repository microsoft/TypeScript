/*@internal*/
namespace ts.server {
    export interface PackageJsonCache {
        addOrUpdate(fileName: Path): void;
        forEach(action: (info: PackageJsonInfo, fileName: Path) => void): void;
        delete(fileName: Path): void;
        get(fileName: Path): PackageJsonInfo | false | undefined;
        getInDirectory(directory: Path): PackageJsonInfo | undefined;
        directoryHasPackageJson(directory: Path): Ternary;
        searchDirectoryAndAncestors(directory: Path): void;
    }

    export function createPackageJsonCache(host: ProjectService): PackageJsonCache {
        const packageJsons = new Map<string, PackageJsonInfo>();
        const directoriesWithoutPackageJson = new Map<string, true>();
        return {
            addOrUpdate,
            forEach: packageJsons.forEach.bind(packageJsons),
            get: packageJsons.get.bind(packageJsons),
            delete: fileName => {
                packageJsons.delete(fileName);
                directoriesWithoutPackageJson.set(getDirectoryPath(fileName), true);
            },
            getInDirectory: directory => {
                return packageJsons.get(combinePaths(directory, "package.json")) || undefined;
            },
            directoryHasPackageJson,
            searchDirectoryAndAncestors: directory => {
                forEachAncestorDirectory(directory, ancestor => {
                    if (directoryHasPackageJson(ancestor) !== Ternary.Maybe) {
                        return true;
                    }
                    const packageJsonFileName = host.toPath(combinePaths(ancestor, "package.json"));
                    if (tryFileExists(host, packageJsonFileName)) {
                        addOrUpdate(packageJsonFileName);
                    }
                    else {
                        directoriesWithoutPackageJson.set(ancestor, true);
                    }
                });
            },
        };

        function addOrUpdate(fileName: Path) {
            const packageJsonInfo = createPackageJsonInfo(fileName, host.host);
            if (packageJsonInfo !== undefined) {
                packageJsons.set(fileName, packageJsonInfo);
                directoriesWithoutPackageJson.delete(getDirectoryPath(fileName));
            }
        }

        function directoryHasPackageJson(directory: Path) {
            return packageJsons.has(combinePaths(directory, "package.json")) ? Ternary.True :
                directoriesWithoutPackageJson.has(directory) ? Ternary.False :
                Ternary.Maybe;
        }
    }
}
