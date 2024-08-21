import {
    FileOrFolderOrSymLinkMap,
    TestServerHost,
} from "./virtualFileSystemWithWatch.js";

export interface FsOptions {
    currentDirectory?: string;
    environmentVariables?: Map<string, string>;
}

/**
 * All the files must be in /src
 */
export function loadProjectFromFiles(
    files: FileOrFolderOrSymLinkMap,
    options?: FsOptions,
): TestServerHost {
    return TestServerHost.createWatchedSystem(files, {
        currentDirectory: options?.currentDirectory ?? "/",
        environmentVariables: options?.environmentVariables,
    });
}
