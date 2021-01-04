//// [readyStateChangeEventOnDocument.ts]
document.addEventListener('readystatechange', event => event.target?.readyState === 'complete'); // should not error


//// [readyStateChangeEventOnDocument.js]
document.addEventListener('readystatechange', function (event) { var _a; return ((_a = event.target) === null || _a === void 0 ? void 0 : _a.readyState) === 'complete'; }); // should not error
