//// [tests/cases/compiler/declarationEmitVarInElidedBlock.ts] ////

//// [declarationEmitVarInElidedBlock.ts]
{
    var a = "";
}
export let b: typeof a;



//// [declarationEmitVarInElidedBlock.d.ts]
export declare let b: typeof a;
