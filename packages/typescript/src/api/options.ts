/**
 * Shared utilities for the TypeScript API client.
 */

import getExePath from "#getExePath";
import { existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import type { FileSystemCallbacks } from "./fs.ts";

export interface ClientSocketOptions {
    /** Path to the Unix domain socket or Windows named pipe for API communication */
    pipe: string;
    /** Maximum encoded byte size of each batch response page. Defaults to 300 million bytes. Individual responses can be larger than this size, but this controls where batch pages are cutoff. */
    maxResponseBytesPerPage?: number | undefined;
}

export interface ClientSpawnOptions {
    /** Path to the tsc executable. Defaults to the bundled tsc binary. */
    tsserverPath?: string | undefined;
    /** Current working directory */
    cwd?: string | undefined;
    /** Host filesystem callbacks. */
    fs?: FileSystemCallbacks | undefined;
    /** Whether file names are case-sensitive. Inferred from the client filesystem when omitted. */
    useCaseSensitiveFileNames?: boolean | undefined;
    /** Allow trusted projects to execute configured external content mapper processes. */
    runExternalCode?: boolean | undefined;
    /** Maximum encoded byte size of each batch response page. Defaults to 300 million bytes. Individual responses can be larger than this size, but this controls where batch pages are cutoff. */
    maxResponseBytesPerPage?: number | undefined;
    /**
     * When true, collect timing information for each request. The client
     * measures round-trip latency and bytes sent/received, and the server
     * measures its own per-request processing time; both are combined (along
     * with an estimated transport overhead) in the snapshot returned by
     * {@link API.getTimingInfo}.
     */
    collectTiming?: boolean | undefined;
    /**
     * Synchronous API only. How long, in microseconds, the client polls for
     * each response before blocking. Polling avoids the operating system's
     * wakeup latency when the server answers quickly, at the cost of some CPU
     * time while waiting. Defaults to 100; 0 disables polling. Ignored on
     * Windows.
     */
    responsePollMicroseconds?: number | undefined;
    /**
     * Synchronous API only. How long, in microseconds, the server polls for
     * the next request before blocking. This reduces round-trip latency further
     * but makes the server spend CPU time while the client works between
     * requests. Defaults to 0 (disabled). Ignored on Windows.
     */
    serverRequestPollMicroseconds?: number | undefined;
}

export type ClientOptions = ClientSocketOptions | ClientSpawnOptions;

export function isSpawnOptions(options: ClientOptions): options is ClientSpawnOptions {
    return !("pipe" in options);
}

export function resolveExePath(options: ClientSpawnOptions): string {
    return options.tsserverPath ?? getExePath();
}

export function getAPIProcessArgs(options: ClientSpawnOptions, async: boolean): string[] {
    const args = ["--api"];
    if (async) args.push("--async");
    args.push("--cwd", options.cwd ?? process.cwd());
    args.push(`--useCaseSensitiveFileNames=${options.useCaseSensitiveFileNames ?? inferUseCaseSensitiveFileNames()}`);
    if (options.runExternalCode) args.push("--runExternalCode");
    if (options.collectTiming) args.push("--timing");
    if (!async && options.serverRequestPollMicroseconds) args.push(`--requestPollMicroseconds=${options.serverRequestPollMicroseconds}`);
    return args;
}

function inferUseCaseSensitiveFileNames(): boolean {
    if (process.platform === "win32") {
        return false;
    }
    const fileName = fileURLToPath(import.meta.url);
    return !existsSync(fileName.replace(/\w/g, char => char === char.toUpperCase() ? char.toLowerCase() : char.toUpperCase()));
}

export interface LSPConnectionOptions extends ClientSocketOptions {
}

export interface APIOptions extends ClientSpawnOptions {
}
