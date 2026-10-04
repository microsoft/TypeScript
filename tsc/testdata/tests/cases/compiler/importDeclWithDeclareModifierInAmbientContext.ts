// @target: es2015
declare module "m" {
    namespace x {
        interface c {
        }
    }
    declare export import a = x.c;
    var b: a;
}
