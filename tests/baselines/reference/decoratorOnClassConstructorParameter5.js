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
let BulkEditPreviewProvider = class BulkEditPreviewProvider {
    constructor(_modeService) {
        this._modeService = _modeService;
    }
};
BulkEditPreviewProvider.Schema = 'vscode-bulkeditpreview';
BulkEditPreviewProvider.emptyPreview = { scheme: BulkEditPreviewProvider.Schema };
BulkEditPreviewProvider = __decorate([
    __param(0, IFoo)
], BulkEditPreviewProvider);
