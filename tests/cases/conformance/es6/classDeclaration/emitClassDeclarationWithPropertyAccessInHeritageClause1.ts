class B {}
function foo() {
    return {B: B};
}
class C extends (foo()).B {}