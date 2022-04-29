//@module: amd
//@declaration: true

// @Filename: w1.ts
export = Widget1
class Widget1 { name = 'one'; }

// @Filename: exporter.ts
export import w = require('./w1');

// @Filename: consumer.ts
import e = require('./exporter');

export function w(): e.w { // Should be OK
    return new e.w();
}