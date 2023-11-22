import {
    CharacterCodes,
    combinePaths,
    compareStringsCaseSensitive,
    CompilerOptions,
    Debug,
    deduplicate,
    equateStringsCaseSensitive,
    Extension,
    fileExtensionIs,
    flatMap,
    forEach,
    getBaseFileName,
    getDirectoryPath,
    getNormalizedAbsolutePath,
    getOwnKeys,
    getPathComponents,
    getProperty,
    hasJSFileExtension,
    mapDefined,
    MapLike,
    normalizePath,
    Path,
    readConfigFile,
    removeFileExtension,
    removeMinAndVersionNumbers,
    some,
    toFileNameLowerCase,
    TypeAcquisition,
    Version,
    versionMajorMinor,
} from "./_namespaces/ts";
import {
    stringifyIndented,
} from "./_namespaces/ts.server";

export interface TypingResolutionHost {
    directoryExists(path: string): boolean;
    fileExists(fileName: string): boolean;
    readFile(path: string, encoding?: string): string | undefined;
    readDirectory(rootDir: string, extensions: readonly string[], excludes: readonly string[] | undefined, includes: readonly string[] | undefined, depth?: number): string[];
}

interface PackageJson {
    dependencies?: MapLike<string>;
    devDependencies?: MapLike<string>;
    name?: string;
    optionalDependencies?: MapLike<string>;
    peerDependencies?: MapLike<string>;
    types?: string;
    typings?: string;
}

/** @internal */
export interface CachedTyping {
    typingLocation: string;
    version: Version;
}

/** @internal */
export function isTypingUpToDate(cachedTyping: CachedTyping, availableTypingVersions: MapLike<string>) {
    const availableVersion = new Version(getProperty(availableTypingVersions, `ts${versionMajorMinor}`) || getProperty(availableTypingVersions, "latest")!);
    return availableVersion.compareTo(cachedTyping.version) <= 0;
}

const unprefixedNodeCoreModuleList = [
    "assert",
    "assert/strict",
    "async_hooks",
    "buffer",
    "child_process",
    "cluster",
    "console",
    "constants",
    "crypto",
    "dgram",
    "diagnostics_channel",
    "dns",
    "dns/promises",
    "domain",
    "events",
    "fs",
    "fs/promises",
    "http",
    "https",
    "http2",
    "inspector",
    "module",
    "net",
    "os",
    "path",
    "perf_hooks",
    "process",
    "punycode",
    "querystring",
    "readline",
    "repl",
    "stream",
    "stream/promises",
    "string_decoder",
    "timers",
    "timers/promises",
    "tls",
    "trace_events",
    "tty",
    "url",
    "util",
    "util/types",
    "v8",
    "vm",
    "wasi",
    "worker_threads",
    "zlib",
];

/** @internal */
export const prefixedNodeCoreModuleList = unprefixedNodeCoreModuleList.map(name => `node:${name}`);

/** @internal */
export const nodeCoreModuleList: readonly string[] = [...unprefixedNodeCoreModuleList, ...prefixedNodeCoreModuleList];

/** @internal */
export const nodeCoreModules = new Set(nodeCoreModuleList);

/** @internal */
export function nonRelativeModuleNameForTypingCache(moduleName: string) {
    return nodeCoreModules.has(moduleName) ? "node" : moduleName;
}

/**
 * A map of loose file names to library names that we are confident require typings
 *
 * @internal
 */
export type SafeList = ReadonlyMap<string, string>;

/** @internal */
export function loadSafeList(host: TypingResolutionHost, safeListPath: Path): SafeList {
    const result = readConfigFile(safeListPath, path => host.readFile(path));
    return new Map(Object.entries<string>(result.config));
}

/** @internal */
export function loadTypesMap(host: TypingResolutionHost, typesMapPath: Path): SafeList | undefined {
    const result = readConfigFile(typesMapPath, path => host.readFile(path));
    if (result.config?.simpleMap) {
        return new Map(Object.entries<string>(result.config.simpleMap));
    }
    return undefined;
}

/**
 * @param host is the object providing I/O related operations.
 * @param fileNames are the file names that belong to the same project
 * @param projectRootPath is the path to the project root directory
 * @param safeListPath is the path used to retrieve the safe list
 * @param packageNameToTypingLocation is the map of package names to their cached typing locations and installed versions
 * @param typeAcquisition is used to customize the typing acquisition process
 * @param compilerOptions are used as a source for typing inference
 *
 * @internal
 */
export function discoverTypings(
    host: TypingResolutionHost,
    log: ((message: string) => void) | undefined,
    fileNames: string[],
    projectRootPath: Path,
    safeList: SafeList,
    packageNameToTypingLocation: ReadonlyMap<string, CachedTyping>,
    typeAcquisition: TypeAcquisition,
    unresolvedImports: readonly string[],
    typesRegistry: ReadonlyMap<string, MapLike<string>>,
    compilerOptions: CompilerOptions,
): { cachedTypingPaths: string[]; newTypingNames: string[]; filesToWatch: string[]; } {
    if (!typeAcquisition || !typeAcquisition.enable) {
        return { cachedTypingPaths: [], newTypingNames: [], filesToWatch: [] };
    }

    // A typing name to typing file path mapping
    const inferredTypings = new Map<string, string | false>();

    // Only infer typings for .js and .jsx files
    fileNames = mapDefined(fileNames, fileName => {
        const path = normalizePath(fileName);
        if (hasJSFileExtension(path)) {
            return path;
        }
    });

    const filesToWatch: string[] = [];

    if (typeAcquisition.include) addInferredTypings(typeAcquisition.include, "Explicitly included types");
    const exclude = typeAcquisition.exclude || [];

    // Directories to search for package.json, bower.json and other typing information
    if (!compilerOptions.types) {
        const possibleSearchDirs = new Set(fileNames.map(getDirectoryPath));
        possibleSearchDirs.add(projectRootPath);
        possibleSearchDirs.forEach(searchDir => {
            getTypingNames(searchDir, "bower.json", "bower_components", filesToWatch);
            getTypingNames(searchDir, "package.json", "node_modules", filesToWatch);
        });
    }

    if (!typeAcquisition.disableFilenameBasedTypeAcquisition) {
        getTypingNamesFromSourceFileNames(fileNames);
    }
    // add typings for unresolved imports
    if (unresolvedImports) {
        const module = deduplicate<string>(
            unresolvedImports.map(nonRelativeModuleNameForTypingCache),
            equateStringsCaseSensitive,
            compareStringsCaseSensitive,
        );
        addInferredTypings(module, "Inferred typings from unresolved imports");
    }
    // Remove typings that the user has added to the exclude list
    for (const excludeTypingName of exclude) {
        const didDelete = inferredTypings.delete(excludeTypingName);
        if (didDelete && log) log(`Typing for ${excludeTypingName} is in exclude list, will be ignored.`);
    }

    // Add the cached typing locations for inferred typings that are already installed
    packageNameToTypingLocation.forEach((typing, name) => {
        const registryEntry = typesRegistry.get(name);
        if (inferredTypings.get(name) === false && registryEntry !== undefined && isTypingUpToDate(typing, registryEntry)) {
            inferredTypings.set(name, typing.typingLocation);
        }
    });

    const newTypingNames: string[] = [];
    const cachedTypingPaths: string[] = [];
    inferredTypings.forEach((inferred, typing) => {
        if (inferred) {
            cachedTypingPaths.push(inferred);
        }
        else {
            newTypingNames.push(typing);
        }
    });
    const result = { cachedTypingPaths, newTypingNames, filesToWatch };
    if (log) log(`Finished typings discovery:${stringifyIndented(result)}`);
    return result;

    function addInferredTyping(typingName: string) {
        if (!inferredTypings.has(typingName)) {
            inferredTypings.set(typingName, false);
        }
    }
    function addInferredTypings(typingNames: readonly string[], message: string) {
        if (log) log(`${message}: ${JSON.stringify(typingNames)}`);
        forEach(typingNames, addInferredTyping);
    }

    /**
     * Adds inferred typings from manifest/module pairs (think package.json + node_modules)
     *
     * @param projectRootPath is the path to the directory where to look for package.json, bower.json and other typing information
     * @param manifestName is the name of the manifest (package.json or bower.json)
     * @param modulesDirName is the directory name for modules (node_modules or bower_components). Should be lowercase!
     * @param filesToWatch are the files to watch for changes. We will push things into this array.
     */
    function getTypingNames(projectRootPath: string, manifestName: string, modulesDirName: string, filesToWatch: string[]): void {
        // First, we check the manifests themselves. They're not
        // _required_, but they allow us to do some filtering when dealing
        // with big flat dep directories.
        const manifestPath = combinePaths(projectRootPath, manifestName);
        let manifest;
        let manifestTypingNames;
        if (host.fileExists(manifestPath)) {
            filesToWatch.push(manifestPath);
            manifest = readConfigFile(manifestPath, path => host.readFile(path)).config;
            manifestTypingNames = flatMap([manifest.dependencies, manifest.devDependencies, manifest.optionalDependencies, manifest.peerDependencies], getOwnKeys);
            addInferredTypings(manifestTypingNames, `Typing names in '${manifestPath}' dependencies`);
        }

        // Now we scan the directories for typing information in
        // already-installed dependencies (if present). Note that this
        // step happens regardless of whether a manifest was present,
        // which is certainly a valid configuration, if an unusual one.
        const packagesFolderPath = combinePaths(projectRootPath, modulesDirName);
        filesToWatch.push(packagesFolderPath);
        if (!host.directoryExists(packagesFolderPath)) {
            return;
        }

        // There's two cases we have to take into account here:
        // 1. If manifest is undefined, then we're not using a manifest.
        //    That means that we should scan _all_ dependencies at the top
        //    level of the modulesDir.
        // 2. If manifest is defined, then we can do some special
        //    filtering to reduce the amount of scanning we need to do.
        //
        // Previous versions of this algorithm checked for a `_requiredBy`
        // field in the package.json, but that field is only present in
        // `npm@>=3 <7`.

        // Package names that do **not** provide their own typings, so
        // we'll look them up.
        const packageNames: string[] = [];

        const dependencyManifestNames = manifestTypingNames
            // This is #1 described above.
            ? manifestTypingNames.map(typingName => combinePaths(packagesFolderPath, typingName, manifestName))
            // And #2. Depth = 3 because scoped packages look like `node_modules/@foo/bar/package.json`
            : host.readDirectory(packagesFolderPath, [Extension.Json], /*excludes*/ undefined, /*includes*/ undefined, /*depth*/ 3)
                .filter(manifestPath => {
                    if (getBaseFileName(manifestPath) !== manifestName) {
                        return false;
                    }
                    // It's ok to treat
                    // `node_modules/@foo/bar/package.json` as a manifest,
                    // but not `node_modules/jquery/nested/package.json`.
                    // We only assume depth 3 is ok for formally scoped
                    // packages. So that needs this dance here.
                    const pathComponents = getPathComponents(normalizePath(manifestPath));
                    const isScoped = pathComponents[pathComponents.length - 3][0] === "@";
                    return isScoped && toFileNameLowerCase(pathComponents[pathComponents.length - 4]) === modulesDirName || // `node_modules/@foo/bar`
                        !isScoped && toFileNameLowerCase(pathComponents[pathComponents.length - 3]) === modulesDirName; // `node_modules/foo`
                });

        if (log) log(`Searching for typing names in ${packagesFolderPath}; all files: ${JSON.stringify(dependencyManifestNames)}`);

        // Once we have the names of things to look up, we iterate over
        // and either collect their included typings, or add them to the
        // list of typings we need to look up separately.
        for (const manifestPath of dependencyManifestNames) {
            const normalizedFileName = normalizePath(manifestPath);
            const result = readConfigFile(normalizedFileName, (path: string) => host.readFile(path));
            const manifest: PackageJson = result.config;

            // If the package has its own d.ts typings, those will take precedence. Otherwise the package name will be used
            // to download d.ts files from DefinitelyTyped
            if (!manifest.name) {
                continue;
            }
            const ownTypes = manifest.types || manifest.typings;
            if (ownTypes) {
                const absolutePath = getNormalizedAbsolutePath(ownTypes, getDirectoryPath(normalizedFileName));
                if (host.fileExists(absolutePath)) {
                    if (log) log(`    Package '${manifest.name}' provides its own types.`);
                    inferredTypings.set(manifest.name, absolutePath);
                }
                else {
                    if (log) log(`    Package '${manifest.name}' provides its own types but they are missing.`);
                }
            }
            else {
                packageNames.push(manifest.name);
            }
        }

        addInferredTypings(packageNames, "    Found package names");
    }

    /**
     * Infer typing names from given file names. For example, the file name "jquery-min.2.3.4.js"
     * should be inferred to the 'jquery' typing name; and "angular-route.1.2.3.js" should be inferred
     * to the 'angular-route' typing name.
     * @param fileNames are the names for source files in the project
     */
    function getTypingNamesFromSourceFileNames(fileNames: string[]) {
        const fromFileNames = mapDefined(fileNames, j => {
            if (!hasJSFileExtension(j)) return undefined;

            const inferredTypingName = removeFileExtension(toFileNameLowerCase(getBaseFileName(j)));
            const cleanedTypingName = removeMinAndVersionNumbers(inferredTypingName);
            return safeList.get(cleanedTypingName);
        });
        if (fromFileNames.length) {
            addInferredTypings(fromFileNames, "Inferred typings from file names");
        }

        const hasJsxFile = some(fileNames, f => fileExtensionIs(f, Extension.Jsx));
        if (hasJsxFile) {
            if (log) log(`Inferred 'react' typings due to presence of '.jsx' extension`);
            addInferredTyping("react");
        }
    }
}

/** @internal */
export const enum NameValidationResult {
    Ok,
    EmptyName,
    NameTooLong,
    NameStartsWithDot,
    NameStartsWithUnderscore,
    NameContainsNonURISafeCharacters,
}

const maxPackageNameLength = 214;

/** @internal */
export interface ScopedPackageNameValidationResult {
    name: string;
    isScopeName: boolean;
    result: NameValidationResult;
}
/** @internal */
export type PackageNameValidationResult = NameValidationResult | ScopedPackageNameValidationResult;

/**
 * Validates package name using rules defined at https://docs.npmjs.com/files/package.json
 *
 * @internal
 */
export function validatePackageName(packageName: string): PackageNameValidationResult {
    return validatePackageNameWorker(packageName, /*supportScopedPackage*/ true);
}

function validatePackageNameWorker(packageName: string, supportScopedPackage: false): NameValidationResult;
function validatePackageNameWorker(packageName: string, supportScopedPackage: true): PackageNameValidationResult;
function validatePackageNameWorker(packageName: string, supportScopedPackage: boolean): PackageNameValidationResult {
    if (!packageName) {
        return NameValidationResult.EmptyName;
    }
    if (packageName.length > maxPackageNameLength) {
        return NameValidationResult.NameTooLong;
    }
    if (packageName.charCodeAt(0) === CharacterCodes.dot) {
        return NameValidationResult.NameStartsWithDot;
    }
    if (packageName.charCodeAt(0) === CharacterCodes._) {
        return NameValidationResult.NameStartsWithUnderscore;
    }
    // check if name is scope package like: starts with @ and has one '/' in the middle
    // scoped packages are not currently supported
    if (supportScopedPackage) {
        const matches = /^@([^/]+)\/([^/]+)$/.exec(packageName);
        if (matches) {
            const scopeResult = validatePackageNameWorker(matches[1], /*supportScopedPackage*/ false);
            if (scopeResult !== NameValidationResult.Ok) {
                return { name: matches[1], isScopeName: true, result: scopeResult };
            }
            const packageResult = validatePackageNameWorker(matches[2], /*supportScopedPackage*/ false);
            if (packageResult !== NameValidationResult.Ok) {
                return { name: matches[2], isScopeName: false, result: packageResult };
            }
            return NameValidationResult.Ok;
        }
    }
    if (encodeURIComponent(packageName) !== packageName) {
        return NameValidationResult.NameContainsNonURISafeCharacters;
    }
    return NameValidationResult.Ok;
}

/** @internal */
export function renderPackageNameValidationFailure(result: PackageNameValidationResult, typing: string): string {
    return typeof result === "object" ?
        renderPackageNameValidationFailureWorker(typing, result.result, result.name, result.isScopeName) :
        renderPackageNameValidationFailureWorker(typing, result, typing, /*isScopeName*/ false);
}

function renderPackageNameValidationFailureWorker(typing: string, result: NameValidationResult, name: string, isScopeName: boolean): string {
    const kind = isScopeName ? "Scope" : "Package";
    switch (result) {
        case NameValidationResult.EmptyName:
            return `'${typing}':: ${kind} name '${name}' cannot be empty`;
        case NameValidationResult.NameTooLong:
            return `'${typing}':: ${kind} name '${name}' should be less than ${maxPackageNameLength} characters`;
        case NameValidationResult.NameStartsWithDot:
            return `'${typing}':: ${kind} name '${name}' cannot start with '.'`;
        case NameValidationResult.NameStartsWithUnderscore:
            return `'${typing}':: ${kind} name '${name}' cannot start with '_'`;
        case NameValidationResult.NameContainsNonURISafeCharacters:
            return `'${typing}':: ${kind} name '${name}' contains non URI safe characters`;
        case NameValidationResult.Ok:
            return Debug.fail(); // Shouldn't have called this.
        default:
            Debug.assertNever(result);
    }
}
