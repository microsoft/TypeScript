// @strict: true
// @noEmit: true

declare function request<T = { input: { value: number }; output: string }>(
    body?: T extends { input: unknown } ? T["input"] : never,
): T extends { output: unknown } ? T["output"] : T;

declare function identity<T>(callback: T): T;

identity((data: { value: number }) => request(data));
