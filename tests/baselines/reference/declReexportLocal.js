//// [declReexportLocal.ts]
declare namespace foo.bar {
  class Local {}
  export {Local as ExportedAlias};
  export class Exported {}
}

module m3 {
  export const Exported = foo.bar.Exported;
  export const ExportedAlias = foo.bar.ExportedAlias;
}


//// [declReexportLocal.js]
var m3;
(function (m3) {
    m3.Exported = foo.bar.Exported;
    m3.ExportedAlias = foo.bar.ExportedAlias;
})(m3 || (m3 = {}));


//// [declReexportLocal.d.ts]
declare namespace foo.bar {
    class Local {
    }
    export { Local as ExportedAlias };
    export class Exported {
    }
}
declare module m3 {
    const Exported: typeof foo.bar.Exported;
    const ExportedAlias: typeof foo.bar.ExportedAlias;
}
