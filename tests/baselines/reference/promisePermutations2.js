//// [promisePermutations2.js]
// same as promisePermutations but without the same overloads in Promise<T>

var r1;
var r1a = r1.then(testFunction, testFunction, testFunction);
var r1b = r1.then(testFunction, testFunction, testFunction).then(testFunction, testFunction, testFunction);
var r1c = r1.then(testFunctionP, testFunctionP, testFunctionP);
var s1;
var s1a = s1.then(testFunction, testFunction, testFunction);
var s1b = s1.then(testFunctionP, testFunctionP, testFunctionP);
var s1c = s1.then(testFunctionP, testFunction, testFunction);
var s1d = s1.then(testFunctionP, testFunction, testFunction).then(testFunction, testFunction, testFunction);

var r2;
var r2a = r2.then(testFunction2, testFunction2, testFunction2);
var r2b = r2.then(testFunction2, testFunction2, testFunction2).then(testFunction2, testFunction2, testFunction2);
var s2;
var s2a = s2.then(testFunction2, testFunction2, testFunction2);
var s2b = s2.then(testFunction2P, testFunction2P, testFunction2P);
var s2c = s2.then(testFunction2P, testFunction2, testFunction2);
var s2d = s2.then(testFunction2P, testFunction2, testFunction2).then(testFunction2, testFunction2, testFunction2);

var r3;
var r3a = r3.then(testFunction3, testFunction3, testFunction3);
var r3b = r3.then(testFunction3, testFunction3, testFunction3).then(testFunction3, testFunction3, testFunction3);
var s3;
var s3a = s3.then(testFunction3, testFunction3, testFunction3);
var s3b = s3.then(testFunction3P, testFunction3P, testFunction3P);
var s3c = s3.then(testFunction3P, testFunction3, testFunction3);
var s3d = s3.then(testFunction3P, testFunction3, testFunction3).then(testFunction3, testFunction3, testFunction3);

var r4;
var sIPromise;
var sPromise;
var r4a = r4.then(testFunction4, testFunction4, testFunction4);
var r4b = r4.then(sIPromise, testFunction4, testFunction4).then(sIPromise, testFunction4, testFunction4);
var s4;
var s4a = s4.then(testFunction4, testFunction4, testFunction4);
var s4b = s4.then(testFunction4P, testFunction4P, testFunction4P);
var s4c = s4.then(testFunction4P, testFunction4, testFunction4);
var s4d = s4.then(sIPromise, testFunction4P, testFunction4).then(sIPromise, testFunction4P, testFunction4);

var r5;
var r5a = r5.then(testFunction5, testFunction5, testFunction5);
var r5b = r5.then(sIPromise, sIPromise, sIPromise).then(sIPromise, sIPromise, sIPromise);
var s5;
var s5a = s5.then(testFunction5, testFunction5, testFunction5);
var s5b = s5.then(testFunction5P, testFunction5P, testFunction5P);
var s5c = s5.then(testFunction5P, testFunction5, testFunction5);
var s5d = s5.then(sPromise, sPromise, sPromise).then(sIPromise, sIPromise, sIPromise);

var r6;
var r6a = r6.then(testFunction6, testFunction6, testFunction6);
var r6b = r6.then(sIPromise, sIPromise, sIPromise).then(sIPromise, sIPromise, sIPromise);
var s6;
var s6a = s6.then(testFunction6, testFunction6, testFunction6);
var s6b = s6.then(testFunction6P, testFunction6P, testFunction6P);
var s6c = s6.then(testFunction6P, testFunction6, testFunction6);
var s6d = s6.then(sPromise, sPromise, sPromise).then(sIPromise, sIPromise, sIPromise);

var r7;
var r7a = r7.then(testFunction7, testFunction7, testFunction7);
var r7b = r7.then(sIPromise, sIPromise, sIPromise).then(sIPromise, sIPromise, sIPromise);
var s7;
var s7a = r7.then(testFunction7, testFunction7, testFunction7);
var s7b = r7.then(testFunction7P, testFunction7P, testFunction7P);
var s7c = r7.then(testFunction7P, testFunction7, testFunction7);
var s7d = r7.then(sPromise, sPromise, sPromise).then(sPromise, sPromise, sPromise);

var r8;
var nIPromise;
var nPromise;
var r8a = r8.then(testFunction8, testFunction8, testFunction8);
var r8b = r8.then(nIPromise, nIPromise, nIPromise).then(nIPromise, nIPromise, nIPromise);
var s8;
var s8a = s8.then(testFunction8, testFunction8, testFunction8);
var s8b = s8.then(testFunction8P, testFunction8P, testFunction8P);
var s8c = s8.then(testFunction8P, testFunction8, testFunction8);
var s8d = s8.then(nIPromise, nIPromise, nIPromise).then(nIPromise, nIPromise, nIPromise);

var r9;
var r9a = r9.then(testFunction9, testFunction9, testFunction9);
var r9b = r9.then(sIPromise, sIPromise, sIPromise);
var r9c = r9.then(nIPromise, nIPromise, nIPromise);
var r9d = r9.then(testFunction, sIPromise, nIPromise);
var r9e = r9.then(testFunction, nIPromise, sIPromise).then(sIPromise, sIPromise, sIPromise);
var s9;
var s9a = s9.then(testFunction9, testFunction9, testFunction9);
var s9b = s9.then(testFunction9P, testFunction9P, testFunction9P);
var s9c = s9.then(testFunction9P, testFunction9, testFunction9);
var s9d = s9.then(sPromise, sPromise, sPromise);
var s9e = s9.then(nPromise, nPromise, nPromise);
var s9f = s9.then(testFunction, sIPromise, nIPromise);
var s9g = s9.then(testFunction, nIPromise, sIPromise).then(sIPromise, sIPromise, sIPromise);

var r10 = testFunction10(function (x) {
    return x;
});
var r10a = r10.then(testFunction10, testFunction10, testFunction10);
var r10b = r10.then(sIPromise, sIPromise, sIPromise);
var r10c = r10.then(nIPromise, nIPromise, nIPromise);
var r10d = r10.then(testFunction, sIPromise, nIPromise);
var r10e = r10.then(testFunction, nIPromise, sIPromise).then(sIPromise, sIPromise, sIPromise);
var s10 = testFunction10P(function (x) {
    return x;
});
var s10a = s10.then(testFunction10, testFunction10, testFunction10);
var s10b = s10.then(testFunction10P, testFunction10P, testFunction10P);
var s10c = s10.then(testFunction10P, testFunction10, testFunction10);
var s10d = s10.then(sPromise, sPromise, sPromise);
var s10e = s10.then(nIPromise, nPromise, nIPromise);
var s10f = s10.then(testFunctionP, sIPromise, nIPromise);
var s10g = s10.then(testFunctionP, nIPromise, sIPromise).then(sPromise, sIPromise, sIPromise);

var r11;
var r11a = r11.then(testFunction11, testFunction11, testFunction11);
var s11;
var s11a = s11.then(testFunction11, testFunction11, testFunction11);
var s11b = s11.then(testFunction11P, testFunction11P, testFunction11P);
var s11c = s11.then(testFunction11P, testFunction11, testFunction11);

var r12 = testFunction12(function (x) {
    return x;
});
var r12a = r12.then(testFunction12, testFunction12, testFunction12);
var s12 = testFunction12(function (x) {
    return x;
});
var s12a = s12.then(testFunction12, testFunction12, testFunction12);
var s12b = s12.then(testFunction12P, testFunction12P, testFunction12P);
var s12c = s12.then(testFunction12P, testFunction12, testFunction12); // ok
