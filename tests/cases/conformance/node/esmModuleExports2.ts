// @module: node20
// @checkJs: true
// @noEmit: true
// @esModuleInterop: true,false

// @Filename: /importer-cjs.cjs
const Foo = require("./exporter.mjs");
new Foo();

// @Filename: /importer-cts.cts
import Foo = require("./exporter.mjs");
new Foo();

import Foo2 from "./exporter.mjs";
new Foo2();

import * as Foo3 from "./exporter.mjs";
new Foo3();

import { Oops } from "./exporter.mjs";

// @Filename: /exporter.mts
export default class Foo {}
const oops = "oops";
export { oops as "module.exports" };