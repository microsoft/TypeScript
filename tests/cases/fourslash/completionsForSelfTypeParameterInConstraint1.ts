/// <reference path='fourslash.ts' />

//// type StateMachine<Config> = {
////   initial?: "states" extends keyof Config ? keyof Config["states"] : never;
////   states?: Record<string, {}>;
//// };

//// declare function createMachine<Config extends StateMachine</*1*/>>(
////   config: Config,
//// ): void;

verify.completions({
  marker: ["1"],
  includes: ["Config"],
});
