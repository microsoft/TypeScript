//// [tests/cases/conformance/scanner/ecmascript5/scannerS7.4_A2_T2.ts] ////

//// [scannerS7.4_A2_T2.ts]
// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * Correct interpretation of multi line comments
 *
 * @path ch07/7.4/S7.4_A2_T2.js
 * @description Try use /*CHECK#1/. This is not closed multi line comment
 * @negative
 */

/*CHECK#1/



//// [scannerS7.4_A2_T2.js]
// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.
/**
 * Correct interpretation of multi line comments
 *
 * @path ch07/7.4/S7.4_A2_T2.js
 * @description Try use /*CHECK#1/. This is not closed multi line comment
 * @negative
 */
/*CHECK#1/

 
