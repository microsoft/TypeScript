//// [tests/cases/compiler/dynamicDeclarationDefault.ts] ////

//// [profiler.d.ts]
declare module "profiler" {
    export function start(): void;
}

//// [main.mts]
const { default: profiler } = await import("profiler");
profiler.start();


//// [main.mjs]
const { default: profiler } = await import("profiler");
profiler.start();
export {};
