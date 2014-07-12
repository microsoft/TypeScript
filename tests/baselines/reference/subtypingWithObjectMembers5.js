//// [subtypingWithObjectMembers5.js]
// N and M have the same name, same accessibility, same optionality, and N is a subtype of M
// foo properties are valid, bar properties cause errors in the derived class declarations
var NotOptional;
(function (NotOptional) {
    var B = (function () {
        function B() {
        }
        return B;
    })();

    var B2 = (function () {
        function B2() {
        }
        return B2;
    })();

    var B3 = (function () {
        function B3() {
        }
        return B3;
    })();
})(NotOptional || (NotOptional = {}));

// same cases as above but with optional
var Optional;
(function (Optional) {
    var B = (function () {
        function B() {
        }
        return B;
    })();

    var B2 = (function () {
        function B2() {
        }
        return B2;
    })();

    var B3 = (function () {
        function B3() {
        }
        return B3;
    })();
})(Optional || (Optional = {}));
