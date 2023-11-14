//// [tests/cases/conformance/es2018/invalidTaggedTemplateEscapeSequences.ts] ////

//// [invalidTaggedTemplateEscapeSequences.ts]
function tag (str: any, ...args: any[]): any {
  return str
}

const a = tag`123`
const b = tag`123 ${100}`
const x = tag`\u{hello} ${ 100 } \xtraordinary ${ 200 } wonderful ${ 300 } \uworld`;
const y = `\u{hello} ${ 100 } \xtraordinary ${ 200 } wonderful ${ 300 } \uworld`; // should error with NoSubstitutionTemplate
const z = tag`\u{hello} \xtraordinary wonderful \uworld` // should work with Tagged NoSubstitutionTemplate

const a1 = tag`${ 100 }\0` // \0
const a2 = tag`${ 100 }\00` // \\00
const a3 = tag`${ 100 }\u` // \\u
const a4 = tag`${ 100 }\u0` // \\u0
const a5 = tag`${ 100 }\u00` // \\u00
const a6 = tag`${ 100 }\u000` // \\u000
const a7 = tag`${ 100 }\u0000` // \u0000
const a8 = tag`${ 100 }\u{` // \\u{
const a9 = tag`${ 100 }\u{10FFFF}` // \\u{10FFFF
const a10 = tag`${ 100 }\u{1f622` // \\u{1f622
const a11 = tag`${ 100 }\u{1f622}` // \u{1f622}
const a12 = tag`${ 100 }\x` // \\x
const a13 = tag`${ 100 }\x0` // \\x0
const a14 = tag`${ 100 }\x00` // \x00


/// [Declarations] ////



//// [invalidTaggedTemplateEscapeSequences.d.ts]
declare function tag(str: any, ...args: any[]): any;
declare const a: invalid;
declare const b: invalid;
declare const x: invalid;
declare const y = "\\u{hello} 100 \\xtraordinary 200 wonderful 300 \\uworld";
declare const z: invalid;
declare const a1: invalid;
declare const a2: invalid;
declare const a3: invalid;
declare const a4: invalid;
declare const a5: invalid;
declare const a6: invalid;
declare const a7: invalid;
declare const a8: invalid;
declare const a9: invalid;
declare const a10: invalid;
declare const a11: invalid;
declare const a12: invalid;
declare const a13: invalid;
declare const a14: invalid;

/// [Errors] ////

invalidTaggedTemplateEscapeSequences.ts(5,11): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
invalidTaggedTemplateEscapeSequences.ts(6,11): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
invalidTaggedTemplateEscapeSequences.ts(7,11): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
invalidTaggedTemplateEscapeSequences.ts(8,15): error TS1125: Hexadecimal digit expected.
invalidTaggedTemplateEscapeSequences.ts(8,33): error TS1125: Hexadecimal digit expected.
invalidTaggedTemplateEscapeSequences.ts(8,75): error TS1125: Hexadecimal digit expected.
invalidTaggedTemplateEscapeSequences.ts(9,11): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
invalidTaggedTemplateEscapeSequences.ts(11,12): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
invalidTaggedTemplateEscapeSequences.ts(12,12): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
invalidTaggedTemplateEscapeSequences.ts(13,12): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
invalidTaggedTemplateEscapeSequences.ts(14,12): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
invalidTaggedTemplateEscapeSequences.ts(15,12): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
invalidTaggedTemplateEscapeSequences.ts(16,12): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
invalidTaggedTemplateEscapeSequences.ts(17,12): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
invalidTaggedTemplateEscapeSequences.ts(18,12): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
invalidTaggedTemplateEscapeSequences.ts(19,12): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
invalidTaggedTemplateEscapeSequences.ts(20,13): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
invalidTaggedTemplateEscapeSequences.ts(21,13): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
invalidTaggedTemplateEscapeSequences.ts(22,13): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
invalidTaggedTemplateEscapeSequences.ts(23,13): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
invalidTaggedTemplateEscapeSequences.ts(24,13): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.


==== invalidTaggedTemplateEscapeSequences.ts (21 errors) ====
    function tag (str: any, ...args: any[]): any {
      return str
    }
    
    const a = tag`123`
              ~~~~~~~~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
    const b = tag`123 ${100}`
              ~~~~~~~~~~~~~~~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
    const x = tag`\u{hello} ${ 100 } \xtraordinary ${ 200 } wonderful ${ 300 } \uworld`;
              ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
    const y = `\u{hello} ${ 100 } \xtraordinary ${ 200 } wonderful ${ 300 } \uworld`; // should error with NoSubstitutionTemplate
                  
!!! error TS1125: Hexadecimal digit expected.
                                    
!!! error TS1125: Hexadecimal digit expected.
                                                                              
!!! error TS1125: Hexadecimal digit expected.
    const z = tag`\u{hello} \xtraordinary wonderful \uworld` // should work with Tagged NoSubstitutionTemplate
              ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
    
    const a1 = tag`${ 100 }\0` // \0
               ~~~~~~~~~~~~~~~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
    const a2 = tag`${ 100 }\00` // \\00
               ~~~~~~~~~~~~~~~~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
    const a3 = tag`${ 100 }\u` // \\u
               ~~~~~~~~~~~~~~~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
    const a4 = tag`${ 100 }\u0` // \\u0
               ~~~~~~~~~~~~~~~~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
    const a5 = tag`${ 100 }\u00` // \\u00
               ~~~~~~~~~~~~~~~~~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
    const a6 = tag`${ 100 }\u000` // \\u000
               ~~~~~~~~~~~~~~~~~~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
    const a7 = tag`${ 100 }\u0000` // \u0000
               ~~~~~~~~~~~~~~~~~~~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
    const a8 = tag`${ 100 }\u{` // \\u{
               ~~~~~~~~~~~~~~~~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
    const a9 = tag`${ 100 }\u{10FFFF}` // \\u{10FFFF
               ~~~~~~~~~~~~~~~~~~~~~~~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
    const a10 = tag`${ 100 }\u{1f622` // \\u{1f622
                ~~~~~~~~~~~~~~~~~~~~~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
    const a11 = tag`${ 100 }\u{1f622}` // \u{1f622}
                ~~~~~~~~~~~~~~~~~~~~~~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
    const a12 = tag`${ 100 }\x` // \\x
                ~~~~~~~~~~~~~~~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
    const a13 = tag`${ 100 }\x0` // \\x0
                ~~~~~~~~~~~~~~~~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
    const a14 = tag`${ 100 }\x00` // \x00
                ~~~~~~~~~~~~~~~~~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
    