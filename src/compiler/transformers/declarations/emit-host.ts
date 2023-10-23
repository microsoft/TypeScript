import {
    CompilerOptions,
    System,
} from "../../_namespaces/ts";
import {
    IsolatedEmitHost,
} from "./types";

export function createEmitDeclarationHost(options: CompilerOptions, sys: System): IsolatedEmitHost {
    const getCompilerOptions = () => options;
    const getCurrentDirectory = () => ".";
    const getCommonSourceDirectory = () => ".";
    const getCanonicalFileName = (f: string) => `./${f}`;

    return {
        redirectTargetsMap: new Map(),
        fileExists: sys.fileExists,
        readFile: sys.readFile,
        directoryExists: sys.directoryExists,
        getDirectories: sys.getDirectories,
        realpath: sys.realpath,
        useCaseSensitiveFileNames: () => options.forceConsistentCasingInFileNames || sys.useCaseSensitiveFileNames,
        // redirectTargetsMap: new Map(),
        getSourceFiles() {
            throw new Error("Not needed");
        },
        getCompilerOptions,
        getCurrentDirectory,
        getCommonSourceDirectory,
        getCanonicalFileName,
        getLibFileFromReference() {
            return undefined;
        },
        getSourceFileFromReference() {
            return undefined;
        },
        isSourceOfProjectReferenceRedirect() {
            return false;
        },
    };
}
