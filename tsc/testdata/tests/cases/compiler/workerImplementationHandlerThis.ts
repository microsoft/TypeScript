// @strict: true
// @lib: es5,dom
// @noEmit: true

declare class WorkerReplacement extends EventTarget implements Worker {
    onmessage: ((this: Worker, event: MessageEvent) => any) | null;
    onmessageerror: ((this: Worker, event: MessageEvent) => any) | null;
    onerror: Worker["onerror"];
    postMessage: Worker["postMessage"];
    terminate: Worker["terminate"];
}
