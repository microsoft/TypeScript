import * as ts from 'typescript';
import { File } from './input';
import * as reporter from './reporter';
export interface Map<T> {
    [key: string]: T;
}
export declare function forwardSlashes(fileName: string): string;
export declare function normalizePath(pathString: string): string;
/**
 * Splits a filename into an extensionless filename and an extension.
 * 'bar/foo.js' is turned into ['bar/foo', 'js']
 * 'foo.d.ts' is parsed as ['foo', 'd.ts'] if you add 'd.ts' to knownExtensions.
 * @param knownExtensions An array with known extensions, that contain multiple parts, like 'd.ts'. 'a.b.c' should be listed before 'b.c'.
 */
export declare function splitExtension(fileName: string, knownExtensions?: string[]): [string, string];
/**
 * Finds the common base path of two directories
 */
export declare function getCommonBasePath(a: string, b: string): string;
export declare function getCommonBasePathOfArray(paths: string[]): string;
export declare function getError(info: ts.Diagnostic, typescript: typeof ts, file?: File): reporter.TypeScriptError;
export declare function deprecate(title: string, alternative: string, description?: string): void;
export declare function message(title: string, alternative: string, description?: string): void;
