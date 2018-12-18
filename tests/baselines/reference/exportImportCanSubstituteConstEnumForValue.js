//// [exportImportCanSubstituteConstEnumForValue.ts]
module MsPortalFx.ViewModels.Dialogs {

    export const enum DialogResult {
        Abort,
        Cancel,
        Ignore,
        No,
        Ok,
        Retry,
        Yes,
    }

    export interface DialogResultCallback {
        (result: MsPortalFx.ViewModels.Dialogs.DialogResult): void;
    }

    export function someExportedFunction() {
    }

    export const enum MessageBoxButtons {
        AbortRetryIgnore,
        OK,
        OKCancel,
        RetryCancel,
        YesNo,
        YesNoCancel,
    }
}


module MsPortalFx.ViewModels {

    /**
     * For some reason javascript code is emitted for this re-exported const enum.
     */
    export import ReExportedEnum = Dialogs.DialogResult;

    /**
     * Not exported to show difference. No javascript is emmitted (as expected)
     */
    import DialogButtons = Dialogs.MessageBoxButtons;

    /**
     * Re-exporting a function type to show difference. No javascript is emmitted (as expected)
     */
    export import Callback = Dialogs.DialogResultCallback;

    export class SomeUsagesOfTheseConsts {
        constructor() {
            // these do get replaced by the const value
            const value1 = ReExportedEnum.Cancel;
            console.log(value1);
            const value2 = DialogButtons.OKCancel;
            console.log(value2);
        }
    }
}


//// [exportImportCanSubstituteConstEnumForValue.js]
var MsPortalFx;
(function (MsPortalFx) {
    var ViewModels;
    (function (ViewModels) {
        var Dialogs;
        (function (Dialogs) {
            function someExportedFunction() {
            }
            Dialogs.someExportedFunction = someExportedFunction;
        })(Dialogs = ViewModels.Dialogs || (ViewModels.Dialogs = {}));
    })(ViewModels = MsPortalFx.ViewModels || (MsPortalFx.ViewModels = {}));
})(MsPortalFx || (MsPortalFx = {}));
(function (MsPortalFx) {
    var ViewModels;
    (function (ViewModels) {
        var SomeUsagesOfTheseConsts = /** @class */ (function () {
            function SomeUsagesOfTheseConsts() {
                // these do get replaced by the const value
                var value1 = 1 /* Cancel */;
                console.log(value1);
                var value2 = 2 /* OKCancel */;
                console.log(value2);
            }
            return SomeUsagesOfTheseConsts;
        }());
        ViewModels.SomeUsagesOfTheseConsts = SomeUsagesOfTheseConsts;
    })(ViewModels = MsPortalFx.ViewModels || (MsPortalFx.ViewModels = {}));
})(MsPortalFx || (MsPortalFx = {}));


//// [exportImportCanSubstituteConstEnumForValue.d.ts]
declare module MsPortalFx.ViewModels.Dialogs {
    const enum DialogResult {
        Abort = 0,
        Cancel = 1,
        Ignore = 2,
        No = 3,
        Ok = 4,
        Retry = 5,
        Yes = 6
    }
    interface DialogResultCallback {
        (result: MsPortalFx.ViewModels.Dialogs.DialogResult): void;
    }
    function someExportedFunction(): void;
    const enum MessageBoxButtons {
        AbortRetryIgnore = 0,
        OK = 1,
        OKCancel = 2,
        RetryCancel = 3,
        YesNo = 4,
        YesNoCancel = 5
    }
}
declare module MsPortalFx.ViewModels {
    /**
     * For some reason javascript code is emitted for this re-exported const enum.
     */
    export import ReExportedEnum = Dialogs.DialogResult;
    /**
     * Re-exporting a function type to show difference. No javascript is emmitted (as expected)
     */
    export import Callback = Dialogs.DialogResultCallback;
    class SomeUsagesOfTheseConsts {
        constructor();
    }
}
