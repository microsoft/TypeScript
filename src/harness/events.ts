/// <reference path="./harness.ts" />
namespace events {
    const _events = require("events");

    export const EventEmitter: {
        new (): EventEmitter;
        prototype: EventEmitter;
        defaultMaxListeners: number;
    } = _events.EventEmitter;

    export interface EventEmitter {
        on(event: string | symbol, listener: (...args: any[]) => void): this;
        once: this["on"];
        addListener: this["on"];
        prependListener: this["on"];
        prependOnceListener: this["on"];
        removeListener: this["on"];
        removeAllListeners(event?: string | symbol): this;
        setMaxListeners(n: number): this;
        getMaxListeners(): number;
        listeners(event: string | symbol): Function[];
        emit(event: string | symbol, ...args: any[]): boolean;
        eventNames(): (string | symbol)[];
        listenerCount(type: string | symbol): number;
    }
}