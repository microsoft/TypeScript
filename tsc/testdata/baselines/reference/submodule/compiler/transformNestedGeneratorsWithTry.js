//// [tests/cases/compiler/transformNestedGeneratorsWithTry.ts] ////

//// [main.ts]
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

//// [bluebird.d.ts]
declare module "bluebird" {
    type Bluebird<T> = Promise<T>;
    const Bluebird: typeof Promise;
    export = Bluebird;
}

//// [main.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// https://github.com/Microsoft/TypeScript/issues/11177
const Bluebird = require("bluebird");
async function a() {
    try {
        const b = async function b() {
            try {
                await Bluebird.resolve(); // -- remove this and it compiles
            }
            catch (error) { }
        };
        await b(); // -- or remove this and it compiles
    }
    catch (error) { }
}
