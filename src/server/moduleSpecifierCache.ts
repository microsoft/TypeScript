/*@internal*/
namespace ts.server {
    export interface ModuleSpecifierResolutionCacheHost {
        watchNodeModulesForPackageJsonChanges(directoryPath: string): FileWatcher;
    }

    export function createModuleSpecifierCache(host: ModuleSpecifierResolutionCacheHost): ModuleSpecifierCache {
        let containedNodeModulesWatchers: ESMap<string, FileWatcher> | undefined;
        let cache: ESMap<Path, ResolvedModuleSpecifierInfo> | undefined;
        let currentKey: string | undefined;
        const result: ModuleSpecifierCache = {
            get(fromFileName, toFileName, preferences) {
                if (!cache || currentKey !== key(fromFileName, preferences)) return undefined;
                return cache.get(toFileName);
            },
            set(fromFileName, toFileName, preferences, modulePaths, moduleSpecifiers) {
                ensureCache(fromFileName, preferences).set(toFileName, createInfo(modulePaths, moduleSpecifiers, /*isAutoImportable*/ true));

                // If any module specifiers were generated based off paths in node_modules,
                // a package.json file in that package was read and is an input to the cached.
                // Instead of watching each individual package.json file, set up a wildcard
                // directory watcher for any node_modules referenced and clear the cache when
                // it sees any changes.
                if (moduleSpecifiers) {
                    for (const p of modulePaths) {
                        if (p.isInNodeModules) {
                            // No trailing slash
                            const nodeModulesPath = p.path.substring(0, p.path.indexOf(nodeModulesPathPart) + nodeModulesPathPart.length - 1);
                            if (!containedNodeModulesWatchers?.has(nodeModulesPath)) {
                                (containedNodeModulesWatchers ||= new Map()).set(
                                    nodeModulesPath,
                                    host.watchNodeModulesForPackageJsonChanges(nodeModulesPath),
                                );
                            }
                        }
                    }
                }
            },
            setModulePaths(fromFileName, toFileName, preferences, modulePaths) {
                const cache = ensureCache(fromFileName, preferences);
                const info = cache.get(toFileName);
                if (info) {
                    info.modulePaths = modulePaths;
                }
                else {
                    cache.set(toFileName, createInfo(modulePaths, /*moduleSpecifiers*/ undefined, /*isAutoImportable*/ undefined));
                }
            },
            setIsAutoImportable(fromFileName, toFileName, preferences, isAutoImportable) {
                const cache = ensureCache(fromFileName, preferences);
                const info = cache.get(toFileName);
                if (info) {
                    info.isAutoImportable = isAutoImportable;
                }
                else {
                    cache.set(toFileName, createInfo(/*modulePaths*/ undefined, /*moduleSpecifiers*/ undefined, isAutoImportable));
                }
            },
            clear() {
                containedNodeModulesWatchers?.forEach(watcher => watcher.close());
                cache?.clear();
                containedNodeModulesWatchers?.clear();
                currentKey = undefined;
            },
            count() {
                return cache ? cache.size : 0;
            }
        };
        if (Debug.isDebugging) {
            Object.defineProperty(result, "__cache", { get: () => cache });
        }
        return result;

        function ensureCache(fromFileName: Path, preferences: UserPreferences) {
            const newKey = key(fromFileName, preferences);
            if (cache && (currentKey !== newKey)) {
                result.clear();
            }
            currentKey = newKey;
            return cache ||= new Map();
        }

        function key(fromFileName: Path, preferences: UserPreferences) {
            return `${fromFileName},${preferences.importModuleSpecifierEnding},${preferences.importModuleSpecifierPreference}`;
        }

        function createInfo(
            modulePaths: readonly ModulePath[] | undefined,
            moduleSpecifiers: readonly string[] | undefined,
            isAutoImportable: boolean | undefined,
        ): ResolvedModuleSpecifierInfo {
            return { modulePaths, moduleSpecifiers, isAutoImportable };
        }
    }
}
