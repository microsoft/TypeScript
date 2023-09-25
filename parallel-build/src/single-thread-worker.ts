import {
    nextTick,
} from "process";
import {
    Readable,
    Stream,
} from "stream";

export const toWorker = new Readable({
    read() {},
});
export const toMain = new Readable({
    read() {},
});

export function makeSingleThreadedWorker() {
    import("./worker.js");
    return {
        postMessage(value: any) {
            nextTick(function postToWorker() {
                toWorker.push(JSON.stringify(value));
            });
        },
        once(event: "message", listener: (data: unknown) => void) {
            toMain.once("data", value => listener(JSON.parse(value)));
        },
        terminate() {},
    };
}

export function makeSingleThreadedParentPort() {
    return {
        on(event: "message", listener: (value: any) => void) {
            toWorker.on("data", function receiveFromParent(value) {
                listener(JSON.parse(value));
            });
        },
        postMessage(value: any) {
            nextTick(() => toMain.push(JSON.stringify(value)));
        },
    };
}
