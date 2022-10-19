1:: fix error declarationMap
*** Needs explanation
File: /src/outfile.d.ts
CleanBuild:
declare const x = 10;
declare const y = 10;
//# sourceMappingURL=outFile.d.ts.map
IncrementalBuild:
declare const x = 10;
declare const y = 10;
