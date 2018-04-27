namespace vpath {
    const invalidRootComponentRegExp = /^(?!(\/|\/\/\w+\/|[a-zA-Z]:\/?|)$)/;
    const invalidNavigableComponentRegExp = /[:*?"<>|]/;
    const invalidNonNavigableComponentRegExp = /^\.{1,2}$|[:*?"<>|]/;

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

        /** Path must be a valid directory root */
        Root = RequireRoot | AllowRoot | AllowTrailingSeparator,

        /** Path must be a absolute */
        Absolute = RequireRoot | AllowRoot | AllowDirname | AllowBasename | AllowExtname | AllowTrailingSeparator | AllowNavigation,

        /** Path may be relative or absolute */
        RelativeOrAbsolute = AllowRoot | AllowDirname | AllowBasename | AllowExtname | AllowTrailingSeparator | AllowNavigation,

        /** Path may only be a filename */
        Basename = RequireBasename | AllowExtname,
    }

    export function valid(path: string, flags: ValidationFlags = ValidationFlags.RelativeOrAbsolute) {
        return validateComponents(parse(path), flags, hasTrailingSeparator(path));
    }

    export function validate(path: string, flags: ValidationFlags = ValidationFlags.RelativeOrAbsolute) {
        const components = parse(path);
        const trailing = hasTrailingSeparator(path);
        if (!validateComponents(components, flags, trailing)) throw vfs.createIOError("ENOENT");
        return components.length > 1 && trailing ? format(reduce(components)) + sep : format(reduce(components));
    }

    function validateComponents(components: string[], flags: ValidationFlags, hasTrailingSeparator: boolean) {
        const hasRoot = !!components[0];
        const hasDirname = components.length > 2;
        const hasBasename = components.length > 1;
        const hasExtname = hasBasename && extRegExp.test(components[components.length - 1]);
        const invalidComponentRegExp = flags & ValidationFlags.AllowNavigation ? invalidNavigableComponentRegExp : invalidNonNavigableComponentRegExp;

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

    import getRootLength = ts.getRootLength;

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
    export import format = ts.getNormalizedPathFromPathComponents;

    /**
     * Combines and normalizes two paths.
     */
    export function resolve(path1: string, path2: string) {
        return normalize(combine(path1, path2));
    }

    // NOTE: this differs from `ts.getRelativePathToDirectoryOrUrl` in that it requires both paths
    // are already absolute and does not perform "canonicalization".
    function relativeWorker(from: string, to: string, stringEqualityComparer: (a: string, b: string) => boolean) {
        if (!isAbsolute(from)) throw new Error("Path not absolute");
        if (!isAbsolute(to)) throw new Error("Path not absolute");

        const fromComponents = reduce(parse(from));
        const toComponents = reduce(parse(to));

        let start: number;
        for (start = 0; start < fromComponents.length && start < toComponents.length; start++) {
            if (!stringEqualityComparer(fromComponents[start], toComponents[start])) {
                break;
            }
        }

        if (start === 0 || (start === 1 && fromComponents[0] === "/")) {
            return format(toComponents);
        }

        const components = toComponents.slice(start);
        for (; start < fromComponents.length; start++) {
            components.unshift("..");
        }

        return format(["", ...components]);
    }

    function relativeCaseSensitive(from: string, to: string) {
        return relativeWorker(from, to, ts.equateStringsCaseSensitive);
    }

    function relativeCaseInsensitive(from: string, to: string) {
        return relativeWorker(from, to, ts.equateStringsCaseInsensitive);
    }

    /**
     * Gets a relative path that can be used to traverse between `from` and `to`.
     */
    // NOTE: this differs from `ts.getRelativePathToDirectoryOrUrl` in that it requires both paths
    // are already absolute and does not perform "canonicalization".
    export function relative(from: string, to: string, ignoreCase: boolean) {
        return ignoreCase ? relativeCaseInsensitive(from, to) : relativeCaseSensitive(from, to);
    }

    // NOTE: this differs from `ts.comparePaths` due to the behavior of `parse`.
    function compareWorker(a: string, b: string, stringComparer: (a: string, b: string) => number) {
        if (a === b) return 0;
        a = removeTrailingSeparator(a);
        b = removeTrailingSeparator(b);
        if (a === b) return 0;
        const aComponents = reduce(parse(a));
        const bComponents = reduce(parse(b));
        const len = Math.min(aComponents.length, bComponents.length);
        for (let i = 0; i < len; i++) {
            const result = stringComparer(aComponents[i], bComponents[i]);
            if (result !== 0) return result;
        }
        return ts.compareValues(aComponents.length, bComponents.length);
    }

    /**
     * Performs a case-sensitive comparison of two paths.
     */
    export function compareCaseSensitive(a: string, b: string) {
        return compareWorker(a, b, ts.compareStringsCaseSensitive);
    }

    /**
     * Performs a case-insensitive comparison of two paths.
     */
    export function compareCaseInsensitive(a: string, b: string) {
        return compareWorker(a, b, ts.compareStringsCaseInsensitive);
    }

    /**
     * Compare two paths.
     */
    // NOTE: this differs from `ts.comparePaths` due to the behavior of `parse`.
    export function compare(a: string, b: string, ignoreCase: boolean) {
        return ignoreCase ? compareCaseInsensitive(a, b) : compareCaseSensitive(a, b);
    }

    /**
     * Determines whether two paths are equal.
     */
    export function equals(a: string, b: string, ignoreCase: boolean) {
        if (!isAbsolute(a)) throw new Error("Path not absolute");
        if (!isAbsolute(b)) throw new Error("Path not absolute");
        if (a === b) return true;
        a = removeTrailingSeparator(a);
        b = removeTrailingSeparator(b);
        if (a === b) return true;
        a = normalize(a);
        b = normalize(b);
        if (a === b) return true;
        return ignoreCase && a.toUpperCase() === b.toUpperCase();
    }

    // NOTE: this differs from `ts.containsPath` due to the behavior of `parse`.
    function beneathWorker(ancestor: string, descendant: string, stringEqualityComparer: (a: string, b: string) => boolean) {
        if (!isAbsolute(ancestor)) throw new Error("Path not absolute");
        if (!isAbsolute(descendant)) throw new Error("Path not absolute");
        const ancestorComponents = reduce(parse(ancestor));
        const descendantComponents = reduce(parse(descendant));
        if (descendantComponents.length < ancestorComponents.length) return false;
        for (let i = 0; i < ancestorComponents.length; i++) {
            if (!stringEqualityComparer(ancestorComponents[i], descendantComponents[i])) {
                return false;
            }
        }
        return true;
    }

    function beneathCaseSensitive(ancestor: string, descendant: string) {
        return beneathWorker(ancestor, descendant, ts.equateStringsCaseSensitive);
    }

    function beneathCaseInsensitive(ancestor: string, descendant: string) {
        return beneathWorker(ancestor, descendant, ts.equateStringsCaseInsensitive);
    }

    /**
     * Determines whether the path `descendant` is beneath the path `ancestor`.
     */
    // NOTE: this differs from `containsPath` in compiler/core.ts due to the behavior of `parse`.
    export function beneath(ancestor: string, descendant: string, ignoreCase: boolean) {
        return ignoreCase ? beneathCaseInsensitive(ancestor, descendant) : beneathCaseSensitive(ancestor, descendant);
    }

    /**
     * Gets the parent directory name of a path.
     */
    // NOTE: this differs from `ts.getDirectoryPath` due to the behavior of `getRootLength`.
    export function dirname(path: string) {
        path = normalizeSeparators(path);
        path = removeTrailingSeparator(path);
        return path.substr(0, Math.max(getRootLength(path), path.lastIndexOf(sep)));
    }

    /**
     * Gets the portion of a path following the last separator (`/`).
     */
    export function basename(path: string): string;
    /**
     * Gets the portion of a path following the last separator (`/`).
     * If the base name has any one of the provided extensions, it is removed.
     */
    export function basename(path: string, extensions: string | ReadonlyArray<string>, ignoreCase: boolean): string;
    // NOTE: this differs from `ts.getBaseFileName` in that this function handles extensions in a
    // fashion similar to the NodeJS `path.basename` function as well as handles case sensitivity.
    export function basename(path: string, extensions?: string | ReadonlyArray<string>, ignoreCase?: boolean) {
        path = normalizeSeparators(path);
        path = removeTrailingSeparator(path);
        const name = path.substr(Math.max(getRootLength(path), path.lastIndexOf(sep) + 1));
        const extension = extensions !== undefined && ignoreCase !== undefined ? extname(path, extensions, ignoreCase) : undefined;
        return extension ? name.slice(0, name.length - extension.length) : name;
    }

    function extnameWorker(path: string, extensions: string | ReadonlyArray<string>, stringEqualityComparer: (a: string, b: string) => boolean) {
        const manyExtensions = Array.isArray(extensions) ? extensions : undefined;
        const singleExtension = Array.isArray(extensions) ? undefined : extensions;
        const length = manyExtensions ? manyExtensions.length : 1;
        for (let i = 0; i < length; i++) {
            let extension = manyExtensions ? manyExtensions[i] : singleExtension;
            if (!extension.startsWith(".")) extension = "." + extension;
            if (path.length >= extension.length && path.charAt(path.length - extension.length) === ".") {
                const pathExtension = path.slice(path.length - extension.length);
                if (stringEqualityComparer(pathExtension, extension)) {
                    return pathExtension;
                }
            }
        }
        return "";
    }

    const extRegExp = /\.\w+$/;

    /**
     * Gets the file extension for a path.
     */
    export function extname(path: string): string;
    /**
     * Gets the file extension for a path, provided it is one of the provided extensions.
     */
    export function extname(path: string, extensions: string | ReadonlyArray<string>, ignoreCase: boolean): string;
    // NOTE: this differs from `ts.getAnyExtensionFromPath` in that this function allows you to
    // restrict extensions and handle case sensitivity
    export function extname(path: string, extensions?: string | ReadonlyArray<string>, ignoreCase?: boolean) {
        if (extensions) {
            return extnameWorker(path, extensions, ignoreCase ? ts.equateStringsCaseInsensitive : ts.equateStringsCaseSensitive);
        }

        const match = extRegExp.exec(path);
        return match ? match[0] : "";
    }

    export function changeExtension(path: string, ext: string): string;
    export function changeExtension(path: string, ext: string, extensions: string | ReadonlyArray<string>, ignoreCase: boolean): string;
    // NOTE: this differs from `ts.changeExtension` in that this function allows you to
    // specify extensions and handle case sensitivity
    export function changeExtension(path: string, ext: string, extensions?: string | ReadonlyArray<string>, ignoreCase?: boolean) {
        const pathext = extensions !== undefined && ignoreCase !== undefined ? extname(path, extensions, ignoreCase) : extname(path);
        return pathext ? path.slice(0, path.length - pathext.length) + (ext.startsWith(".") ? ext : "." + ext) : path;
    }

    const typeScriptExtensions: ReadonlyArray<string> = [".ts", ".tsx"];

    export function isTypeScript(path: string) {
        return extname(path, typeScriptExtensions, /*ignoreCase*/ false).length > 0;
    }

    const javaScriptExtensions: ReadonlyArray<string> = [".js", ".jsx"];

    export function isJavaScript(path: string) {
        return extname(path, javaScriptExtensions, /*ignoreCase*/ false).length > 0;
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
}