

type Source = {
    <K extends keyof WindowEventMap>(type: K, listener: (this: Window, ev: WindowEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
  (type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
}

interface Action1<T> {
    (arg: T): void;
}
interface MessageEventLike<T> {
    source: WindowLike<T>;
    origin: string;
    data: T;
}
interface PostMessageObject<T> {
    postMessage(message: T, host: string): void;
}
interface WindowLike<T> extends PostMessageObject<T> {
    addEventListener(type: "message", handler: Action1<MessageEventLike<T>>): void;
    addEventListener(type: string, handler: Action1<any>): void;
    removeEventListener(type: "message", handler: Action1<MessageEventLike<T>>): void;
    removeEventListener(type: string, handler: Action1<any>): void;
}
type Target = {
    (type: "message", handler: Action1<MessageEventLike<any>>): void;
    (type: string, handler: Action1<any>): void;
};

function f1(s: Source, t: Target) {
    t = s;
}