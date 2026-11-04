// @strict: true
// @noEmit: true

type ParserName = "babel" | (Pick<string, never> & { marker?: never });

declare const customParser: string;
const parser: ParserName = customParser;
const svelteParser: ParserName = "svelte";
