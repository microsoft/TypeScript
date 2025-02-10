/// <reference path="fourslash.ts" />

// @strict: true
// @lib: esnext

//// declare function registerPlugin<Opt extends Record<string, any>>(
////   callback: (app: any, options: Opt) => void,
////   opts: NoInfer<Opt>,
//// ): Promise<void>;
////
//// registerPlugin((app, opts: { something: string }) => {}, {
////   /*1*/
//// });

verify.completions({ marker: "1", includes: [`something`] });
