import * as ts from 'typescript';
import { FileCache } from './input';
export declare class Host implements ts.CompilerHost {
    typescript: typeof ts;
    fallback: ts.CompilerHost;
    currentDirectory: string;
    input: FileCache;
    constructor(typescript: typeof ts, currentDirectory: string, input: FileCache, options: ts.CompilerOptions);
    getNewLine(): string;
    useCaseSensitiveFileNames(): boolean;
    getCurrentDirectory: () => string;
    getCanonicalFileName(filename: string): string;
    getDefaultLibFileName(options: ts.CompilerOptions): string;
    getDefaultLibLocation(): string;
    writeFile: (fileName: string, data: string, writeByteOrderMark: boolean, onError?: (message: string) => void) => void;
    fileExists: (fileName: string) => boolean;
    readFile: (fileName: string) => string;
    getSourceFile: (fileName: string, languageVersion: ts.ScriptTarget, onError?: (message: string) => void) => ts.SourceFile;
    realpath: (path: string) => string;
    getDirectories: (path: string) => string[];
    directoryExists: (path: string) => boolean;
}
