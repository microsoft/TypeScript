//// [callSignaturesShouldBeResolvedBeforeSpecialization.js]
function foo() {
    var test;
    test("expects boolean instead of string"); // should not error - "test" should not expect a boolean
    test(true); // should error - string expected
}
