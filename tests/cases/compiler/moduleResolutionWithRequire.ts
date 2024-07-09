// @traceResolution: true

// @filename: /other.ts
export const other = 123;

// @filename: /index.ts
declare const require: any;
function foo() {
    const a = require('../outside-of-rootdir/foo');
    const { other }: { other: string } = require('./other');
}
