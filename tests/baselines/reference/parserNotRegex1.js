//// [tests/cases/conformance/parser/ecmascript5/parserNotRegex1.ts] ////

//// [parserNotRegex1.ts]
  if (a.indexOf(-(4/3)))      // We should not get a regex here because of the / in the comment.
  {
    return true;
  }

//// [parserNotRegex1.js]
if (a.indexOf(-(4 / 3))) // We should not get a regex here because of the / in the comment.
 {
    return true;
}
