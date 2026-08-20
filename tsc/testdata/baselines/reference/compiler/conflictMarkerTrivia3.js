//// [tests/cases/compiler/conflictMarkerTrivia3.tsx] ////

//// [conflictMarkerTrivia3.tsx]
const x = <div>
<<<<<<< HEAD

//// [conflictMarkerTrivia3.js]
"use strict";
const x = <div></>;
