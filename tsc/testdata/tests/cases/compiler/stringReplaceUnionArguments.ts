// @target: es2015
// @noEmit: true
// @noTypesAndSymbols: true

type Replacement = string | ((substring: string, ...args: any[]) => string);
declare const replacement: Replacement;

"text".replace(/./, replacement);

declare const matcher: {
    [Symbol.replace](string: string, replacement: Replacement): string;
};

"text".replace(matcher, replacement);
