//// [tests/cases/conformance/parser/ecmascript5/RegularExpressions/parseRegularExpressionMixedWithComments.ts] ////

//// [parseRegularExpressionMixedWithComments.ts]
var regex1 = / asdf /;
var regex2 = /**// asdf /;
var regex3 = /**///**/ asdf /       // should be a comment line
1;
var regex4 = /**// /**/asdf /;
var regex5 = /**// asdf/**/ /;

//// [parseRegularExpressionMixedWithComments.js]
var regex1 = / asdf /;
var regex2 = /**/ / asdf /;
var regex3 = /**/ //**/ asdf /       // should be a comment line
 1;
var regex4 = /**/ Math.pow(/**/ / /, /asdf /);
var regex5 = /**/ Math.pow(/**/ / asdf/, / /);
