//// [tests/cases/compiler/templateLiteralsAndDecoratorMetadata.ts] ////

//// [templateLiteralsAndDecoratorMetadata.ts]
declare var format: any;
export class Greeter {
  @format("Hello, %s")
  greeting: `boss` | `employee` = `employee`;  //template literals on this line cause the issue
}

//// [templateLiteralsAndDecoratorMetadata.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Greeter = void 0;
class Greeter {
    @format("Hello, %s")
    greeting = `employee`; //template literals on this line cause the issue
}
exports.Greeter = Greeter;
