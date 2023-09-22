import { createCompilerHostWorker, Debug, isNodeLikeSystem, runThread, setGetSourceFileAsHashVersioned, setSys, setWorkerThreadsHost, System, workerThreads, WorkerThreadWorkerThreadsHost } from "./_namespaces/ts";
import { SharedSourceFile } from "./sharing/sharedNode";
import { getSharedObjectAllocator } from "./sharing/sharedObjectAllocator";
import { SharedSourceFileEntry } from "./sharing/sharedParserState";
import { Condition } from "./threading/condition";
import { UniqueLock } from "./threading/uniqueLock";

/** @internal */
export function executeWorker(system: System, host: WorkerThreadWorkerThreadsHost) {
    // if (process.execArgv.includes("--inspect-brk")) {
    //     const inspector = require("node:inspector") as typeof import("node:inspector");
    //     inspector.open();
    //     inspector.waitForDebugger();
    // }

    setSys(system);
    setWorkerThreadsHost(host);
    if (isNodeLikeSystem()) {
        const fs: typeof import("fs") = require("fs");
        const util: typeof import("util") = require("util");
        Debug.loggingHost = {
            log(_level, s) {
                fs.writeSync(2, `[worker#${host.threadId}] ${s || ""}${system.newLine}`);
            },
            format(...args) {
                return util.formatWithOptions({ colors: true }, ...args);
            }
        };
    }

    runThread((name, arg) => {
        switch (name) {
            case "Program.requestSourceFile":
                programRequestSourceFile(arg as SharedSourceFileEntry);
                break;
        }
    });

    function programRequestSourceFile(entry: SharedSourceFileEntry) {
        let ok = false;
        let sharedFile: SharedSourceFile | undefined;
        try {
            // Debug.log.trace(`parsing: ${entry.fileName}`);
            const overideObjectAllocator = getSharedObjectAllocator();
            const host = createCompilerHostWorker({}, entry.setParentNodes, system, workerThreads, /*threadPool*/ undefined, overideObjectAllocator);
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
