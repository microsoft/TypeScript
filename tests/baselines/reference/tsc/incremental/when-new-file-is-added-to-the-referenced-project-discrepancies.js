0:: Add class3 to project1 and build it
Ts buildinfo will not be updated in incremental build so it will have semantic diagnostics cached from previous build
But in clean build because of global diagnostics, semantic diagnostics are not queried so not cached in tsbuildinfo
*** Supplied discrepancy explanation but didnt find any difference