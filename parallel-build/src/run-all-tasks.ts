import * as child from "node:child_process";
import path from "node:path";

import * as fs from "fs/promises";
import * as sys from "systeminformation"

const taskDir = "./tasks";
const statsDir = taskDir + "-stats";
const timesDir = taskDir + "-times";
function runTaskFile(taskFile: string, env?: NodeJS.ProcessEnv) {
    return child.execFileSync(`node ./build/main.js ${taskFile} --use-worker`, {
        shell: true,
        encoding: "utf8",
        // env,
    });
}

function delay(ms: number) {
    // eslint-disable-next-line no-restricted-globals
    return new Promise(r => setTimeout(r, ms));
}
async function runAllTests(runCount = 1, skipSet = new Set<string>()) {
    const taskFiles = await fs.readdir("./tasks");
    taskFiles.sort((a, b) => b.localeCompare(a));

    for (let i = 0; i < runCount; i++) {
        for (let t = 0; t < taskFiles.length; t++) {
            const taskFile = taskFiles[t];
            if (skipSet.has(taskFile)) continue;

            runTaskFile("./tasks/clean.json", {});
            await delay(10 * 1000);
            console.log(`Running Task ${(t + 1)}/${taskFiles.length}. Run ${i}. ${taskFile}`);
            const result = runTaskFile(path.join("./tasks", taskFile));

            if (result.indexOf("Has Errors") !== -1 || result.indexOf("Fatal Error") !== -1) {
                console.log(`Errors for ${taskFile}`);
                const errorFile = `${Date.now()}-` + path.basename(taskFile.substring(0, taskFile.length - ".json".length)) + ".log";
                await fs.writeFile(path.join(statsDir, errorFile), result);
            }
        }
    }
}

async function exists(path: string) {
    try {
        await fs.access(path);
        return true;
    }
    catch (e) {
        return false;
    }
}

if (await exists(statsDir)) {
    const files = await fs.readdir(statsDir);
    if (files.length) {
        const time = files[0].split("-");
        await fs.rename(statsDir, statsDir + "-" + time[0]);
    }
    else {
        await fs.rm(statsDir, { recursive: true });
    }
}
await fs.mkdir(statsDir);

const existingTestFiles = new Set<string>();
if (!(await exists(timesDir))) {
    await fs.mkdir(timesDir);
}
else {
    (await fs.readdir(timesDir)).forEach(t => existingTestFiles.add(t));
}
await runAllTests(1, existingTestFiles); // First run to ensure times.
await fs.rm(statsDir, { recursive: true });
await fs.mkdir(statsDir);
await runAllTests(10);
