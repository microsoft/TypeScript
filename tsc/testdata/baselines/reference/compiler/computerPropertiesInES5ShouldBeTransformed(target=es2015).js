//// [tests/cases/compiler/computerPropertiesInES5ShouldBeTransformed.ts] ////

//// [computerPropertiesInES5ShouldBeTransformed.ts]
const b = ({ [`key`]: renamed }) => renamed;

//// [computerPropertiesInES5ShouldBeTransformed.js]
"use strict";
const b = ({ [`key`]: renamed }) => renamed;
