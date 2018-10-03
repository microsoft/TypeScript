// @allowJs: true
// @Filename: /a.js
////class C {
////    constructor() {
////      /** Doc */
////      this./**/x = 0;
////    }
////}

verify.quickInfoAt("", "(property) C.x: number", "Doc ");
