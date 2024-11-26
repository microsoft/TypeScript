// @experimentalDecorators: true

declare function y(...args: any[]): any;
type T = number;
@y(1 as T, () => C) // <-- T should be resolved to the type alias, not the type parameter of the class; C should resolve to the class
class C<T> {
    @y(null as T) // <-- y should resolve to the function declaration, not the parameter; T should resolve to the type parameter of the class
    method(@y x, y) {} // <-- decorator y should be resolved at the class declaration, not the parameter.
}