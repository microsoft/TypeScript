/// <reference path='fourslash.ts' />

// @allowJs: true
// @Filename: /a.js
////function [|regular|]() {}
////regular.prototype.method = function() { this.x = 1; };
////
////function* gen() {}
////gen.prototype.next = gen.prototype.next;
////gen.prototype.return = gen.prototype.return;

// Regular constructor functions should still trigger the convert-to-class suggestion
// but generator functions should not
verify.getSuggestionDiagnostics([{
    message: "This constructor function may be converted to a class declaration.",
    code: 80002,
}]);