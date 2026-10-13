// @strict: true
// @lib: es5,webworker
// @noEmit: true

declare function createMessageReader(port: MessagePort | Worker | DedicatedWorkerGlobalScope): void;
createMessageReader(self);

declare const event: MessageEvent;
self.onmessage?.(event);
