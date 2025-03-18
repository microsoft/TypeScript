//// [tests/cases/conformance/decorators/class/constructor/parameter/decoratorOnClassConstructorParameter5.ts] ////

//// [decoratorOnClassConstructorParameter5.ts]
// https://github.com/microsoft/TypeScript/issues/44931
interface IFoo { }
declare const IFoo: any;
class BulkEditPreviewProvider {
    static readonly Schema = 'vscode-bulkeditpreview';
    static emptyPreview = { scheme: BulkEditPreviewProvider.Schema };
    constructor(
        @IFoo private readonly _modeService: IFoo,
    ) { }
}

//// [decoratorOnClassConstructorParameter5.js]
class BulkEditPreviewProvider {
    _modeService;
    static Schema = 'vscode-bulkeditpreview';
    static emptyPreview = { scheme: BulkEditPreviewProvider.Schema };
    constructor(_modeService) {
        this._modeService = _modeService;
    }
}
