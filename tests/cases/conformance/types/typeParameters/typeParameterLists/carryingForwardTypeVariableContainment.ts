// @declaration: true
// @emitDeclarationOnly: true

// @filename: /a.ts
export type Brand<Base, Branding, ReservedName extends string = "__type__"> =
    Base & { [K in ReservedName]: Branding } & { __witness__: Base };
export type BoundedInteger<LowerBound extends number, UpperBound extends number> =
    Brand<number, "BoundedInteger">;
export const toBoundedInteger =
    <LowerBound extends number, UpperBound extends number>(bounds: { lowerBound: LowerBound; upperBound: UpperBound; }) =>
        (n: number): BoundedInteger<LowerBound, UpperBound> => ({} as any);

// @filename: /b.ts
export type LexicalCommand<TPayload> = Record<string, never>;
export type InsertTextPayload = Readonly<{ text: string }>;
function createCommand<T>(): LexicalCommand<T> {
    return { };
}
export const INSERT_TEXT_COMMAND = createCommand();
