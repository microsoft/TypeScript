//// [tests/cases/compiler/circularModuleImports.ts] ////

//// [circularModuleImports.ts]
namespace M
 
{
 
    import A = B;
 
    import B = A;
 
}


//// [circularModuleImports.js]
