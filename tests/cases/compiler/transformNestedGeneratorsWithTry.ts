// @target: ES5
// @lib: es5,es6
// @filename: main.ts
// https://github.com/Microsoft/TypeScript/issues/11177
import * as Bluebird from 'bluebird';
async function a(): Bluebird<void> {
  try {
    const b = async function b(): Bluebird<void> {
      try {
        await Bluebird.resolve(); // -- remove this and it compiles
      } catch (error) { }
    };

    await b(); // -- or remove this and it compiles
  } catch (error) { }
}

// @filename: bluebird.d.ts
declare module "bluebird" {
    type Bluebird<T> = Promise<T>;
    const Bluebird: typeof Promise;
    export = Bluebird;
}