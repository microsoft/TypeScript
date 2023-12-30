// @Filename: /a.d.ts
// @declaration: true
declare namespace ns {
  class Local {}
  export {Local as ExportedAlias};

  namespace _debugger {
    class Foo {}
  }
  export {_debugger as debugger};
  export function getFoo(): _debugger.Foo;
}

// @Filename: /b.ts
export const NsExportedAlias = ns.ExportedAlias;
export const nsDebuggerFoo = ns.getFoo();
