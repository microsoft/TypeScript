2:: with declaration should not emit anything
Clean build tsbuildinfo will have compilerOptions with composite and declaration
Incremental build will detect that it doesnt need to rebuild so tsbuild info is from before which has option composite only
*** Supplied discrepancy explanation but didnt file any difference
4:: with declaration and declarationMap
*** Needs explanation
File: /src/project/a.d.ts
CleanBuild:
export declare const a = 10;
//# sourceMappingURL=a.d.ts.map
IncrementalBuild:
export declare const a = 10;

File: /src/project/b.d.ts
CleanBuild:
export declare const b = 10;
//# sourceMappingURL=b.d.ts.map
IncrementalBuild:
export declare const b = 10;

File: /src/project/c.d.ts
CleanBuild:
export declare const c = 10;
//# sourceMappingURL=c.d.ts.map
IncrementalBuild:
export declare const c = 10;

File: /src/project/d.d.ts
CleanBuild:
export declare const d = 10;
//# sourceMappingURL=d.d.ts.map
IncrementalBuild:
export declare const d = 10;

6:: with emitDeclarationOnly should not emit anything
Clean build tsbuildinfo will have compilerOptions with composite and emitDeclarationOnly
Incremental build will detect that it doesnt need to rebuild so tsbuild info is from before which has option composite only
*** Supplied discrepancy explanation but didnt file any difference
9:: with declaration should not emit anything
Clean build tsbuildinfo will have compilerOptions with composite and declaration
Incremental build will detect that it doesnt need to rebuild so tsbuild info is from before which has option composite only
*** Supplied discrepancy explanation but didnt file any difference
12:: declarationMap enabling
*** Needs explanation
File: /src/project/a.d.ts
CleanBuild:
export declare const a = 10;
//# sourceMappingURL=a.d.ts.map
IncrementalBuild:
export declare const a = 10;

File: /src/project/b.d.ts
CleanBuild:
export declare const b = 10;
//# sourceMappingURL=b.d.ts.map
IncrementalBuild:
export declare const b = 10;

File: /src/project/c.d.ts
CleanBuild:
export declare const c = 10;
//# sourceMappingURL=c.d.ts.map
IncrementalBuild:
export declare const c = 10;

File: /src/project/d.d.ts
CleanBuild:
export declare const d = 10;
//# sourceMappingURL=d.d.ts.map
IncrementalBuild:
export declare const d = 10;

13:: with sourceMap should not emit d.ts
*** Needs explanation
File: /src/project/a.d.ts
CleanBuild:
export declare const a = 10;
//# sourceMappingURL=a.d.ts.map
IncrementalBuild:
export declare const a = 10;

File: /src/project/b.d.ts
CleanBuild:
export declare const b = 10;
//# sourceMappingURL=b.d.ts.map
IncrementalBuild:
export declare const b = 10;

File: /src/project/c.d.ts
CleanBuild:
export declare const c = 10;
//# sourceMappingURL=c.d.ts.map
IncrementalBuild:
export declare const c = 10;

File: /src/project/d.d.ts
CleanBuild:
export declare const d = 10;
//# sourceMappingURL=d.d.ts.map
IncrementalBuild:
export declare const d = 10;
