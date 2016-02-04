//// [noImplicitAnyInContextuallyTypesFunctionParameter.ts]

var regexMatchList = ['', ''];
regexMatchList.forEach(match => ''.replace(match, ''));


//// [noImplicitAnyInContextuallyTypesFunctionParameter.js]
var regexMatchList = ['', ''];
regexMatchList.forEach(function (match) { return ''.replace(match, ''); });
