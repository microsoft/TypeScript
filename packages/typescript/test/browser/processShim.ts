import process from "process";

export { process };

export function setImmediate(callback: (...args: unknown[]) => void, ...args: unknown[]): ReturnType<typeof setTimeout> {
    return setTimeout(callback, 0, ...args);
}

export function clearImmediate(handle: ReturnType<typeof setTimeout>): void {
    clearTimeout(handle);
}
