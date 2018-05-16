// Type definitions for events 1.2
// Project: https://github.com/Gozala/events
// Definitions by: Yasunori Ohoka <https://github.com/yasupeke>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped

export type Listener = (...args: any[]) => void;

export class EventEmitter {
  static listenerCount(emitter: EventEmitter, type: string | number): number;
  static defaultMaxListeners: number;

  setMaxListeners(n: number): this;
  emit(type: string | number, ...args: any[]): boolean;
  addListener(type: string | number, listener: Listener): this;
  on(type: string | number, listener: Listener): this;
  once(type: string | number, listener: Listener): this;
  removeListener(type: string | number, listener: Listener): this;
  removeAllListeners(type?: string | number): this;
  listeners(type: string | number): Listener[];
  listenerCount(type: string | number): number;
}
