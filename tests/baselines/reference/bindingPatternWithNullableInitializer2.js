//// [tests/cases/conformance/es6/destructuring/bindingPatternWithNullableInitializer2.ts] ////

//// [bindingPatternWithNullableInitializer2.ts]
export async function focus(
  {
    emitSynthFocused,
  }: {
    emitSynthFocused: boolean;
  } = { emitSynthFocused: true },
) {}

export declare function focus2({
  emitSynthFocused,
}?: {
  emitSynthFocused: boolean;
}): Promise<void>;

export class View {
  async focus(
    {
      emitSynthFocused,
    }: {
      emitSynthFocused: boolean;
    } = { emitSynthFocused: true },
  ) {}
}

// emit of the above
export declare class View2 {
  focus({ emitSynthFocused }?: {
    emitSynthFocused: boolean;
  }): Promise<void>;
}




//// [bindingPatternWithNullableInitializer2.d.ts]
export declare function focus({ emitSynthFocused, }?: {
    emitSynthFocused: boolean;
}): Promise<void>;
export declare function focus2({ emitSynthFocused, }?: {
    emitSynthFocused: boolean;
}): Promise<void>;
export declare class View {
    focus({ emitSynthFocused, }?: {
        emitSynthFocused: boolean;
    }): Promise<void>;
}
export declare class View2 {
    focus({ emitSynthFocused }?: {
        emitSynthFocused: boolean;
    }): Promise<void>;
}
