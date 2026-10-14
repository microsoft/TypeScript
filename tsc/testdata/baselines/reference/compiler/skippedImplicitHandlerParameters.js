//// [tests/cases/compiler/skippedImplicitHandlerParameters.ts] ////

//// [handlers.d.ts]
interface FilterHandlers {
    update: (value: object) => void;
    remove: (value: string) => void;
}
interface ServerHandlers {
    save: (value) => "saved";
}
interface Handlers extends ServerHandlers, FilterHandlers {}

//// [main.ts]
function runHandler<T extends Handlers[keyof Handlers]>(handler: T, value: Parameters<T>[0]) {
    handler(value);
}


//// [main.js]
"use strict";
function runHandler(handler, value) {
    handler(value);
}
