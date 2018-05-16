/// <reference types="vinyl" />
import * as ts from 'typescript';
import * as utils from './utils';
import * as VinylFile from 'vinyl';
export declare enum FileChangeState {
    New = 0,
    Equal = 1,
    Modified = 2,
    Deleted = 3,
    NotFound = 4,
}
export declare enum FileKind {
    Source = 0,
    Config = 1,
}
export interface FileChange {
    previous: File;
    current: File;
    state: FileChangeState;
}
export interface File {
    gulp?: VinylFile;
    fileNameNormalized: string;
    fileNameOriginal: string;
    content: string;
    kind: FileKind;
    ts?: ts.SourceFile;
}
export declare module File {
    function fromContent(fileName: string, content: string): File;
    function fromGulp(file: VinylFile): File;
    function equal(a: File, b: File): boolean;
    function getChangeState(previous: File, current: File): FileChangeState;
}
export declare class FileDictionary {
    files: utils.Map<File>;
    firstSourceFile: File;
    typescript: typeof ts;
    constructor(typescript: typeof ts);
    addGulp(gFile: VinylFile): File;
    addContent(fileName: string, content: string): File;
    private addFile(file);
    getFile(name: string): File;
    initTypeScriptSourceFile: (file: File) => void;
    getFileNames(onlyGulp?: boolean): string[];
    private getSourceFileNames(onlyGulp?);
    commonBasePath: string;
    commonSourceDirectory: string;
}
export declare class FileCache {
    previous: FileDictionary;
    current: FileDictionary;
    options: ts.CompilerOptions;
    noParse: boolean;
    typescript: typeof ts;
    version: number;
    constructor(typescript: typeof ts, options: ts.CompilerOptions);
    addGulp(gFile: VinylFile): File;
    addContent(fileName: string, content: string): File;
    reset(): void;
    private createDictionary();
    private initTypeScriptSourceFile(file);
    getFile(name: string): File;
    getFileChange(name: string): FileChange;
    getFileNames(onlyGulp?: boolean): string[];
    firstSourceFile: File;
    commonBasePath: string;
    commonSourceDirectory: string;
    isChanged(onlyGulp?: boolean): boolean;
}
