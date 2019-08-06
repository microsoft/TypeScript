/*@internal*/
namespace ts.server {
    export interface PackageJsonInfo {
        dependencies?: Map<string>;
        devDependencies?: Map<string>;
        peerDependencies?: Map<string>;
        optionalDependencies?: Map<string>;
    }

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
            const packageJsonInfo = tryReadPackageJson(project, fileName);
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

    function tryReadPackageJson(host: LanguageServiceHost, fileName: string): PackageJsonInfo | undefined {
        const readFile = host.readFile ? host.readFile.bind(host) : sys.readFile;
        type PackageJson = Record<typeof dependencyKeys[number], Record<string, string> | undefined>;
        const dependencyKeys = ["dependencies", "devDependencies", "optionalDependencies", "peerDependencies"] as const;
        try {
            const content = JSON.parse(readFile(fileName)) as PackageJson;
            const info: PackageJsonInfo = {};
            for (const key of dependencyKeys) {
                const dependencies = content[key];
                if (!dependencies) {
                    continue;
                }
                const dependencyMap = createMap<string>();
                for (const packageName in dependencies) {
                    dependencyMap.set(packageName, dependencies[packageName]);
                }
                info[key] = dependencyMap;
            }
            return info;
        }
        catch {
            return undefined;
        }
    }
}
