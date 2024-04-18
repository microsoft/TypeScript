// @target: esnext
// @module: preserve, esnext
// @moduleResolution: bundler

// @Filename: /node_modules/mdast-util-to-string/package.json
{ "type": "module" }

// @Filename: /node_modules/mdast-util-to-string/index.d.ts
export function toString(): string;

// @Filename: /index.ts
import mdast, { toString } from 'mdast-util-to-string';
mdast;
mdast.toString();

const mdast2 = await import('mdast-util-to-string');
mdast2.toString();
mdast2.default;
