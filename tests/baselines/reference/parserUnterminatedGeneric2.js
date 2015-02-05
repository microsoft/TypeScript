//// [parserUnterminatedGeneric2.ts]
declare module ng {
    interfaceICompiledExpression {
        (context: any, locals?: any): any;
        assign(context: any, value: any): any;
    }

    interface IQService {
        all(promises: IPromise_ < any > []): IPromise_<

//// [parserUnterminatedGeneric2.js]
