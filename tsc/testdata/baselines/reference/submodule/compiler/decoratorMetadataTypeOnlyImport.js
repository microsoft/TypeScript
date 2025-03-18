//// [tests/cases/compiler/decoratorMetadataTypeOnlyImport.ts] ////

//// [a.ts]
import { List } from 'unknown-module';
export type MyList = List<number>;

//// [b.ts]
import { type MyList } from './a';

declare var Decorator: any;

class Foo {
  @Decorator myList?: MyList;
}


//// [a.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//// [b.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Foo {
    @Decorator
    myList;
}
