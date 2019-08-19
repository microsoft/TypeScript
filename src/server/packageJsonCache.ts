/*@internal*/
namespace ts.server {
    export interface PackageJsonCache {
        addOrUpdate(fileName: string): void;
        delete(fileName: string): void;
        get(fileName: string): PackageJsonInfo | undefined;
        getInDirectory(directory: string): PackageJsonInfo | undefined;
        entries(): Iterator<[string, PackageJsonInfo]>;
        directoryHasPackageJson(directory: string): Ternary;
        searchDirectoryAndAncestors(directory: string): void;
    }

    export function createPackageJsonCache(project: Project): PackageJsonCache {
        const packageJsons = createMap<PackageJsonInfo>();
        const directoriesWithoutPackageJson = createMap<true>();
        return {
            addOrUpdate,
            delete: fileName => {
                packageJsons.delete(fileName);
                directoriesWithoutPackageJson.set(getDirectoryPath(fileName), true);
            },
            get: fileName => {
                return packageJsons.get(fileName);
            },
            getInDirectory: directory => {
                return packageJsons.get(combinePaths(directory, "package.json"));
            },
            entries: () => packageJsons.entries(),
            directoryHasPackageJson,
            searchDirectoryAndAncestors: directory => {
                forEachAncestorDirectory(directory, ancestor => {
                    if (directoryHasPackageJson(ancestor) !== Ternary.Maybe) {
                        return true;
                    }
                    const packageJsonFileName = combinePaths(ancestor, "package.json");
                    if (tryFileExists(project, packageJsonFileName)) {
                        addOrUpdate(packageJsonFileName);
                    }
                    else {
                        directoriesWithoutPackageJson.set(ancestor, true);
                    }
                });
            },
        };

        function addOrUpdate(fileName: string) {
            const packageJsonInfo = createPackageJsonInfo(fileName, project);
            if (packageJsonInfo) {
                packageJsons.set(fileName, packageJsonInfo);
                directoriesWithoutPackageJson.delete(getDirectoryPath(fileName));
            }
        }

        function directoryHasPackageJson(directory: string) {
            return packageJsons.has(combinePaths(directory, "package.json")) ? Ternary.True :
                directoriesWithoutPackageJson.has(directory) ? Ternary.False :
                Ternary.Maybe;
        }
    }
}
