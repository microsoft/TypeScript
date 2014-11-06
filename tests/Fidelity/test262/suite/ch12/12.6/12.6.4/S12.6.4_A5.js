// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * The production IterationStatement: "for (var VariableDeclarationNoIn in Expression) Statement"
 *
 * @path ch12/12.6/12.6.4/S12.6.4_A5.js
 * @description Using hierarchical Object as an Expression is appropriate. The depth is two
 */

__hash__map={a:{aa:1,ab:2,ac:3,ad:4},b:{ba:1,bb:2,bc:3,bd:4},c:{ca:1,cb:2,cc:3,cd:4},d:{da:1,db:2,dc:3,dd:4}};

__arr = "";

for(__key in __hash__map){
    for (__ind in __hash__map[__key]){
        __arr+=("" + __ind + __hash__map[__key][__ind]);
    }
}

if(!(
(__arr.indexOf("aa1")!==-1)&
(__arr.indexOf("ab2")!==-1)&
(__arr.indexOf("ac3")!==-1)&
(__arr.indexOf("ad4")!==-1)&
(__arr.indexOf("ba1")!==-1)&
(__arr.indexOf("bb2")!==-1)&
(__arr.indexOf("bc3")!==-1)&
(__arr.indexOf("bd4")!==-1)&
(__arr.indexOf("ca1")!==-1)&
(__arr.indexOf("cb2")!==-1)&
(__arr.indexOf("cc3")!==-1)&
(__arr.indexOf("cd4")!==-1)&
(__arr.indexOf("da1")!==-1)&
(__arr.indexOf("db2")!==-1)&
(__arr.indexOf("dc3")!==-1)&
(__arr.indexOf("dd4")!==-1)
)) $ERROR('#1: The nested for-in Statement applied to hierarchial object works properly as described in the Standard');




