import {
    fork,
    spawn,
} from "node:child_process";
import * as fs from "node:fs/promises";
import * as os from "node:os";
import * as path from "node:path";
import {
    Worker,
} from "node:worker_threads";

import JSONC from "json5";
import {
    CompilerOptions,
} from "typescript";

import {
    Task,
} from "./protocol.js";
import {
    makeSingleThreadedWorker,
} from "./single-thread-worker.js";
import {
    taskNameLog,
} from "./utils.js";

const useProcess = process.argv.indexOf("--use-processes") !== -1;
const singleThread = process.argv.indexOf("--single-thread") !== -1;
const cpuOverride = process.argv.map(v => /^--cpus=(?<value>[0-9]+)$/.exec(v)).map(m => Number(m?.groups?.value)).find(v => !isNaN(v));

interface AbstractWorker {
    postMessage(value: any): void;
    once(event: "message", listener: (data: unknown) => void): void;
    terminate(): void;
}
function makeWorker(index: number): AbstractWorker {
    if (singleThread) {
        return makeSingleThreadedWorker();
    }
    if (!useProcess) {
        return new Worker("./build/worker.js", {
            workerData: {
                workerIndex: index,
            },
        });
    }
    const childProcess = fork(path.resolve(`./build/worker.js`), [`--worker-index=${index}`]);
    return {
        postMessage(value: any) {
            childProcess.send(value);
        },
        once(event: "message", listener: (data: unknown) => void) {
            childProcess.once(event, listener);
        },
        terminate() {
            childProcess.kill();
        },
    };
}
interface WorkerInfo {
    dependencies: Set<string>;
    groups: Set<string>;
    worker: AbstractWorker;
    workTime: number;
}
function countIntersection<T>(set: Set<T>, items: T[]) {
    let c = 0;
    for (const item of items) {
        if (set.has(item)) {
            c++;
        }
    }
    return c;
}
async function main() {
    const taskFile = process.argv.slice(2).find(s => !s.startsWith("--"));
    if (!taskFile) return;

    const timeFile = path.join(path.dirname(taskFile) + "-times", path.basename(taskFile));
    const existingTaskTimes: Record<string, number> = await (async () => {
        try {
            return JSONC.parse(await fs.readFile(timeFile, { encoding: "utf8" }));
        }
        catch (e) {
            return {};
        }
    })();
    const getTaskTime = (name: string) => existingTaskTimes[name] ?? Number.MAX_SAFE_INTEGER;
    const taskFileConfig = JSONC.parse(await fs.readFile(taskFile, { encoding: "utf-8" })) as {
        cpus?: number;
        tasks: Task[];
        globalTsOverrides: CompilerOptions;
    };

    let maxParallelTasks = 0;
    let groupCollocation = 0;
    const startTime = new Date();
    const workerCount = singleThread ? 1 : cpuOverride ?? taskFileConfig.cpus ?? Math.round(os.cpus().length / 2);
    const workers: WorkerInfo[] = Array.from({ length: workerCount }).map((_, i) => ({
        worker: makeWorker(i + 1),
        groups: new Set<string>(),
        dependencies: new Set<string>(),
        workTime: 0,
    }));
    const activeTasks: Promise<void>[] = [];
    const tasks: Task[] = taskFileConfig.tasks;
    const completedTasks = new Set<string>();
    const taskTimes: Record<string, number> = {};
    tasks.sort((a, b) => (getTaskTime(b.group ?? b.name) - getTaskTime(a.group ?? a.name)));
    const scheduledTasksOrder: string[] = [];
    while (tasks.length) {
        const nextTasks = tasks.filter(t => t.dependencies.every(d => completedTasks.has(d)));
        if (nextTasks.length === 0) {
            console.log(`${taskNameLog("NONE")}: Waiting for deps to finish. Unscheduled Tasks: ${tasks.length}`);
            if(activeTasks.length === 0) {
                throw new Error(`No tasks are running but tasks still have required dependencies. Check your task file. Sample uncompleted task: ${tasks[0].dependencies.find(o => !completedTasks.has(o))}`)
            }
            await waitForTaskCompletion();
            continue;
        }
        const workerInfo = await waitForWorker();

        let task = nextTasks.find(t => workerInfo.groups.has(t.group));
        if (!task) {
            // Sort task by dependency overlap
            nextTasks.sort((a, b) => countIntersection(workerInfo.dependencies, a.dependencies) - countIntersection(workerInfo.dependencies, b.dependencies));
            task = nextTasks[0];
        }
        else {
            groupCollocation++;
        }

        if (task.config.type === "tsc" || task.config.type === "tsc-b" || task.config.type === "tsc-shard") {
            task.config.tsconfigOverrides = {
                ...taskFileConfig.globalTsOverrides,
                ...task.config.tsconfigOverrides,
            };
        }
        tasks.splice(tasks.indexOf(task), 1);
        const taskStart = new Date();
        scheduledTasksOrder.push(task.name);
        workerInfo.groups.add(task.group);
        task.dependencies.forEach(d => workerInfo.dependencies.add(d));
        queueTask(workerInfo, task, () => {
            completedTasks.add(task!.name);
            const time = new Date().getTime() - taskStart.getTime();
            taskTimes[task!.group ?? task!.name] = (taskTimes[task!.group ?? task!.name] ?? 0) + time;
            workerInfo.workTime += time;
            console.log(`${taskNameLog(task!.name)}: Finish Message in ${Math.round(time / 1000)}s`);
        });
    }
    console.log(`${taskNameLog("NONE")}: ALL TASKS HAVE BEEN SCHEDULED`);
    await Promise.all([...activeTasks]);
    workers.forEach(w => w.worker.terminate());

    const time = new Date().getTime() - startTime.getTime();
    console.log(`${taskNameLog("NONE")}: Finished all in ${time / 1000}s ${time / 1000 / 60}m`);
    // console.log(scheduledTasksOrder.join("\n"));
    try {
        const taskTimesEntries = Object.entries(taskTimes).sort((a, b) => a[1] - b[1]);

        console.log(
            "Worker Times",
            JSON.stringify(
                {
                    groupCollocation,
                    groups: taskTimesEntries.length,
                    times: workers.map(w => ({ time: w.workTime, groups: [...w.groups] })),
                },
                undefined,
                2,
            ),
        );

        await fs.writeFile(timeFile, JSON.stringify(Object.fromEntries(taskTimesEntries), undefined, 2));

        const statFile = path.join(
            path.dirname(taskFile) + "-stats",
            `${Date.now()}-` + path.basename(taskFile.substring(0, taskFile.length - ".json".length)) + ".json",
        );
        await fs.writeFile(
            statFile,
            JSON.stringify(
                {
                    startTime: startTime.getTime(),
                    executionTime: time,
                    cumulatedTime: taskTimesEntries.reduce((s, [_, v]) => s + v, 0),
                    maxParallelTasks,
                    taskTimes,
                    taskFileConfig,
                },
                undefined,
                2,
            ),
        );
    }
    catch (e) {
        console.log("Failed to write times and stats");
    }

    async function waitForTaskCompletion() {
        return Promise.any([...activeTasks]);
    }
    async function waitForWorker() {
        let wInfo = workers.pop()!;
        while (!wInfo) {
            console.log(`${taskNameLog("NONE")}: Waiting for worker - Active Tasks: ${activeTasks.length} -  Unscheduled Tasks: ${tasks.length}`);
            await waitForTaskCompletion();
            wInfo = workers.pop()!;
        }
        return wInfo;
    }
    function queueTask(wInfo: WorkerInfo, task: Task, onTaskCompleted: () => void) {
        const taskPromise = new Promise<void>(resolve => {
            console.log(`${taskNameLog(task.name)}: Start Message`);
            wInfo.worker.once("message", () => {
                console.log(`${taskNameLog(task.name)}: Finish Message`);
                workers.push(wInfo);
                onTaskCompleted();
                activeTasks.splice(activeTasks.indexOf(taskPromise), 1);
                resolve();
            });
            wInfo.worker.postMessage({
                name: task.name,
                config: task.config,
            });
        });
        activeTasks.push(taskPromise);
        maxParallelTasks = Math.max(maxParallelTasks, activeTasks.length);
    }
}

main();
