// @strict: true
// @noEmit: true
// @target: es2022
// @noTypesAndSymbols: true

// https://github.com/microsoft/TypeScript/issues/65560

type Digit = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
type Id = `${0 | 1 | 2 | 3}${Digit}${Digit}${Digit}`; // 4,000 ids

type Options = Partial<{ verbose: boolean }>;

type State = { [K in Id]?: { id: K; value: number } } & { options?: Options };

declare const state: State;
export const keys = Object.entries(state).map((entry) => entry[0]);
