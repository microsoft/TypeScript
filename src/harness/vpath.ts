/// <reference path="./harness.ts" />
namespace vpath {
    // NOTE: Some of the functions here duplicate functionality from compiler/core.ts. They have been added
    //       to reduce the number of direct dependencies on compiler and services to eventually break away
    //       from depending directly on the compiler to speed up compilation time.

    import compareValues = collections.compareValues;
    import compareStrings = collections.compareStrings;

    export const sep = "/";

    export function normalizeSeparators(path: string): string {
        return path.replace(/\s*[\\/]\s*/g, sep).trim();
    }

    const rootRegExp = /^[\\/]([\\/](.*?[\\/](.*?[\\/])?)?)?|^[a-zA-Z]:[\\/]?|^\w+:\/{2}[^\\/]*\/?/;

    function getRootLength(path: string) {
        const match = rootRegExp.exec(path);
        return match ? match[0].length : 0;
    }

    export function isAbsolute(path: string) {
        return rootRegExp.test(path);
    }

    const trailingSeperatorRegExp = /[\\/]$/;

    export function hasTrailingSeparator(path: string) {
        return trailingSeperatorRegExp.test(path);
    }

    export function addTrailingSeparator(path: string) {
        return hasTrailingSeparator(path) ? path : path + "/";
    }

    export function removeTrailingSeparator(path: string) {
        return hasTrailingSeparator(path) ? path.slice(0, -1) : path;
    }

    function reduce(components: string[]) {
        const normalized = [components[0]];
        for (let i = 1; i < components.length; i++) {
            const component = components[i];
            if (component === ".") continue;
            if (component === ".." && normalized.length > 0 && normalized[normalized.length - 1] !== "..") {
                normalized.pop();
            }
            else {
                normalized.push(component);
            }
        }
        return normalized;
    }

    export function normalize(path: string): string {
        const components = reduce(parse(path));
        return components.length > 1 && hasTrailingSeparator(path) ? format(components) + sep : format(components);
    }

    export function combine(path: string, ...paths: string[]) {
        path = normalizeSeparators(path);
        for (let name of paths) {
            name = normalizeSeparators(name);
            if (name.length === 0) continue;
            path = path.length === 0 || isAbsolute(name) ? name :
                addTrailingSeparator(path) + name;
        }
        return path;
    }

    export function resolve(path: string, ...paths: string[]) {
        return normalize(combine(path, ...paths));
    }

    export function relative(from: string, to: string, ignoreCase: boolean) {
        if (!isAbsolute(from)) throw new Error("Path not absolute");
        if (!isAbsolute(to)) throw new Error("Path not absolute");

        const fromComponents = reduce(parse(from));
        const toComponents = reduce(parse(to));

        let start: number;
        for (start = 0; start < fromComponents.length && start < toComponents.length; start++) {
            if (compareStrings(fromComponents[start], toComponents[start], ignoreCase)) {
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

    export namespace relative {
        export function caseSensitive(from: string, to: string) { return relative(from, to, /*ignoreCase*/ false); }
        export function caseInsensitive(from: string, to: string) { return relative(from, to, /*ignoreCase*/ true); }
    }

    export function compare(a: string, b: string, ignoreCase: boolean) {
        if (!isAbsolute(a)) throw new Error("Path not absolute");
        if (!isAbsolute(b)) throw new Error("Path not absolute");
        if (a === b) return 0;
        a = removeTrailingSeparator(a);
        b = removeTrailingSeparator(b);
        if (a === b) return 0;
        const aComponents = reduce(parse(a));
        const bComponents = reduce(parse(b));
        const len = Math.min(aComponents.length, bComponents.length);
        for (let i = 0; i < len; i++) {
            const result = compareStrings(aComponents[i], bComponents[i], ignoreCase);
            if (result !== 0) return result;
        }
        return compareValues(aComponents.length, bComponents.length);
    }

    export namespace compare {
        export function caseSensitive(a: string, b: string) { return compare(a, b, /*ignoreCase*/ false); }
        export function caseInsensitive(a: string, b: string) { return compare(a, b, /*ignoreCase*/ true); }
    }

    export function equals(a: string, b: string, ignoreCase: boolean) {
        return compare(a, b, ignoreCase) === 0;
    }

    export namespace equals {
        export function caseSensitive(a: string, b: string) { return equals(a, b, /*ignoreCase*/ false); }
        export function caseInsensitive(a: string, b: string) { return equals(a, b, /*ignoreCase*/ true); }
    }

    export function beneath(ancestor: string, descendant: string, ignoreCase: boolean) {
        if (!isAbsolute(ancestor)) throw new Error("Path not absolute");
        if (!isAbsolute(descendant)) throw new Error("Path not absolute");

        const ancestorComponents = reduce(parse(ancestor));
        const descendantComponents = reduce(parse(descendant));
        const len = Math.min(ancestorComponents.length, descendantComponents.length);
        let start: number;
        for (start = 0; start < len; start++) {
            if (compareStrings(ancestorComponents[start], descendantComponents[start], ignoreCase)) {
                break;
            }
        }
        return start === ancestorComponents.length;
    }

    export namespace beneath {
        export function caseSensitive(ancestor: string, descendant: string) { return beneath(ancestor, descendant, /*ignoreCase*/ false); }
        export function caseInsensitive(ancestor: string, descendant: string) { return beneath(ancestor, descendant, /*ignoreCase*/ true); }
    }

    export function parse(path: string) {
        path = normalizeSeparators(path);
        const rootLength = getRootLength(path);
        const root = path.substring(0, rootLength);
        const rest = path.substring(rootLength).split(/\/+/g);
        if (rest.length && !rest[rest.length - 1]) rest.pop();
        return [root, ...rest.map(component => component.trim())];
    }

    export function format(components: string[]) {
        return components.length ? components[0] + components.slice(1).join(sep) : "";
    }

    export function dirname(path: string) {
        path = normalizeSeparators(path);
        return path.substr(0, Math.max(getRootLength(path), path.lastIndexOf(sep)));
    }

    export function basename(path: string, ext?: string): string;
    export function basename(path: string, options?: { extensions?: string[], ignoreCase?: boolean }): string;
    export function basename(path: string, options?: { extensions?: string[], ignoreCase?: boolean } | string) {
        path = normalizeSeparators(path);
        const name = path.substr(Math.max(getRootLength(path), path.lastIndexOf(sep) + 1));
        const extension = typeof options === "string" ? options.startsWith(".") ? options : "." + options :
            options && options.extensions ? extname(name, options) :
            undefined;
        return extension ? name.slice(0, name.length - extension.length) : name;
    }

    const extRegExp = /\.\w+$/;

    export function extname(path: string, options?: { extensions?: string[], ignoreCase?: boolean }) {
        if (options && options.extensions) {
            for (let extension of options.extensions) {
                if (!extension.startsWith(".")) extension = "." + extension;
                if (path.length > extension.length) {
                    const ext = path.slice(path.length - extension.length);
                    if (compareStrings(ext, extension, options.ignoreCase) === 0) {
                        return ext;
                    }
                }
            }
            return "";
        }

        const match = extRegExp.exec(path);
        return match ? match[0] : "";
    }
}