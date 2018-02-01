/**
 * Virtual path separator.
 */
export declare const sep = "/";
/**
 * Normalize path separators.
 */
export declare function normalizeSeparators(path: string): string;
export declare const enum ValidationFlags {
    None = 0,
    RequireRoot = 1,
    RequireDirname = 2,
    RequireBasename = 4,
    RequireExtname = 8,
    RequireTrailingSeparator = 16,
    AllowRoot = 32,
    AllowDirname = 64,
    AllowBasename = 128,
    AllowExtname = 256,
    AllowTrailingSeparator = 512,
    AllowNavigation = 1024,
    /** Path must be a valid directory root */
    Root = 545,
    /** Path must be a absolute */
    Absolute = 2017,
    /** Path may be relative or absolute */
    RelativeOrAbsolute = 2016,
    /** Path may only be a filename */
    Basename = 260,
}
export declare function valid(path: string, flags?: ValidationFlags): boolean;
export declare function validate(path: string, flags?: ValidationFlags): string;
/**
 * Determines whether a path is an absolute path (e.g. starts with `/`, `\\`, or a dos path
 * like `c:`).
 */
export declare function isAbsolute(path: string): boolean;
/**
 * Determines whether a path consists only of a path root.
 */
export declare function isRoot(path: string): boolean;
/**
 * Determines whether a path has a trailing separator (`/`).
 */
export declare function hasTrailingSeparator(path: string): boolean;
/**
 * Adds a trailing separator (`/`) to a path if it doesn't have one.
 */
export declare function addTrailingSeparator(path: string): string;
/**
 * Removes a trailing separator (`/`) from a path if it has one.
 */
export declare function removeTrailingSeparator(path: string): string;
/**
 * Normalize a path containing path traversal components (`.` or `..`).
 */
export declare function normalize(path: string): string;
/**
 * Combines two or more paths. If a path is absolute, it replaces any previous path.
 */
export declare function combine(path: string, ...paths: string[]): string;
/**
 * Combines and normalizes two or more paths.
 */
export declare function resolve(path: string, ...paths: string[]): string;
/**
 * Gets a relative path that can be used to traverse between `from` and `to`.
 */
export declare function relative(from: string, to: string, ignoreCase: boolean): string;
/**
 * Performs a case-sensitive comparison of two paths.
 */
export declare function compareCaseSensitive(a: string, b: string): number;
/**
 * Performs a case-insensitive comparison of two paths.
 */
export declare function compareCaseInsensitive(a: string, b: string): number;
/**
 * Compare two paths.
 */
export declare function compare(a: string, b: string, ignoreCase: boolean): number;
/**
 * Determines whether two strings are equal.
 */
export declare function equals(a: string, b: string, ignoreCase: boolean): boolean;
/**
 * Determines whether the path `descendant` is beneath the path `ancestor`.
 */
export declare function beneath(ancestor: string, descendant: string, ignoreCase: boolean): boolean;
/**
 * Parse a path into a root component and zero or more path segments.
 * If the path is relative, the root component is `""`.
 * If the path is absolute, the root component includes the first path separator (`/`).
 */
export declare function parse(path: string): string[];
/**
 * Formats a parsed path consisting of a root component and zero or more path segments.
 */
export declare function format(components: ReadonlyArray<string>): string;
/**
 * Gets the parent directory name of a path.
 */
export declare function dirname(path: string): string;
/**
 * Gets the portion of a path following the last separator (`/`).
 */
export declare function basename(path: string): string;
/**
 * Gets the portion of a path following the last separator (`/`).
 * If the base name has any one of the provided extensions, it is removed.
 */
export declare function basename(path: string, extensions: string | ReadonlyArray<string>, ignoreCase: boolean): string;
/**
 * Gets the file extension for a path.
 */
export declare function extname(path: string): string;
/**
 * Gets the file extension for a path, provided it is one of the provided extensions.
 */
export declare function extname(path: string, extensions: string | ReadonlyArray<string>, ignoreCase: boolean): string;
export declare function changeExtension(path: string, ext: string): string;
export declare function changeExtension(path: string, ext: string, extensions: string | ReadonlyArray<string>, ignoreCase: boolean): string;
export declare function isTypeScript(path: string): boolean;
export declare function isJavaScript(path: string): boolean;
export declare function isDeclaration(path: string): boolean;
export declare function isSourceMap(path: string): boolean;
export declare function isJavaScriptSourceMap(path: string): boolean;
export declare function isJson(path: string): boolean;
export declare function isDefaultLibrary(path: string): boolean;
