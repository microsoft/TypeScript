import {
    workerData,
} from "worker_threads";

const processWorkerIndex = process.argv.map(l => /worker-index=([0-9]*)/.exec(l)).find(m => !!m)?.[1];
const workerIndex = +(workerData?.workerIndex ?? processWorkerIndex ?? 0);
const spaces = "                                            ";
function pad(s: string, count = 20) {
    return spaces.substring(0, count - s?.length) + s;
}
const start = Math.trunc(Date.now() / 1000 / 60 / 60 / 24);
export function taskNameLog(taskName: string) {
    const time = Math.trunc((new Date().getTime() - start) / 1000);
    return pad(workerIndex + "", 2) +
        ": " + pad(time + "", 10) +
        ": " + pad(taskName, 30) +
        "";
}
