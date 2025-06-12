//// [tests/cases/compiler/computerPropertiesInES5ShouldBeTransformed.ts] ////

//// [computerPropertiesInES5ShouldBeTransformed.ts]
const b = ({ [`key`]: renamed }) => renamed;

//// [computerPropertiesInES5ShouldBeTransformed.js]
const b = ({ [`key`]: renamed }) => renamed;
