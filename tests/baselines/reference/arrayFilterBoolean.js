//// [arrayFilterBoolean.ts]
const mixed = [undefined, "string", null]
const mixedReadonly: Readonly<typeof mixed> = [undefined, "string", null]

const shouldBeJustStringForMutableArray = mixed.filter(Boolean)

const shouldBeJustStringForReadonlyArray = mixedReadonly.filter(Boolean)

//// [arrayFilterBoolean.js]
"use strict";
var mixed = [undefined, "string", null];
var mixedReadonly = [undefined, "string", null];
var shouldBeJustStringForMutableArray = mixed.filter(Boolean);
var shouldBeJustStringForReadonlyArray = mixedReadonly.filter(Boolean);
