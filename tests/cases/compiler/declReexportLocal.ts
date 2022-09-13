// @declaration: true
declare namespace foo.bar {
  class Local {}
  export {Local as ExportedAlias};
  export class Exported {}
}

module m3 {
  export const Exported = foo.bar.Exported;
  export const ExportedAlias = foo.bar.ExportedAlias;
}
