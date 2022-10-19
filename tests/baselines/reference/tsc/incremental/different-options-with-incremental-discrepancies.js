0:: with sourceMap
Incremental build did not emit and has .ts as signature so exports has all imported modules/referenced files
Clean build always uses d.ts for signature for testing thus does not contain non exported modules/referenced files that arent needed
Incremental and clean size of maps do not match:: exportedModulesMap:: File:: /src/project/tsconfig.tsbuildinfo.readable.baseline.txt
Incremental: {
  "./c.ts": [
    "./a.ts"
  ],
  "./d.ts": [
    "./b.ts"
  ]
}
Clean: {}
1:: should re-emit only js so they dont contain sourcemap
Incremental build did not emit and has .ts as signature so exports has all imported modules/referenced files
Clean build always uses d.ts for signature for testing thus does not contain non exported modules/referenced files that arent needed
Incremental and clean size of maps do not match:: exportedModulesMap:: File:: /src/project/tsconfig.tsbuildinfo.readable.baseline.txt
Incremental: {
  "./c.ts": [
    "./a.ts"
  ],
  "./d.ts": [
    "./b.ts"
  ]
}
Clean: {}
4:: no-change-run
Clean build tsbuildinfo will have compilerOptions {}
Incremental build will detect that it doesnt need to rebuild so tsbuild info is from before which has option declaration and declarationMap
*** Supplied discrepancy explanation but didnt file any difference
7:: no-change-run
Clean build tsbuildinfo will have compilerOptions {}
Incremental build will detect that it doesnt need to rebuild so tsbuild info is from before which has option declaration and declarationMap
*** Supplied discrepancy explanation but didnt file any difference