//// [tests/cases/compiler/namespaceMergedWithFunctionDefaultExport.ts] ////

//// [package.json]
{
  "name": "replace-in-file",
  "version": "6.3.5",
  "types": "./types/index.d.ts"
}

//// [index.d.ts]
declare module 'replace-in-file' {
  export function replaceInFile(config: ReplaceInFileConfig): Promise<ReplaceResult[]>;
  export function replaceInFile(config: ReplaceInFileConfig, cb: (error: Error, results: ReplaceResult[]) => void): void;
  export default replaceInFile;

  namespace replaceInFile {
    export function sync(config: ReplaceInFileConfig): ReplaceResult[];
    export function replaceInFileSync(config: ReplaceInFileConfig): ReplaceResult[];
    export function replaceInFile(config: ReplaceInFileConfig): Promise<ReplaceResult[]>;
    export function replaceInFile(config: ReplaceInFileConfig, cb: (error: Error, results: ReplaceResult[]) => void): void;
  }

  export function sync(config: ReplaceInFileConfig): ReplaceResult[];
  export function replaceInFileSync(config: ReplaceInFileConfig): ReplaceResult[];

  export type From = string | RegExp | FromCallback;
  export type To = string | ToCallback;

  export interface ReplaceInFileConfig {
    files: string | string[];
    ignore?: string | string[];
    from: From | Array<From>;
    to: To | Array<To>;
    countMatches?: boolean;
    allowEmptyPaths?: boolean,
    disableGlobs?: boolean,
    encoding?: string,
    dry?:boolean
    glob?:object
  }

  export interface ReplaceResult {
    file: string;
    hasChanged: boolean;
    numMatches?: number,
    numReplacements?: number,
  }
}

type FromCallback = (file: string) => string | RegExp | string[] | RegExp[];
type ToCallback = (match: string, file: string) => string | string[];

//// [main.ts]
import replaceInFile from "replace-in-file";

replaceInFile({ files: "*.md", from: "a", to: "b" });


//// [main.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var replace_in_file_1 = require("replace-in-file");
(0, replace_in_file_1.default)({ files: "*.md", from: "a", to: "b" });
