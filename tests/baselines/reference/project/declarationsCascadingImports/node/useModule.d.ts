declare module "quotedm1" {
    import m4 = require("m4");
    class v {
        c: m4.d;
    }
}
declare module "quotedm2" {
    import m1 = require("quotedm1");
    var c: m1.v;
}
