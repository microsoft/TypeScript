import { Disposable } from './disposable';
/**
 * Represents a typed event.
 */
export interface Event<T> {
    /**
     *
     * @param listener The listener function will be called when the event happens.
     * @param thisArgs The 'this' which will be used when calling the event listener.
     * @param disposables An array to which a {{IDisposable}} will be added.
     * @return
    */
    (listener: (e: T) => any, thisArgs?: any, disposables?: Disposable[]): Disposable;
}
export declare namespace Event {
    const None: Event<any>;
}
export interface EmitterOptions {
    onFirstListenerAdd?: Function;
    onLastListenerRemove?: Function;
}
export declare class Emitter<T> {
    private _options?;
    private static _noop;
    private _event;
    private _callbacks;
    constructor(_options?: EmitterOptions | undefined);
    /**
     * For the public to allow to subscribe
     * to events from this Emitter
     */
    get event(): Event<T>;
    /**
     * To be kept private to fire an event to
     * subscribers
     */
    fire(event: T): any;
    dispose(): void;
}
