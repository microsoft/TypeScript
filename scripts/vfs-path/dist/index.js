"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vfs_errors_1 = require("@typescript/vfs-errors");
const core = require("@typescript/vfs-core");
/**
 * Virtual path separator.
 */
exports.sep = "/";
/**
 * Normalize path separators.
 */
function normalizeSeparators(path) {
    return path.replace(/\s*[\\/]\s*/g, exports.sep).trim();
}
exports.normalizeSeparators = normalizeSeparators;
const invalidRootComponentRegExp = /^(?!(\/|\/\/\w+\/|[a-zA-Z]:\/?|)$)/;
const invalidNavigableComponentRegExp = /[:*?"<>|]/;
const invalidNonNavigableComponentRegExp = /^\.{1,2}$|[:*?"<>|]/;
var ValidationFlags;
(function (ValidationFlags) {
    ValidationFlags[ValidationFlags["None"] = 0] = "None";
    ValidationFlags[ValidationFlags["RequireRoot"] = 1] = "RequireRoot";
    ValidationFlags[ValidationFlags["RequireDirname"] = 2] = "RequireDirname";
    ValidationFlags[ValidationFlags["RequireBasename"] = 4] = "RequireBasename";
    ValidationFlags[ValidationFlags["RequireExtname"] = 8] = "RequireExtname";
    ValidationFlags[ValidationFlags["RequireTrailingSeparator"] = 16] = "RequireTrailingSeparator";
    ValidationFlags[ValidationFlags["AllowRoot"] = 32] = "AllowRoot";
    ValidationFlags[ValidationFlags["AllowDirname"] = 64] = "AllowDirname";
    ValidationFlags[ValidationFlags["AllowBasename"] = 128] = "AllowBasename";
    ValidationFlags[ValidationFlags["AllowExtname"] = 256] = "AllowExtname";
    ValidationFlags[ValidationFlags["AllowTrailingSeparator"] = 512] = "AllowTrailingSeparator";
    ValidationFlags[ValidationFlags["AllowNavigation"] = 1024] = "AllowNavigation";
    /** Path must be a valid directory root */
    ValidationFlags[ValidationFlags["Root"] = 545] = "Root";
    /** Path must be a absolute */
    ValidationFlags[ValidationFlags["Absolute"] = 2017] = "Absolute";
    /** Path may be relative or absolute */
    ValidationFlags[ValidationFlags["RelativeOrAbsolute"] = 2016] = "RelativeOrAbsolute";
    /** Path may only be a filename */
    ValidationFlags[ValidationFlags["Basename"] = 260] = "Basename";
})(ValidationFlags = exports.ValidationFlags || (exports.ValidationFlags = {}));
function valid(path, flags = 2016 /* RelativeOrAbsolute */) {
    return validateComponents(parse(path), flags, hasTrailingSeparator(path));
}
exports.valid = valid;
function validate(path, flags = 2016 /* RelativeOrAbsolute */) {
    const components = parse(path);
    const trailing = hasTrailingSeparator(path);
    if (!validateComponents(components, flags, trailing))
        throw new vfs_errors_1.IOError("ENOENT", "scandir", path);
    return components.length > 1 && trailing ? format(reduce(components)) + exports.sep : format(reduce(components));
}
exports.validate = validate;
function validateComponents(components, flags, hasTrailingSeparator) {
    const hasRoot = !!components[0];
    const hasDirname = components.length > 2;
    const hasBasename = components.length > 1;
    const hasExtname = hasBasename && extRegExp.test(components[components.length - 1]);
    const invalidComponentRegExp = flags & 1024 /* AllowNavigation */ ? invalidNavigableComponentRegExp : invalidNonNavigableComponentRegExp;
    // Validate required components
    if (flags & 1 /* RequireRoot */ && !hasRoot)
        return false;
    if (flags & 2 /* RequireDirname */ && !hasDirname)
        return false;
    if (flags & 4 /* RequireBasename */ && !hasBasename)
        return false;
    if (flags & 8 /* RequireExtname */ && !hasExtname)
        return false;
    if (flags & 16 /* RequireTrailingSeparator */ && !hasTrailingSeparator)
        return false;
    // Required components indicate allowed components
    if (flags & 1 /* RequireRoot */)
        flags |= 32 /* AllowRoot */;
    if (flags & 2 /* RequireDirname */)
        flags |= 64 /* AllowDirname */;
    if (flags & 4 /* RequireBasename */)
        flags |= 128 /* AllowBasename */;
    if (flags & 8 /* RequireExtname */)
        flags |= 256 /* AllowExtname */;
    if (flags & 16 /* RequireTrailingSeparator */)
        flags |= 512 /* AllowTrailingSeparator */;
    // Validate disallowed components
    if (~flags & 32 /* AllowRoot */ && hasRoot)
        return false;
    if (~flags & 64 /* AllowDirname */ && hasDirname)
        return false;
    if (~flags & 128 /* AllowBasename */ && hasBasename)
        return false;
    if (~flags & 256 /* AllowExtname */ && hasExtname)
        return false;
    if (~flags & 512 /* AllowTrailingSeparator */ && hasTrailingSeparator)
        return false;
    // Validate component strings
    if (invalidRootComponentRegExp.test(components[0]))
        return false;
    for (let i = 1; i < components.length; i++) {
        if (invalidComponentRegExp.test(components[i]))
            return false;
    }
    return true;
}
const absolutePathRegExp = /^[\\/]([\\/](.*?[\\/](.*?[\\/])?)?)?|^[a-zA-Z]:[\\/]?|^\w+:\/{2}[^\\/]*\/?/;
function getRootLength(path) {
    const match = absolutePathRegExp.exec(path);
    return match ? match[0].length : 0;
}
/**
 * Determines whether a path is an absolute path (e.g. starts with `/`, `\\`, or a dos path
 * like `c:`).
 */
function isAbsolute(path) {
    return absolutePathRegExp.test(path);
}
exports.isAbsolute = isAbsolute;
/**
 * Determines whether a path consists only of a path root.
 */
function isRoot(path) {
    const rootLength = getRootLength(path);
    return rootLength > 0 && rootLength === path.length;
}
exports.isRoot = isRoot;
const trailingSeperatorRegExp = /[\\/]$/;
/**
 * Determines whether a path has a trailing separator (`/`).
 */
function hasTrailingSeparator(path) {
    return trailingSeperatorRegExp.test(path) && !isRoot(path);
}
exports.hasTrailingSeparator = hasTrailingSeparator;
/**
 * Adds a trailing separator (`/`) to a path if it doesn't have one.
 */
function addTrailingSeparator(path) {
    return !trailingSeperatorRegExp.test(path) && path ? path + "/" : path;
}
exports.addTrailingSeparator = addTrailingSeparator;
/**
 * Removes a trailing separator (`/`) from a path if it has one.
 */
function removeTrailingSeparator(path) {
    return trailingSeperatorRegExp.test(path) && !isRoot(path) ? path.slice(0, -1) : path;
}
exports.removeTrailingSeparator = removeTrailingSeparator;
function reduce(components) {
    const normalized = [components[0]];
    for (let i = 1; i < components.length; i++) {
        const component = components[i];
        if (component === ".")
            continue;
        if (component === "..") {
            if (normalized.length > 1) {
                if (normalized[normalized.length - 1] !== "..") {
                    normalized.pop();
                    continue;
                }
            }
            else if (normalized[0])
                continue;
        }
        normalized.push(component);
    }
    return normalized;
}
/**
 * Normalize a path containing path traversal components (`.` or `..`).
 */
function normalize(path) {
    const components = reduce(parse(path));
    return components.length > 1 && hasTrailingSeparator(path) ? format(components) + exports.sep : format(components);
}
exports.normalize = normalize;
/**
 * Combines two or more paths. If a path is absolute, it replaces any previous path.
 */
function combine(path, ...paths) {
    path = normalizeSeparators(path);
    for (let name of paths) {
        name = normalizeSeparators(name);
        if (name.length === 0)
            continue;
        path = path.length === 0 || isAbsolute(name) ? name :
            addTrailingSeparator(path) + name;
    }
    return path;
}
exports.combine = combine;
/**
 * Combines and normalizes two or more paths.
 */
function resolve(path, ...paths) {
    return normalize(combine(path, ...paths));
}
exports.resolve = resolve;
function relativeWorker(from, to, stringEqualityComparer) {
    if (!isAbsolute(from))
        throw new Error("Path not absolute");
    if (!isAbsolute(to))
        throw new Error("Path not absolute");
    const fromComponents = reduce(parse(from));
    const toComponents = reduce(parse(to));
    let start;
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
function relativeCaseSensitive(from, to) {
    return relativeWorker(from, to, core.equateStringsCaseSensitive);
}
function relativeCaseInsensitive(from, to) {
    return relativeWorker(from, to, core.equateStringsCaseInsensitive);
}
/**
 * Gets a relative path that can be used to traverse between `from` and `to`.
 */
function relative(from, to, ignoreCase) {
    return ignoreCase ? relativeCaseInsensitive(from, to) : relativeCaseSensitive(from, to);
}
exports.relative = relative;
function compareWorker(a, b, stringComparer) {
    if (a === b)
        return 0;
    a = removeTrailingSeparator(a);
    b = removeTrailingSeparator(b);
    if (a === b)
        return 0;
    const aComponents = reduce(parse(a));
    const bComponents = reduce(parse(b));
    const len = Math.min(aComponents.length, bComponents.length);
    for (let i = 0; i < len; i++) {
        const result = stringComparer(aComponents[i], bComponents[i]);
        if (result !== 0)
            return result;
    }
    return core.compareNumbers(aComponents.length, bComponents.length);
}
/**
 * Performs a case-sensitive comparison of two paths.
 */
function compareCaseSensitive(a, b) {
    return compareWorker(a, b, core.compareStringsCaseSensitive);
}
exports.compareCaseSensitive = compareCaseSensitive;
/**
 * Performs a case-insensitive comparison of two paths.
 */
function compareCaseInsensitive(a, b) {
    return compareWorker(a, b, core.compareStringsCaseInsensitive);
}
exports.compareCaseInsensitive = compareCaseInsensitive;
/**
 * Compare two paths.
 */
function compare(a, b, ignoreCase) {
    return ignoreCase ? compareCaseInsensitive(a, b) : compareCaseSensitive(a, b);
}
exports.compare = compare;
/**
 * Determines whether two strings are equal.
 */
function equals(a, b, ignoreCase) {
    if (!isAbsolute(a))
        throw new Error("Path not absolute");
    if (!isAbsolute(b))
        throw new Error("Path not absolute");
    if (a === b)
        return true;
    a = removeTrailingSeparator(a);
    b = removeTrailingSeparator(b);
    if (a === b)
        return true;
    a = normalize(a);
    b = normalize(b);
    if (a === b)
        return true;
    return ignoreCase && a.toUpperCase() === b.toUpperCase();
}
exports.equals = equals;
function beneathWorker(ancestor, descendant, stringEqualityComparer) {
    if (!isAbsolute(ancestor))
        throw new Error("Path not absolute");
    if (!isAbsolute(descendant))
        throw new Error("Path not absolute");
    const ancestorComponents = reduce(parse(ancestor));
    const descendantComponents = reduce(parse(descendant));
    if (descendantComponents.length < ancestorComponents.length)
        return false;
    for (let i = 0; i < ancestorComponents.length; i++) {
        if (!stringEqualityComparer(ancestorComponents[i], descendantComponents[i])) {
            return false;
        }
    }
    return true;
}
function beneathCaseSensitive(ancestor, descendant) {
    return beneathWorker(ancestor, descendant, core.equateStringsCaseSensitive);
}
function beneathCaseInsensitive(ancestor, descendant) {
    return beneathWorker(ancestor, descendant, core.equateStringsCaseInsensitive);
}
/**
 * Determines whether the path `descendant` is beneath the path `ancestor`.
 */
function beneath(ancestor, descendant, ignoreCase) {
    return ignoreCase ? beneathCaseInsensitive(ancestor, descendant) : beneathCaseSensitive(ancestor, descendant);
}
exports.beneath = beneath;
/**
 * Parse a path into a root component and zero or more path segments.
 * If the path is relative, the root component is `""`.
 * If the path is absolute, the root component includes the first path separator (`/`).
 */
function parse(path) {
    path = normalizeSeparators(path);
    const rootLength = getRootLength(path);
    const root = path.substring(0, rootLength);
    const rest = path.substring(rootLength).split(/\/+/g);
    if (rest.length && !rest[rest.length - 1])
        rest.pop();
    return [root, ...rest.map(component => component.trim())];
}
exports.parse = parse;
/**
 * Formats a parsed path consisting of a root component and zero or more path segments.
 */
function format(components) {
    return components.length ? components[0] + components.slice(1).join(exports.sep) : "";
}
exports.format = format;
/**
 * Gets the parent directory name of a path.
 */
function dirname(path) {
    path = normalizeSeparators(path);
    path = removeTrailingSeparator(path);
    return path.substr(0, Math.max(getRootLength(path), path.lastIndexOf(exports.sep)));
}
exports.dirname = dirname;
function basename(path, extensions, ignoreCase) {
    path = normalizeSeparators(path);
    path = removeTrailingSeparator(path);
    const name = path.substr(Math.max(getRootLength(path), path.lastIndexOf(exports.sep) + 1));
    const extension = extensions !== undefined && ignoreCase !== undefined ? extname(path, extensions, ignoreCase) : undefined;
    return extension ? name.slice(0, name.length - extension.length) : name;
}
exports.basename = basename;
function extnameWorker(path, extensions, stringEqualityComparer) {
    const manyExtensions = Array.isArray(extensions) ? extensions : undefined;
    const singleExtension = Array.isArray(extensions) ? undefined : extensions;
    const length = manyExtensions ? manyExtensions.length : 1;
    for (let i = 0; i < length; i++) {
        let extension = manyExtensions ? manyExtensions[i] : singleExtension;
        if (!extension.startsWith("."))
            extension = "." + extension;
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
function extname(path, extensions, ignoreCase) {
    if (extensions) {
        return extnameWorker(path, extensions, ignoreCase ? core.equateStringsCaseInsensitive : core.equateStringsCaseSensitive);
    }
    const match = extRegExp.exec(path);
    return match ? match[0] : "";
}
exports.extname = extname;
function changeExtension(path, ext, extensions, ignoreCase) {
    const pathext = extensions !== undefined && ignoreCase !== undefined ? extname(path, extensions, ignoreCase) : extname(path);
    return pathext ? path.slice(0, path.length - pathext.length) + (ext.startsWith(".") ? ext : "." + ext) : path;
}
exports.changeExtension = changeExtension;
const typeScriptExtensions = [".ts", ".tsx"];
function isTypeScript(path) {
    return extname(path, typeScriptExtensions, /*ignoreCase*/ false).length > 0;
}
exports.isTypeScript = isTypeScript;
const javaScriptExtensions = [".js", ".jsx"];
function isJavaScript(path) {
    return extname(path, javaScriptExtensions, /*ignoreCase*/ false).length > 0;
}
exports.isJavaScript = isJavaScript;
function isDeclaration(path) {
    return extname(path, ".d.ts", /*ignoreCase*/ false).length > 0;
}
exports.isDeclaration = isDeclaration;
function isSourceMap(path) {
    return extname(path, ".map", /*ignoreCase*/ false).length > 0;
}
exports.isSourceMap = isSourceMap;
const javaScriptSourceMapExtensions = [".js.map", ".jsx.map"];
function isJavaScriptSourceMap(path) {
    return extname(path, javaScriptSourceMapExtensions, /*ignoreCase*/ false).length > 0;
}
exports.isJavaScriptSourceMap = isJavaScriptSourceMap;
function isJson(path) {
    return extname(path, ".json", /*ignoreCase*/ false).length > 0;
}
exports.isJson = isJson;
function isDefaultLibrary(path) {
    return isDeclaration(path)
        && basename(path).startsWith("lib.");
}
exports.isDefaultLibrary = isDefaultLibrary;

//# sourceMappingURL=index.js.map
