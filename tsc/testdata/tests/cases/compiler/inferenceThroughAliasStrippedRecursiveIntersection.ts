// @strict: true
// @noEmit: true

// Inference reduces the intersection target, which strips the alias from the
// source intersection. The recursive `children` member then leads back to the
// aliased source, from which `BSchema` is inferred. The alias-stripped copy and
// the aliased type are the same level of nesting.

type BlockConfig = { type: string; content: "inline" | "none" };
type BlockSchema = Record<string, BlockConfig>;
type NoChildren<B extends BlockConfig, I> = { id?: string; type?: B["type"]; content?: B["content"] extends "inline" ? I[] : undefined };
type WithoutChildren<BSchema extends BlockSchema, I> = { [K in keyof BSchema]: NoChildren<BSchema[K], I> };
type PartialBlockNoDefaults<BSchema extends BlockSchema, I, S> =
    WithoutChildren<BSchema, I>[keyof WithoutChildren<BSchema, I>] & Partial<{ children: PartialBlockNoDefaults<BSchema, I, S>[] }>;
type PartialBlock<BSchema extends BlockSchema = { paragraph: { type: "paragraph"; content: "inline" } }, I = string, S = unknown> =
    PartialBlockNoDefaults<BSchema, I, S>;

declare function updateBlock<BSchema extends BlockSchema, I, S>(block: PartialBlock<BSchema, I, S>): void;
declare const replacement: PartialBlockNoDefaults<any, any, any>;
updateBlock(replacement);
