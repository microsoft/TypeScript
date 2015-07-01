//// [parserNotRegex1.ts]
  if (a.indexOf(-(4/3)))      // We should not get a regex here becuase of the / in the comment.
  {
    return true;
  }

//// [parserNotRegex1.js]
if (a.indexOf(-(4 / 3))) {
    return true;
}
