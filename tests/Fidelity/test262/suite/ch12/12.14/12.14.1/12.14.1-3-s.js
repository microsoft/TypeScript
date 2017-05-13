/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above 
/// copyright and this notice and otherwise comply with the Use Terms.
/**
 * @path ch12/12.14/12.14.1/12.14.1-3-s.js
 * @description Strict Mode - SyntaxError isn't thrown if a TryStatement with a Catch occurs within strict code and the Identifier of the Catch production is EVAL but throws SyntaxError if it is eval
 * @onlyStrict
 */


function testcase() {
        "use strict";

       try{ eval(" try { \
             throw new Error(\"...\");\
             return false;\
         } catch (EVAL) {\
             try\
             {\
               throw new Error(\"...\");\
             }catch(eval)\
             {\
                 return EVAL instanceof Error;\
              }\
         }");
         return false;
        } catch(e) {
             return e instanceof SyntaxError;
        }
    }
runTestCase(testcase);
