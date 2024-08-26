5:: no-change-run
Clean build will have check pending since it didnt type check
Incremental build has typechecked before this so wont have checkPending
TsBuild info text without affectedFilesPendingEmit:: /outfile.tsbuildinfo.readable.baseline.txt::
CleanBuild:
{
  "root": [
    "./src/a.ts",
    "./src/b.ts"
  ],
  "checkPending": true,
  "version": "FakeTSVersion"
}
IncrementalBuild:
{
  "root": [
    "./src/a.ts",
    "./src/b.ts"
  ],
  "version": "FakeTSVersion"
}
15:: no-change-run
Clean build will have check pending since it didnt type check
Incremental build has typechecked before this so wont have checkPending
TsBuild info text without affectedFilesPendingEmit:: /outfile.tsbuildinfo.readable.baseline.txt::
CleanBuild:
{
  "root": [
    "./src/a.ts",
    "./src/b.ts",
    "./src/c.ts"
  ],
  "checkPending": true,
  "version": "FakeTSVersion"
}
IncrementalBuild:
{
  "root": [
    "./src/a.ts",
    "./src/b.ts",
    "./src/c.ts"
  ],
  "errors": true,
  "version": "FakeTSVersion"
}