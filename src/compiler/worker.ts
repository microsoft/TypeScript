import { createCompilerHostWorker, Debug, isNodeLikeSystem, setGetSourceFileAsHashVersioned, sys, System, ThreadPoolState, ThreadPoolThread, workerThreads, WorkerThreadWorkerThreadsHost } from "./_namespaces/ts";
import { SharedSourceFile } from "./sharing/sharedNode";
import { getSharedObjectAllocator } from "./sharing/sharedObjectAllocator";
import { SharedSourceFileEntry } from "./sharing/sharedParserState";
import { Condition } from "./threading/condition";
import { UniqueLock } from "./threading/uniqueLock";

/** @internal */
export function executeWorker(_system: System, host: WorkerThreadWorkerThreadsHost) {
    // if (process.execArgv.includes("--inspect-brk")) {
    //     const inspector = require("node:inspector") as typeof import("node:inspector");
    //     inspector.open();
    //     inspector.waitForDebugger();
    // }

    if (isNodeLikeSystem()) {
        const fs: typeof import("fs") = require("fs");
        const util: typeof import("util") = require("util");
        Debug.loggingHost = {
            log(_level, s) {
                fs.writeSync(2, `[worker#${host.threadId}] ${s || ""}${sys.newLine}`);
            },
            format(...args) {
                return util.formatWithOptions({ colors: true }, ...args);
            }
        };
    }

    const { workerData } = host;
    Debug.assert(workerData);
    const { type } = workerData as { type: string };
    switch (type) {
        case "ThreadPoolThread": {
            const { state } = workerData as { state: ThreadPoolState };
            const thread = new ThreadPoolThread(state, (name, arg) => {
                switch (name) {
                    case "Program.requestSourceFile":
                        programRequestSourceFile(arg as SharedSourceFileEntry);
                        break;
                }
            });
            thread.run();
            break;
        }
        default:
            Debug.fail(`Unsupported worker type: '${type}'.`);
            break;
    }

    function programRequestSourceFile(entry: SharedSourceFileEntry) {
        let ok = false;
        let sharedFile: SharedSourceFile | undefined;
        try {
            // Debug.log.trace(`parsing: ${entry.fileName}`);
            const overideObjectAllocator = getSharedObjectAllocator();
            const host = createCompilerHostWorker({}, entry.setParentNodes, sys, workerThreads, /*threadPool*/ undefined, overideObjectAllocator);
            if (entry.setFileVersion) {
                setGetSourceFileAsHashVersioned(host);
            }
            const file = host.getSourceFile(entry.fileName, entry.languageVersion, undefined, entry.shouldCreateNewSourceFile);
            Debug.assert(file === undefined || file instanceof SharedSourceFile);
            sharedFile = file;
            ok = true;
        }
        finally {
            using _ = new UniqueLock(entry.fileMutex);
            entry.error = !ok;
            entry.done = ok;
            entry.file = sharedFile;
            Condition.notify(entry.fileCondition);
        }
    }
}
