/// <reference path="../compiler/types.ts"/>
/// <reference path="../compiler/sys.ts"/>
/// <reference path="../services/jsTyping.ts"/>

declare namespace ts.server {
    export interface InstallTypingsRequest {
        readonly projectName: string;
        readonly fileNames: string[];
        readonly projectRootPath: ts.Path;
        readonly safeListPath: ts.Path;
        readonly packageNameToTypingLocation: ts.Map<string>;
        readonly typingOptions: ts.TypingOptions;
        readonly compilerOptions: ts.CompilerOptions;
        readonly cachePath: string;
    }

    export interface CompressedData {
        length: number;
        compressionKind: string;
        data: any;
    }

    export interface ServerHost extends System {
        setTimeout(callback: (...args: any[]) => void, ms: number, ...args: any[]): any;
        clearTimeout(timeoutId: any): void;
        setImmediate(callback: (...args: any[]) => void, ...args: any[]): any;
        clearImmediate(timeoutId: any): void;
        writeCompressedData(prefix: string, data: CompressedData, suffix: string): void;
    }

    export interface InstallTypingsResponse {
        readonly projectName: string;
        readonly typingOptions: ts.TypingOptions;
        readonly compilerOptions: ts.CompilerOptions;
        readonly typings: string[];
    }

    export interface InstallTypingHost extends JsTyping.TypingResolutionHost {
        writeFile(path: string, content: string): void;
        createDirectory(path: string): void;
    }
}