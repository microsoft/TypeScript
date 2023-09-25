import {
    parentPort,
    workerData,
} from "node:worker_threads";

import * as perf from "external-declarations/build/compiler/perf-tracer.js";

import type {
    Task,
} from "./protocol.js";
import {
    makeSingleThreadedParentPort,
} from "./single-thread-worker.js";
import {
    taskNameLog,
} from "./utils.js";
import {
    buildDeclarations,
} from "./worker-utils/build-declarations.js";
import {
    buildTSCB,
} from "./worker-utils/build-tsc-b.js";
import {
    buildTSC,
} from "./worker-utils/build-tsc-p.js";
import {
    buildTSCShard,
} from "./worker-utils/build-tsc-shard.js";
import {
    cleanProjectOutput,
} from "./worker-utils/clean-project.js";

const singleThread = process.argv.indexOf("--single-thread") !== -1;
const parent = singleThread ? makeSingleThreadedParentPort() :
    workerData ? parentPort : {
        on(event: "message", listener: (value: any) => void) {
            process.on("message", listener);
        },
        postMessage(value: any) {
            process.send?.(value);
        },
    };

function main() {
    parent?.on("message", (task: Task) => {
        perf.installTracer();
        perf.tracer.current?.start("full");
        console.log(`${taskNameLog(task.name)}: Starting`);
        const config = task.config;
        if (config.type === "clean") {
            cleanProjectOutput(config);
        }
        if (config.type === "tsc-b") {
            buildTSCB(config);
        }
        if (config.type === "tsc") {
            buildTSC(task.name, config);
        }
        if (config.type === "tsc-shard") {
            buildTSCShard(task.name, config);
        }
        if (config.type === "declaration") {
            buildDeclarations(
                task.name,
                config,
            );
        }
        console.log(`${taskNameLog(task.name)}: Finished`);
        parent?.postMessage({
            type: "done",
        });
        perf.tracer.current?.end("full");
        console.log(`${taskNameLog(task.name)}: Times`, JSON.stringify(perf.tracer.current?.times));
    });
}

main();
