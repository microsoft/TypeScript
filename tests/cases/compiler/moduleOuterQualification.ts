// @target: es2015
// @declaration: true

declare namespace outer {
  interface Beta { }
  namespace inner {
    // .d.ts emit: should be 'extends outer.Beta'
    export interface Beta extends outer.Beta { }
  }
}
