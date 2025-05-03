//// [tests/cases/compiler/namespaceJsxPreserve1.tsx] ////

//// [namespaceJsxPreserve1.tsx]
/// <reference path="/.lib/react16.d.ts" />

export namespace form {
  export const input = null;

  export const HiddenInput = () => null;

  export const test1 = <input />;
  export const test2 = <HiddenInput />;
}


//// [namespaceJsxPreserve1.jsx]
"use strict";
/// <reference path="react16.d.ts" />
Object.defineProperty(exports, "__esModule", { value: true });
exports.form = void 0;
var form;
(function (form) {
    form.input = null;
    form.HiddenInput = function () { return null; };
    form.test1 = <input />;
    form.test2 = <form.HiddenInput />;
})(form || (exports.form = form = {}));
