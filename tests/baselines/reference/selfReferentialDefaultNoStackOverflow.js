//// [tests/cases/compiler/selfReferentialDefaultNoStackOverflow.ts] ////

//// [QSpinner.js]
import DefaultSpinner from './QSpinner'

export default {
  mixins: [DefaultSpinner],
  name: 'QSpinner'
}


//// [QSpinner.js]
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const QSpinner_1 = __importDefault(require("./QSpinner"));
exports.default = {
    mixins: [QSpinner_1.default],
    name: 'QSpinner'
};
