declare module "m" {
    namespace x {
        interface c {
        }
    }
    export import a = x.c;
    export = x;
}