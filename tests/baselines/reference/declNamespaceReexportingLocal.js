//// [tests/cases/compiler/declNamespaceReexportingLocal.ts] ////

//// [a.d.ts]
declare namespace ns {
  class Local {}
  export {Local as ExportedAlias};

  namespace _debugger {
    class Foo {}
  }
  export {_debugger as debugger};
  export function getFoo(): _debugger.Foo;
}

//// [b.ts]
export const NsExportedAlias = ns.ExportedAlias;
export const nsDebuggerFoo = ns.getFoo();


//// [b.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.nsDebuggerFoo = exports.NsExportedAlias = void 0;
exports.NsExportedAlias = ns.ExportedAlias;
exports.nsDebuggerFoo = ns.getFoo();


//// [b.d.ts]
export declare const NsExportedAlias: typeof ns.ExportedAlias;
export declare const nsDebuggerFoo: ns.debugger.Foo;
