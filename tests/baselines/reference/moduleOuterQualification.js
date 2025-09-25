//// [tests/cases/compiler/moduleOuterQualification.ts] ////

//// [moduleOuterQualification.ts]
declare namespace outer {
  interface Beta { }
  namespace inner {
    // .d.ts emit: should be 'extends outer.Beta'
    export interface Beta extends outer.Beta { }
  }
}


//// [moduleOuterQualification.js]


//// [moduleOuterQualification.d.ts]
declare namespace outer {
    interface Beta {
    }
    namespace inner {
        interface Beta extends outer.Beta {
        }
    }
}
