// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * If (Evaluate Statement).type is "break" and (Evaluate Statement).target is in the current label set, (normal, (Evaluate Statement), empty) is returned while evaluating a "var-loop"
 *
 * @path ch12/12.6/12.6.3/S12.6.3_A12.1_T3.js
 * @description Trying to break non-existent label
 * @negative
 */

__str="";

//////////////////////////////////////////////////////////////////////////////
//CHECK#1
outer:for(var index=0;index<4;index+=1){
    nested:for(var index_n=0;index_n<=index;index_n++){
        if(index*index_n >= 4)break nonexist;
        __str+=""+index+index_n;
    }
}
//
//////////////////////////////////////////////////////////////////////////////

