//// [tests/cases/compiler/declarationEmitAugmentationUsesCorrectSourceFile.ts] ////

//// [index.d.ts]
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

//// [index.ts]
import "knex";
declare module "knex" {
  namespace Knex {
    function newFunc(): Knex.Interface;
  }
}




//// [index.js]
import "knex";


//// [index.d.ts]
import "knex";
declare module "knex" {
    namespace Knex {
        function newFunc(): Knex.Interface;
    }
}
