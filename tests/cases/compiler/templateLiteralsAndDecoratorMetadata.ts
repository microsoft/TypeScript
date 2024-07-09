// @experimentalDecorators: true
// @emitDecoratorMetadata: true
declare var format: any;
export class Greeter {
  @format("Hello, %s")
  greeting: `boss` | `employee` = `employee`;  //template literals on this line cause the issue
}