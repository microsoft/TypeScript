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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
// https://github.com/Microsoft/TypeScript/issues/11177
var Bluebird = require("bluebird");
function a() {
    return __awaiter(this, void 0, Bluebird, function* () {
        try {
            const b = function b() {
                return __awaiter(this, void 0, Bluebird, function* () {
                    try {
                        yield Bluebird.resolve(); // -- remove this and it compiles
                    }
                    catch (error) { }
                });
            };
            yield b(); // -- or remove this and it compiles
        }
        catch (error) { }
    });
}
