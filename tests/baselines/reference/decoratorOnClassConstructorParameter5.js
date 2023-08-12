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
var BulkEditPreviewProvider_1;
let BulkEditPreviewProvider = BulkEditPreviewProvider_1 = class BulkEditPreviewProvider {
    constructor(_modeService) {
        this._modeService = _modeService;
    }
};
BulkEditPreviewProvider.Schema = 'vscode-bulkeditpreview';
BulkEditPreviewProvider.emptyPreview = { scheme: BulkEditPreviewProvider_1.Schema };
BulkEditPreviewProvider = BulkEditPreviewProvider_1 = __decorate([
    __param(0, IFoo)
], BulkEditPreviewProvider);
