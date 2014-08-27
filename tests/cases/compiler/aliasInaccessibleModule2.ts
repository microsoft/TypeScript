// @declaration: true
module M {
    module N {
        class C {
        }
        
    }
    import R = N;
    export import X = R;
}