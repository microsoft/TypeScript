/// <reference path='fourslash.ts' />

// @Filename: /basic.tsx
//// const jsx = (
////    <div/*0*/>
////    </div>
//// );

// @Filename: /attrs.tsx
//// const jsx = (
////    <div/*1*/ style={{ color: 'red' }}>
////       <p>
////          <img />
////       </p>
////    </div>
//// );

// @Filename: /selfClosing.tsx
//// const jsx = (
////    <div>
////       <p>
////          <img/*2*/ />
////       </p>
////    </div>
//// );

// @Filename: /longName.tsx
//// const jsx = (
////     <someNamespa/*3*/ce.Thing>
////     </someNamespace.Thing>
//// );

// @FileName: /invalid1.tsx
//// const jsx = (
////     <div/*4*/>
////         <div>
////     </div>
//// );

// @FileName: /invalid2.tsx
//// const jsx = (
////     <div>
////         <div/*5*/>
////     </div>
//// );

// @FileName: /fragment.tsx
//// const jsx = (
////     </*6*/>
////         <img />
////     </>
//// );

// @FileName: /mismatchedNames.tsx
//// const A = thing;
//// const B = thing;
//// const jsx = (
////     </**/A>
////     </B>
//// );



verify.jsxMirrorCursor( {
    "0": [{startLine: 1, startCharacter: 5, endLine: 1, endCharacter: 8},
            {startLine: 2, startCharacter: 6, endLine: 2, endCharacter: 9}],
    "1": [{startLine: 1, startCharacter: 5, endLine: 1, endCharacter: 8},
            {startLine: 5, startCharacter: 6, endLine: 5, endCharacter: 9}],
    "2": [],
    "3": [{startLine: 1, startCharacter: 5, endLine: 1, endCharacter: 25},
            {startLine: 2, startCharacter: 6, endLine: 2, endCharacter: 26}],
    "4": [],
    "5": [{startLine: 2, startCharacter: 9, endLine: 2, endCharacter: 12},
            {startLine: 3, startCharacter: 6, endLine: 3, endCharacter: 9}],
    "6": [{startLine: 1, startCharacter: 5, endLine: 1, endCharacter: 5},
           {startLine: 3, startCharacter: 6, endLine: 3, endCharacter: 6}],
    "7": [],
})