// /// <reference path="./harness.ts" />

// NOTE: The contents of this file are all exported from the namespace 'vpath'. This is to
//       support the eventual conversion of harness into a modular system.

// NOTE: Some of the functions here duplicate functionality from compiler/core.ts. They have been
//       added to reduce the number of direct dependencies on compiler and services to eventually
//       break away from depending directly on the compiler to speed up compilation time.

namespace vpath {
    const module = require("@typescript/vfs-path");
    vpath.sep = module.sep;
    vpath.normalizeSeparators = module.normalizeSeparators;
    (<any>vpath).ValidationFlags = module.ValidationFlags;
    vpath.valid = module.valid;
    vpath.validate = module.validate;
    vpath.isAbsolute = module.isAbsolute;
    vpath.hasTrailingSeparator = module.hasTrailingSeparator;
    vpath.addTrailingSeparator = module.addTrailingSeparator;
    vpath.removeTrailingSeparator = module.removeTrailingSeparator;
    vpath.normalize = module.normalize;
    vpath.combine = module.combine;
    vpath.resolve = module.resolve;
    vpath.relative = module.relative;
    vpath.compareCaseSensitive = module.compareCaseSensitive;
    vpath.compareCaseInsensitive = module.compareCaseInsensitive;
    vpath.compare = module.compare;
    vpath.equals = module.equals;
    vpath.beneath = module.beneath;
    vpath.parse = module.parse;
    vpath.format = module.format;
    vpath.dirname = module.dirname;
    vpath.basename = module.basename;
    vpath.extname = module.extname;
    vpath.changeExtension = module.changeExtension;
}

declare module "vpath_" {
    import * as vpath_ from "@typescript/vfs-path";
    global {
        namespace vpath {
            export import sep = vpath_.sep;
            export import normalizeSeparators = vpath_.normalizeSeparators;
            export import ValidationFlags = vpath_.ValidationFlags;
            export import valid = vpath_.valid;
            export import validate = vpath_.validate;
            export import isAbsolute = vpath_.isAbsolute;
            export import hasTrailingSeparator = vpath_.hasTrailingSeparator;
            export import addTrailingSeparator = vpath_.addTrailingSeparator;
            export import removeTrailingSeparator = vpath_.removeTrailingSeparator;
            export import normalize = vpath_.normalize;
            export import combine = vpath_.combine;
            export import resolve = vpath_.resolve;
            export import relative = vpath_.relative;
            export import compareCaseSensitive = vpath_.compareCaseSensitive;
            export import compareCaseInsensitive = vpath_.compareCaseInsensitive;
            export import compare = vpath_.compare;
            export import equals = vpath_.equals;
            export import beneath = vpath_.beneath;
            export import parse = vpath_.parse;
            export import format = vpath_.format;
            export import dirname = vpath_.dirname;
            export import basename = vpath_.basename;
            export import extname = vpath_.extname;
            export import changeExtension = vpath_.changeExtension;
        }
    }
}
// /// <reference path="./harness.ts" />

// // NOTE: The contents of this file are all exported from the namespace 'vpath'. This is to
// //       support the eventual conversion of harness into a modular system.

// // NOTE: Some of the functions here duplicate functionality from compiler/core.ts. They have been
// //       added to reduce the number of direct dependencies on compiler and services to eventually
// //       break away from depending directly on the compiler to speed up compilation time.

// namespace vpath {

//     /**
//      * Virtual path separator.
//      */
//     export const sep = "/";

//     /**
//      * Normalize path separators.
//      */
//     export function normalizeSeparators(path: string): string {
//         return path.replace(/\s*[\\/]\s*/g, sep).trim();
//     }

//     const rootRegExp = /^[\\/]([\\/](.*?[\\/](.*?[\\/])?)?)?|^[a-zA-Z]:[\\/]?|^\w+:\/{2}[^\\/]*\/?/;

//     function getRootLength(path: string) {
//         const match = rootRegExp.exec(path);
//         return match ? match[0].length : 0;
//     }

//     /**
//      * Determines whether a path is an absolute path (e.g. starts with `/`, `\\`, or a dos path
//      * like `c:`).
//      */
//     export function isAbsolute(path: string) {
//         return rootRegExp.test(path);
//     }

//     const trailingSeperatorRegExp = /[\\/]$/;

//     /**
//      * Determines whether a path has a trailing separator (`/`).
//      */
//     export function hasTrailingSeparator(path: string) {
//         return trailingSeperatorRegExp.test(path);
//     }

//     /**
//      * Adds a trailing separator (`/`) to a path if it doesn't have one.
//      */
//     export function addTrailingSeparator(path: string) {
//         return hasTrailingSeparator(path) ? path : path + "/";
//     }

//     /**
//      * Removes a trailing separator (`/`) from a path if it has one.
//      */
//     export function removeTrailingSeparator(path: string) {
//         return hasTrailingSeparator(path) ? path.slice(0, -1) : path;
//     }

//     function reduce(components: ReadonlyArray<string>) {
//         const normalized = [components[0]];
//         for (let i = 1; i < components.length; i++) {
//             const component = components[i];
//             if (component === ".") continue;
//             if (component === ".." && normalized.length > 0 && normalized[normalized.length - 1] !== "..") {
//                 normalized.pop();
//             }
//             else {
//                 normalized.push(component);
//             }
//         }
//         return normalized;
//     }

//     /**
//      * Normalize a path containing path traversal components (`.` or `..`).
//      */
//     export function normalize(path: string): string {
//         const components = reduce(parse(path));
//         return components.length > 1 && hasTrailingSeparator(path) ? format(components) + sep : format(components);
//     }

//     /**
//      * Combines two or more paths. If a path is absolute, it replaces any previous path.
//      */
//     export function combine(path: string, ...paths: string[]) {
//         path = normalizeSeparators(path);
//         for (let name of paths) {
//             name = normalizeSeparators(name);
//             if (name.length === 0) continue;
//             path = path.length === 0 || isAbsolute(name) ? name :
//                 addTrailingSeparator(path) + name;
//         }
//         return path;
//     }

//     /**
//      * Combines and normalizes two or more paths.
//      */
//     export function resolve(path: string, ...paths: string[]) {
//         return normalize(combine(path, ...paths));
//     }

//     function relativeWorker(from: string, to: string, stringEqualityComparer: core.EqualityComparer<string>) {
//         if (!isAbsolute(from)) throw new Error("Path not absolute");
//         if (!isAbsolute(to)) throw new Error("Path not absolute");

//         const fromComponents = reduce(parse(from));
//         const toComponents = reduce(parse(to));

//         let start: number;
//         for (start = 0; start < fromComponents.length && start < toComponents.length; start++) {
//             if (!stringEqualityComparer(fromComponents[start], toComponents[start])) {
//                 break;
//             }
//         }

//         if (start === 0 || (start === 1 && fromComponents[0] === "/")) {
//             return format(toComponents);
//         }

//         const components = toComponents.slice(start);
//         for (; start < fromComponents.length; start++) {
//             components.unshift("..");
//         }

//         return format(["", ...components]);
//     }

//     function relativeCaseSensitive(from: string, to: string) {
//         return relativeWorker(from, to, core.equateStringsCaseSensitive);
//     }

//     function relativeCaseInsensitive(from: string, to: string) {
//         return relativeWorker(from, to, core.equateStringsCaseInsensitive);
//     }

//     /**
//      * Gets a relative path that can be used to traverse between `from` and `to`.
//      */
//     export function relative(from: string, to: string, ignoreCase: boolean) {
//         return ignoreCase ? relativeCaseInsensitive(from, to) : relativeCaseSensitive(from, to);
//     }

//     function compareWorker(a: string, b: string, stringComparer: core.Comparer<string>) {
//         if (a === b) return 0;
//         a = removeTrailingSeparator(a);
//         b = removeTrailingSeparator(b);
//         if (a === b) return 0;
//         const aComponents = reduce(parse(a));
//         const bComponents = reduce(parse(b));
//         const len = Math.min(aComponents.length, bComponents.length);
//         for (let i = 0; i < len; i++) {
//             const result = stringComparer(aComponents[i], bComponents[i]);
//             if (result !== 0) return result;
//         }
//         return core.compareNumbers(aComponents.length, bComponents.length);
//     }

//     /**
//      * Performs a case-sensitive comparison of two paths.
//      */
//     export function compareCaseSensitive(a: string, b: string) {
//         return compareWorker(a, b, core.compareStringsCaseSensitive);
//     }

//     /**
//      * Performs a case-insensitive comparison of two paths.
//      */
//     export function compareCaseInsensitive(a: string, b: string) {
//         return compareWorker(a, b, core.compareStringsCaseInsensitive);
//     }

//     /**
//      * Compare two paths.
//      */
//     export function compare(a: string, b: string, ignoreCase: boolean) {
//         return ignoreCase ? compareCaseInsensitive(a, b) : compareCaseSensitive(a, b);
//     }

//     /**
//      * Determines whether two strings are equal.
//      */
//     export function equals(a: string, b: string, ignoreCase: boolean) {
//         if (!isAbsolute(a)) throw new Error("Path not absolute");
//         if (!isAbsolute(b)) throw new Error("Path not absolute");
//         if (a === b) return true;
//         a = removeTrailingSeparator(a);
//         b = removeTrailingSeparator(b);
//         if (a === b) return true;
//         a = normalize(a);
//         b = normalize(b);
//         if (a === b) return true;
//         return ignoreCase && a.toUpperCase() === b.toUpperCase();
//     }

//     function beneathWorker(ancestor: string, descendant: string, stringEqualityComparer: ts.EqualityComparer<string>) {
//         if (!isAbsolute(ancestor)) throw new Error("Path not absolute");
//         if (!isAbsolute(descendant)) throw new Error("Path not absolute");
//         const ancestorComponents = reduce(parse(ancestor));
//         const descendantComponents = reduce(parse(descendant));
//         if (descendantComponents.length < ancestorComponents.length) return false;
//         for (let i = 0; i < ancestorComponents.length; i++) {
//             if (!stringEqualityComparer(ancestorComponents[i], descendantComponents[i])) {
//                 return false;
//             }
//         }
//         return true;
//     }

//     function beneathCaseSensitive(ancestor: string, descendant: string) {
//         return beneathWorker(ancestor, descendant, core.equateStringsCaseSensitive);
//     }

//     function beneathCaseInsensitive(ancestor: string, descendant: string) {
//         return beneathWorker(ancestor, descendant, core.equateStringsCaseInsensitive);
//     }

//     /**
//      * Determines whether the path `descendant` is beneath the path `ancestor`.
//      */
//     export function beneath(ancestor: string, descendant: string, ignoreCase: boolean) {
//         return ignoreCase ? beneathCaseInsensitive(ancestor, descendant) : beneathCaseSensitive(ancestor, descendant);
//     }

//     /**
//      * Parse a path into a root component and zero or more path segments.
//      * If the path is relative, the root component is `""`.
//      * If the path is absolute, the root component includes the first path separator (`/`).
//      */
//     export function parse(path: string) {
//         path = normalizeSeparators(path);
//         const rootLength = getRootLength(path);
//         const root = path.substring(0, rootLength);
//         const rest = path.substring(rootLength).split(/\/+/g);
//         if (rest.length && !rest[rest.length - 1]) rest.pop();
//         return [root, ...rest.map(component => component.trim())];
//     }

//     /**
//      * Formats a parsed path consisting of a root component and zero or more path segments.
//      */
//     export function format(components: ReadonlyArray<string>) {
//         return components.length ? components[0] + components.slice(1).join(sep) : "";
//     }

//     /**
//      * Gets the parent directory name of a path.
//      */
//     export function dirname(path: string) {
//         path = normalizeSeparators(path);
//         return path.substr(0, Math.max(getRootLength(path), path.lastIndexOf(sep)));
//     }

//     /**
//      * Gets the portion of a path following the last separator (`/`).
//      */
//     export function basename(path: string): string;
//     /**
//      * Gets the portion of a path following the last separator (`/`).
//      * If the base name has any one of the provided extensions, it is removed.
//      */
//     export function basename(path: string, extensions: string | ReadonlyArray<string>, ignoreCase: boolean): string;
//     export function basename(path: string, extensions?: string | ReadonlyArray<string>, ignoreCase?: boolean) {
//         path = normalizeSeparators(path);
//         const name = path.substr(Math.max(getRootLength(path), path.lastIndexOf(sep) + 1));
//         const extension = extensions ? extname(path, extensions, ignoreCase) : undefined;
//         return extension ? name.slice(0, name.length - extension.length) : name;
//     }

//     function extnameWorker(path: string, extensions: string | ReadonlyArray<string>, stringEqualityComparer: core.EqualityComparer<string>) {
//         const manyExtensions = Array.isArray(extensions) ? extensions : undefined;
//         const singleExtension = Array.isArray(extensions) ? undefined : extensions;
//         const length = manyExtensions ? manyExtensions.length : 1;
//         for (let i = 0; i < length; i++) {
//             let extension = manyExtensions ? manyExtensions[i] : singleExtension;
//             if (!extension.startsWith(".")) extension = "." + extension;
//             if (path.length >= extension.length && path.charAt(path.length - extension.length) === ".") {
//                 const pathExtension = path.slice(path.length - extension.length);
//                 if (stringEqualityComparer(pathExtension, extension)) {
//                     return pathExtension;
//                 }
//             }
//         }
//         return "";
//     }

//     const extRegExp = /\.\w+$/;

//     /**
//      * Gets the file extension for a path.
//      */
//     export function extname(path: string): string;
//     /**
//      * Gets the file extension for a path, provided it is one of the provided extensions.
//      */
//     export function extname(path: string, extensions: string | ReadonlyArray<string>, ignoreCase: boolean): string;
//     export function extname(path: string, extensions?: string | ReadonlyArray<string>, ignoreCase?: boolean) {
//         if (extensions) {
//             return extnameWorker(path, extensions, ignoreCase ? core.equateStringsCaseInsensitive : core.equateStringsCaseSensitive);
//         }

//         const match = extRegExp.exec(path);
//         return match ? match[0] : "";
//     }

//     export function changeExtension(path: string, ext: string): string;
//     export function changeExtension(path: string, ext: string, extensions: string | ReadonlyArray<string>, ignoreCase: boolean): string;
//     export function changeExtension(path: string, ext: string, extensions?: string | ReadonlyArray<string>, ignoreCase?: boolean) {
//         const pathext = extensions ? extname(path, extensions, ignoreCase) : extname(path);
//         return pathext ? path.slice(0, path.length - pathext.length) + (ext.startsWith(".") ? ext : "." + ext) : path;
//     }

//     const typeScriptExtensions: ReadonlyArray<string> = [".ts", ".tsx"];

//     export function isTypeScript(path: string) {
//         return extname(path, typeScriptExtensions, /*ignoreCase*/ false).length > 0;
//     }

//     const javaScriptExtensions: ReadonlyArray<string> = [".js", ".jsx"];

//     export function isJavaScript(path: string) {
//         return extname(path, javaScriptExtensions, /*ignoreCase*/ false).length > 0;
//     }

//     export function isDeclaration(path: string) {
//         return extname(path, ".d.ts", /*ignoreCase*/ false).length > 0;
//     }

//     export function isSourceMap(path: string) {
//         return extname(path, ".map", /*ignoreCase*/ false).length > 0;
//     }

//     const javaScriptSourceMapExtensions: ReadonlyArray<string> = [".js.map", ".jsx.map"];

//     export function isJavaScriptSourceMap(path: string) {
//         return extname(path, javaScriptSourceMapExtensions, /*ignoreCase*/ false).length > 0;
//     }

//     export function isJson(path: string) {
//         return extname(path, ".json", /*ignoreCase*/ false).length > 0;
//     }

//     export function isDefaultLibrary(path: string) {
//         return isDeclaration(path)
//             && basename(path).startsWith("lib.");
//     }
// }