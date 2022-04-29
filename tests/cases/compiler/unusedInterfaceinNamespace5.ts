//@noUnusedLocals:true
//@noUnusedParameters:true

namespace Validation {
    interface i1 {

    }

    export interface i2 {

    }

    interface i3 extends i1 {

    }

    export class c1 implements i3 {

    }

    interface i4 {

    }

    export let c2:i4;
}