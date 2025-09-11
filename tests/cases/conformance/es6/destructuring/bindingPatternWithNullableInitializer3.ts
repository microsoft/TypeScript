// @strict: true
// @target: esnext

// @filename: types.d.ts

export declare function focus2({
  emitSynthFocused,
}?: {
  emitSynthFocused: boolean;
}): Promise<void>;

export declare class View2 {
  focus({ emitSynthFocused }?: {
    emitSynthFocused: boolean;
  }): Promise<void>;
}
