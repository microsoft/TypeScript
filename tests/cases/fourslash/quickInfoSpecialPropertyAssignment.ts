// @allowJs: true
// @Filename: /a.js
////class C {
////    constructor() {
////      /** Doc */
////      this./*write*/x = 0;
////      this./*read*/x;
////    }
////}

verify.quickInfoAt("write", "(property) C.x: any", "Doc");
verify.quickInfoAt("read", "(property) C.x: number", "Doc");
