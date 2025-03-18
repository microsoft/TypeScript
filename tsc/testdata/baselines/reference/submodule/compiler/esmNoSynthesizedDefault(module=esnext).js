//// [tests/cases/compiler/esmNoSynthesizedDefault.ts] ////

//// [package.json]
{ "type": "module" }

//// [index.d.ts]
export function toString(): string;

//// [index.ts]
import mdast, { toString } from 'mdast-util-to-string';
mdast;
mdast.toString();

const mdast2 = await import('mdast-util-to-string');
mdast2.toString();
mdast2.default;


//// [index.js]
import mdast from 'mdast-util-to-string';
mdast;
mdast.toString();
const mdast2 = await import('mdast-util-to-string');
mdast2.toString();
mdast2.default;
