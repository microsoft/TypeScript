// @declaration: true

declare module outer {
  interface Beta { }
  module inner {
    // .d.ts emit: should be 'extends outer.Beta'
    export interface Beta extends outer.Beta { }
  }
}
