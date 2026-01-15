// https://github.com/Microsoft/TypeScript/issues/19799
// @experimentalDecorators: true
// @emitDecoratorMetadata: true
// @filename: yoha.ts
export class Yoha {}

// @filename: index.ts
import {Yoha} from './yoha';

function foo(...args: any[]) {}

class Bar {
  yoha(@foo yoha, bar: Yoha) {}
  //                   ^^^^
}

// @filename: index2.ts
import {Yoha} from './yoha';

function foo(...args: any[]) {}

class Bar {
  yoha(@foo yoha, ...bar: Yoha[]) {}
  //                      ^^^^
}