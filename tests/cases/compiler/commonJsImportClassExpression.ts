// @Filename: mod1.ts
export = class {
    chunk = 1
}

// @Filename: use.ts
import Chunk = require('./mod1')
declare var c: Chunk;
c.chunk;
