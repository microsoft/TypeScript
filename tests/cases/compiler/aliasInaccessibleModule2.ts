// @target: es2015
// @declaration: true
namespace M {
    namespace N {
        class C {
        }
        
    }
    import R = N;
    export import X = R;
}