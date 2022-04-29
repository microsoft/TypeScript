// @module: amd
// @filename: helloInterface.ts
interface HelloInterface {
    world: any;
}

export = HelloInterface;

// @filename: helloNamespace.ts
namespace HelloNamespace {
    export type world = any;
}

export = HelloNamespace;

// @filename: world.ts
import HelloInterface = require("helloInterface");
import HelloNamespace = require("helloNamespace");

HelloInterface.world;
HelloNamespace.world;