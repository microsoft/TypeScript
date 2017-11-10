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
        once(event: string | symbol, listener: (...args: any[]) => void): this;
        addListener(event: string | symbol, listener: (...args: any[]) => void): this;
        prependListener(event: string | symbol, listener: (...args: any[]) => void): this;
        prependOnceListener(event: string | symbol, listener: (...args: any[]) => void): this;
        removeListener(event: string | symbol, listener: (...args: any[]) => void): this;
        removeAllListeners(event?: string | symbol): this;
        setMaxListeners(n: number): this;
        getMaxListeners(): number;
        listeners(event: string | symbol): Function[];
        emit(event: string | symbol, ...args: any[]): boolean;
        eventNames(): (string | symbol)[];
        listenerCount(type: string | symbol): number;
    }
}