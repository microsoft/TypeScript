// @outdir: out/
// @resolveJsonModule: true

// @Filename: file1.ts
import b1 = require('./b.json');
let x = b1;
import b2 = require('./b.json');
if (x) {
    x = b2;
}

// @Filename: b.json
{
    [a]: 10
}