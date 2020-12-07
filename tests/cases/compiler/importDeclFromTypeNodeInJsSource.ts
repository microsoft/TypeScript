// @target: esnext
// @module: commonjs
// @allowJs: true
// @checkJs: true
// @declaration: true
// @outDir: ./dist
// @filename: /src/node_modules/@types/node/index.d.ts
/// <reference path="events.d.ts" />
// @filename: /src/node_modules/@types/node/events.d.ts
declare module "events" {
    namespace EventEmitter {
        class EventEmitter {
            constructor();
        }
    }
    export = EventEmitter;
}

// @filename: /src/b.js
import { EventEmitter } from 'events';
class Foo extends EventEmitter {
    constructor() {
        super();
    }
}
export default Foo;