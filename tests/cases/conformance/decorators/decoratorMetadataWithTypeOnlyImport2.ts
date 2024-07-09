// @experimentalDecorators: true
// @emitDecoratorMetadata: true


// @filename: services.ts
export namespace Services {
  export class Service {}
}

// @filename: index.ts
import type { Services } from './services';

declare const decorator: any;
export class Main {
  @decorator()
  field: Services.Service;
}
