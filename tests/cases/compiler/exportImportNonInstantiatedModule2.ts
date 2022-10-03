//@module: amd
//@declaration: true

// @Filename: w1.ts
export = Widget1
interface Widget1 { name: string; }

// @Filename: exporter.ts
export import w = require('./w1');

// @Filename: consumer.ts
import e = require('./exporter');

export function w(): e.w { // Should be OK
    return {name: 'value' };
}