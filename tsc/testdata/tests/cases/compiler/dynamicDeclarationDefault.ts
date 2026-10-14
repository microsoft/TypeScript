// @target: es2024
// @module: nodenext
// @strict: true
// @esModuleInterop: true

// @filename: profiler.d.ts
declare module "profiler" {
    export function start(): void;
}

// @filename: main.mts
const { default: profiler } = await import("profiler");
profiler.start();
