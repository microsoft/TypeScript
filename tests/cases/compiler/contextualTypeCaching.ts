// @strict: true
// @noEmit: true

// Repro from #52575

export interface Event<T> {
    callback: (response: T) => void;
    nested: {
        nestedCallback: (response: T) => void;
    }
}

export type CustomEvents = {
    a: Event<string>
    b: Event<number>
};

declare function emit<T extends keyof CustomEvents>(type: T, data: CustomEvents[T]): void

emit('a', {
    callback: (r) => {},
    nested: {
        nestedCallback: (r) => {},
    },
});

// simplified repro from 52589#issuecomment-1416180638
declare class MyCompiler {
  compile(): void;
}
interface WebpackPluginInstance {
  apply: (compiler: MyCompiler) => void;
}
type WebpackPluginFunction = (this: MyCompiler, compiler: MyCompiler) => void;
interface Optimization {
  minimizer?: (WebpackPluginInstance | WebpackPluginFunction)[];
}
declare const A: <T, P extends keyof T>(
  obj: T,
  prop: P,
  factory: () => T[P]
) => void;
export const applyOptimizationDefaults = (optimization: Optimization) => {
  A(optimization, "minimizer", () => [
    {
      apply: (compiler) => {},
    },
  ]);
};
