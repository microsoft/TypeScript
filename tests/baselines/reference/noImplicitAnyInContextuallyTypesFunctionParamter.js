//// [noImplicitAnyInContextuallyTypesFunctionParamter.ts]
var regexMatchList = ['', ''];
regexMatchList.forEach(match => ''.replace(match, ''));


//// [noImplicitAnyInContextuallyTypesFunctionParamter.js]
var regexMatchList = ['', ''];
regexMatchList.forEach(function (match) { return ''.replace(match, ''); });
