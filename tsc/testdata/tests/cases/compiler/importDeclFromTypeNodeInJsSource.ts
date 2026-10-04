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
declare module "nestNamespaceModule" {
    namespace a1.a2 {
        class d { }
    }

    namespace a1.a2.n3 {
        class c { }
    }
    export = a1.a2;
}
declare module "renameModule" {
    namespace a.b {
        class c { }
    }
    import d = a.b;
    export = d;
}

// @filename: /src/b.js
import { EventEmitter } from 'events';
import { n3, d } from 'nestNamespaceModule';
import { c } from 'renameModule';

export class Foo extends EventEmitter {
}

export class Foo2 extends n3.c {
}

export class Foo3 extends d {
}

export class Foo4 extends c {

}