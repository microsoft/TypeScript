declare module "m2" {
    namespace X {
        interface I { }
    }
    function Y();
    export { Y as X };
    function Z(): X.I;
}

declare module "m2" {
    function Z2(): X.I;
}