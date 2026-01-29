//// [tests/cases/compiler/esModuleInteropUsesExportStarWhenDefaultPlusNames.ts] ////

//// [esModuleInteropUsesExportStarWhenDefaultPlusNames.ts]
import Deps, { var2 } from './dep';
void Deps;
void var2;

//// [esModuleInteropUsesExportStarWhenDefaultPlusNames.js]
import Deps, { var2 } from './dep';
void Deps;
void var2;
