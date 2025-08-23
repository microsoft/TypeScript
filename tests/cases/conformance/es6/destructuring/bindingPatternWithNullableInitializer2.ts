// @strict: true
// @target: esnext
// @declaration: true
// @emitDeclarationOnly: true

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
