// @strict: true
// @lib: es5,dom
// @noEmit: true

interface MockWorker extends Worker {
    messages: unknown[];
}

declare function forward(worker: Worker): void;
declare const worker: MockWorker;
forward(worker);
