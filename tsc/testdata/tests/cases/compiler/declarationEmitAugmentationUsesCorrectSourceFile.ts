// @strict: true
// @module: preserve
// @declaration: true

// @filename: node_modules/knex/index.d.ts

// A bunch of random text to move the positions forward
// A bunch of random text to move the positions forward
// A bunch of random text to move the positions forward
// A bunch of random text to move the positions forward
// A bunch of random text to move the positions forward
// A bunch of random text to move the positions forward
// A bunch of random text to move the positions forward
// A bunch of random text to move the positions forward
// A bunch of random text to move the positions forward

type ShouldJustBeAny = [any][0];

declare namespace knex {
  export { Knex };
}

declare namespace Knex {
  interface Interface {
    method(): ShouldJustBeAny;
  }
}

export = knex;

// @filename: index.ts

import "knex";
declare module "knex" {
  namespace Knex {
    function newFunc(): Knex.Interface;
  }
}


