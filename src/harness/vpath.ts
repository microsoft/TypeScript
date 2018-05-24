namespace vpath {
    export import sep = ts.directorySeparator;
    export import normalizeSeparators = ts.normalizeSlashes;
    export import isAbsolute = ts.isRootedDiskPath;
    export import isRoot = ts.isDiskPathRoot;
    export import hasTrailingSeparator = ts.hasTrailingDirectorySeparator;
    export import addTrailingSeparator = ts.ensureTrailingDirectorySeparator;
    export import removeTrailingSeparator = ts.removeTrailingDirectorySeparator;
    export import normalize = ts.normalizePath;
    export import combine = ts.combinePaths;
    export import parse = ts.getPathComponents;
    export import reduce = ts.reducePathComponents;
    export import format = ts.getPathFromPathComponents;
    export import resolve = ts.resolvePath;
    export import compare = ts.comparePaths;
    export import compareCaseSensitive = ts.comparePathsCaseSensitive;
    export import compareCaseInsensitive = ts.comparePathsCaseInsensitive;
    export import dirname = ts.getDirectoryPath;
    export import basename = ts.getBaseFileName;
    export import extname = ts.getAnyExtensionFromPath;
    export import relative = ts.getRelativePathFromDirectory;
    export import beneath = ts.containsPath;
    export import changeExtension = ts.changeAnyExtension;
    export import isTypeScript = ts.hasTypeScriptFileExtension;
    export import isJavaScript = ts.hasJavaScriptFileExtension;

    const invalidRootComponentRegExp = /^(?!(\/|\/\/\w+\/|[a-zA-Z]:\/?|)$)/;
    const invalidNavigableComponentRegExp = /[:*?"<>|]/;
    const invalidNavigableComponentWithWildcardsRegExp = /[:"<>|]/;
    const invalidNonNavigableComponentRegExp = /^\.{1,2}$|[:*?"<>|]/;
    const invalidNonNavigableComponentWithWildcardsRegExp = /^\.{1,2}$|[:"<>|]/;
    const extRegExp = /\.\w+$/;

    export const enum ValidationFlags {
        None = 0,

        RequireRoot = 1 << 0,
        RequireDirname = 1 << 1,
        RequireBasename = 1 << 2,
        RequireExtname = 1 << 3,
        RequireTrailingSeparator = 1 << 4,

        AllowRoot = 1 << 5,
        AllowDirname = 1 << 6,
        AllowBasename = 1 << 7,
        AllowExtname = 1 << 8,
        AllowTrailingSeparator = 1 << 9,
        AllowNavigation = 1 << 10,
        AllowWildcard = 1 << 11,

        /** Path must be a valid directory root */
        Root = RequireRoot | AllowRoot | AllowTrailingSeparator,

        /** Path must be a absolute */
        Absolute = RequireRoot | AllowRoot | AllowDirname | AllowBasename | AllowExtname | AllowTrailingSeparator | AllowNavigation,

        /** Path may be relative or absolute */
        RelativeOrAbsolute = AllowRoot | AllowDirname | AllowBasename | AllowExtname | AllowTrailingSeparator | AllowNavigation,

        /** Path may only be a filename */
        Basename = RequireBasename | AllowExtname,
    }

    function validateComponents(components: string[], flags: ValidationFlags, hasTrailingSeparator: boolean) {
        const hasRoot = !!components[0];
        const hasDirname = components.length > 2;
        const hasBasename = components.length > 1;
        const hasExtname = hasBasename && extRegExp.test(components[components.length - 1]);
        const invalidComponentRegExp = flags & ValidationFlags.AllowNavigation
            ? flags & ValidationFlags.AllowWildcard ? invalidNavigableComponentWithWildcardsRegExp : invalidNavigableComponentRegExp
            : flags & ValidationFlags.AllowWildcard ? invalidNonNavigableComponentWithWildcardsRegExp : invalidNonNavigableComponentRegExp;

        // Validate required components
        if (flags & ValidationFlags.RequireRoot && !hasRoot) return false;
        if (flags & ValidationFlags.RequireDirname && !hasDirname) return false;
        if (flags & ValidationFlags.RequireBasename && !hasBasename) return false;
        if (flags & ValidationFlags.RequireExtname && !hasExtname) return false;
        if (flags & ValidationFlags.RequireTrailingSeparator && !hasTrailingSeparator) return false;

        // Required components indicate allowed components
        if (flags & ValidationFlags.RequireRoot) flags |= ValidationFlags.AllowRoot;
        if (flags & ValidationFlags.RequireDirname) flags |= ValidationFlags.AllowDirname;
        if (flags & ValidationFlags.RequireBasename) flags |= ValidationFlags.AllowBasename;
        if (flags & ValidationFlags.RequireExtname) flags |= ValidationFlags.AllowExtname;
        if (flags & ValidationFlags.RequireTrailingSeparator) flags |= ValidationFlags.AllowTrailingSeparator;

        // Validate disallowed components
        if (~flags & ValidationFlags.AllowRoot && hasRoot) return false;
        if (~flags & ValidationFlags.AllowDirname && hasDirname) return false;
        if (~flags & ValidationFlags.AllowBasename && hasBasename) return false;
        if (~flags & ValidationFlags.AllowExtname && hasExtname) return false;
        if (~flags & ValidationFlags.AllowTrailingSeparator && hasTrailingSeparator) return false;

        // Validate component strings
        if (invalidRootComponentRegExp.test(components[0])) return false;
        for (let i = 1; i < components.length; i++) {
            if (invalidComponentRegExp.test(components[i])) return false;
        }

        return true;
    }

    export function validate(path: string, flags: ValidationFlags = ValidationFlags.RelativeOrAbsolute) {
        const components = parse(path);
        const trailing = hasTrailingSeparator(path);
        if (!validateComponents(components, flags, trailing)) throw vfs.createIOError("ENOENT");
        return components.length > 1 && trailing ? format(reduce(components)) + sep : format(reduce(components));
    }

    export function isDeclaration(path: string) {
        return extname(path, ".d.ts", /*ignoreCase*/ false).length > 0;
    }

    export function isSourceMap(path: string) {
        return extname(path, ".map", /*ignoreCase*/ false).length > 0;
    }

    const javaScriptSourceMapExtensions: ReadonlyArray<string> = [".js.map", ".jsx.map"];

    export function isJavaScriptSourceMap(path: string) {
        return extname(path, javaScriptSourceMapExtensions, /*ignoreCase*/ false).length > 0;
    }

    export function isJson(path: string) {
        return extname(path, ".json", /*ignoreCase*/ false).length > 0;
    }

    export function isDefaultLibrary(path: string) {
        return isDeclaration(path)
            && basename(path).startsWith("lib.");
    }

    export function isTsConfigFile(path: string): boolean {
        return path.indexOf("tsconfig") !== -1 && path.indexOf("json") !== -1;
    }
}