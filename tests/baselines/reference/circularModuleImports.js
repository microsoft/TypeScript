//// [tests/cases/compiler/circularModuleImports.ts] ////

//// [circularModuleImports.ts]
module M
 
{
 
    import A = B;
 
    import B = A;
 
}


//// [circularModuleImports.js]
