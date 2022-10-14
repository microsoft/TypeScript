3:: no-change-run
Clean build tsbuildinfo for both projects will have compilerOptions with composite and emitDeclarationOnly
Incremental build will detect that it doesnt need to rebuild so tsbuild info for projects is from before which has option composite as true but emitDeclrationOnly as false
*** Supplied discrepancy explanation but didnt file any difference