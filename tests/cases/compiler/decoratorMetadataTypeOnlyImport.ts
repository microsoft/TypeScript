// @experimentalDecorators: true
// @emitDecoratorMetadata: true

// @filename: ./a.ts
import { List } from 'unknown-module';
export type MyList = List<number>;

// @filename: ./b.ts
import { type MyList } from './a';

declare var Decorator: any;

class Foo {
  @Decorator myList?: MyList;
}
