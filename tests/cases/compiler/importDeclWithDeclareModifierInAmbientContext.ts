declare module "m" {
    namespace x {
        interface c {
        }
    }
    declare export import a = x.c;
    var b: a;
}
