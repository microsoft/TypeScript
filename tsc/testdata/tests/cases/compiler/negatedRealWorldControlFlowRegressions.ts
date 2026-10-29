// @strict: true
// @noEmit: true

function parseCommand(command: string): "start" | "stop" {
    if (command !== "start" && command !== "stop") {
        throw new Error("Invalid command");
    }
    return command;
}

interface HandlerOptions {
    message?: string;
}

declare const handler: string | HandlerOptions | ((value: number) => void) | undefined;
if (typeof handler !== "string" && handler !== undefined && typeof handler === "function") {
    handler(0);
}

let count = 1 as number;
if (count !== 0) {
    count--;
    if (count === 0) {
        count;
    }
}

let offset = 1 as number;
if (offset !== 0) {
    offset = 0;
}

let total = 1 as number;
if (total !== 0) {
    total -= 1;
}

declare let constrainedTotal: number & not 0;
constrainedTotal -= 1;

declare const values: Map<string, string>;
if (values.size !== 0) {
    values.delete("key");
    if (values.size === 0) {
        values;
    }
}

interface Options {
    enabled?: boolean;
    threshold?: number;
}

declare const rawOptions: boolean | Options;
const options = typeof rawOptions === "boolean" ? { enabled: rawOptions } : rawOptions;
options.threshold;

declare const input: unknown;
const normalized = typeof input === "bigint" ? Number(input) : input;
normalized;