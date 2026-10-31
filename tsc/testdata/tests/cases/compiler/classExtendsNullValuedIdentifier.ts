// @strict: true, false

const N = null;
class A extends N { constructor() { } }
class B extends (null) { constructor() { } }
class C extends null { constructor() { super(); } }
let n = null;
class D extends n { constructor() { } }
