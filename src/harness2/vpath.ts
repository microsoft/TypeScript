import { compareStrings } from "./utils";

export function normalizeSlashes(path: string): string {
    return path.replace(/\s*[\\/]\s*/g, "/").trim();
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
export function hasTrailingSeperator(path: string) {
    return trailingSeperatorRegExp.test(path);
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
    return components.length > 1 && hasTrailingSeperator(path) ? format(components) + "/" : format(components);
}

export function combine(path: string, ...paths: string[]) {
    path = normalizeSlashes(path);
    for (let name of paths) {
        name = normalizeSlashes(name);
        if (name.length === 0) continue;
        if (path.length === 0 || isAbsolute(name)) {
            path = name;
        }
        else {
            path = hasTrailingSeperator(path) ? path + name : path + "/" + name;
        }
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

    if (start === 0) {
        return format(toComponents);
    }

    const components = toComponents.slice(start);
    for (; start < fromComponents.length; start++) {
        components.unshift("..");
    }

    return format(["", ...components]);
}

export function beneath(ancestor: string, descendant: string, ignoreCase: boolean) {
    if (!isAbsolute(ancestor)) throw new Error("Path not absolute");
    if (!isAbsolute(descendant)) throw new Error("Path not absolute");

    const ancestorComponents = reduce(parse(ancestor));
    const descendantComponents = reduce(parse(descendant));

    let start: number;
    for (start = 0; start < ancestorComponents.length && start < descendantComponents.length; start++) {
        if (compareStrings(ancestorComponents[start], descendantComponents[start], ignoreCase)) {
            break;
        }
    }

    return start === ancestorComponents.length;
}

export function parse(path: string) {
    path = normalizeSlashes(path);
    const rootLength = getRootLength(path);
    const root = path.substring(0, rootLength);
    const rest = path.substring(rootLength).split(/\/+/g);
    if (rest.length && !rest[rest.length - 1]) rest.pop();
    return [root, ...rest.map(component => component.trim())];
}

export function format(components: string[]) {
    return components.length ? components[0] + components.slice(1).join("/") : "";
}

export function dirname(path: string) {
    path = normalizeSlashes(path);
    return path.substr(0, Math.max(getRootLength(path), path.lastIndexOf("/")));
}

export function basename(path: string, ext?: string): string;
export function basename(path: string, options?: { extensions?: string[], ignoreCase?: boolean }): string;
export function basename(path: string, options?: { extensions?: string[], ignoreCase?: boolean } | string) {
    path = normalizeSlashes(path);
    const name = path.substr(Math.max(getRootLength(path), path.lastIndexOf("/") + 1));
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

export function chext(path: string, ext: string, options?: { extensions?: string[], ignoreCase?: boolean }) {
    const pathext = extname(path, options);
    return pathext ? path.slice(0, path.length - pathext.length) + (ext.startsWith(".") ? ext : "." + ext) : path;
}