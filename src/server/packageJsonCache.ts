/*@internal*/
namespace ts.server {
    export interface PackageJsonCache {
        addOrUpdate(fileName: Path): void;
        delete(fileName: Path): void;
        getInDirectory(directory: Path): PackageJsonInfo | undefined;
        directoryHasPackageJson(directory: Path): Ternary;
        searchDirectoryAndAncestors(directory: Path): void;
    }

    export function createPackageJsonCache(project: Project): PackageJsonCache {
        const packageJsons = createMap<PackageJsonInfo | false>();
        const directoriesWithoutPackageJson = createMap<true>();
        return {
            addOrUpdate,
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
                    const packageJsonFileName = project.toPath(combinePaths(ancestor, "package.json"));
                    if (tryFileExists(project, packageJsonFileName)) {
                        addOrUpdate(packageJsonFileName);
                    }
                    else {
                        directoriesWithoutPackageJson.set(ancestor, true);
                    }
                });
            },
        };

        function addOrUpdate(fileName: Path) {
            const packageJsonInfo = createPackageJsonInfo(fileName, project);
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
