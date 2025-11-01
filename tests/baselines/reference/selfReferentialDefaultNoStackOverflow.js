//// [tests/cases/compiler/selfReferentialDefaultNoStackOverflow.ts] ////

//// [QSpinner.js]
import DefaultSpinner from './QSpinner'

export default {
  mixins: [DefaultSpinner],
  name: 'QSpinner'
}


//// [QSpinner.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var QSpinner_1 = require("./QSpinner");
exports.default = {
    mixins: [QSpinner_1.default],
    name: 'QSpinner'
};
