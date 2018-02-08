// @noImportCycles: true

// @filename: noImportCyclesError2.ts
import Dummy1 = require("./noImportCyclesError1");
export default class Dummy2 {}

// @filename: noImportCyclesError1.ts
import Dummy2 = require("./noImportCyclesError2");
export default class Dummy1 {}

