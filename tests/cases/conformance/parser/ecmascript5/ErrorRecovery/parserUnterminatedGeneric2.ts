declare module ng {
    interfaceICompiledExpression {
        (context: any, locals?: any): any;
        assign(context: any, value: any): any;
    }

    interface IQService {
        all(promises: IPromise_ < any > []): IPromise_<