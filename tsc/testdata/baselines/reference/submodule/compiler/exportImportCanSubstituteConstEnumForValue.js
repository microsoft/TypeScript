//// [tests/cases/compiler/exportImportCanSubstituteConstEnumForValue.ts] ////

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
    let ViewModels;
    (function (ViewModels) {
        let Dialogs;
        (function (Dialogs) {
            let DialogResult;
            (function (DialogResult) {
                DialogResult[DialogResult["Abort"] = 0] = "Abort";
                DialogResult[DialogResult["Cancel"] = 1] = "Cancel";
                DialogResult[DialogResult["Ignore"] = 2] = "Ignore";
                DialogResult[DialogResult["No"] = 3] = "No";
                DialogResult[DialogResult["Ok"] = 4] = "Ok";
                DialogResult[DialogResult["Retry"] = 5] = "Retry";
                DialogResult[DialogResult["Yes"] = 6] = "Yes";
            })(DialogResult = Dialogs.DialogResult || (Dialogs.DialogResult = {}));
            function someExportedFunction() {
            }
            Dialogs.someExportedFunction = someExportedFunction;
            let MessageBoxButtons;
            (function (MessageBoxButtons) {
                MessageBoxButtons[MessageBoxButtons["AbortRetryIgnore"] = 0] = "AbortRetryIgnore";
                MessageBoxButtons[MessageBoxButtons["OK"] = 1] = "OK";
                MessageBoxButtons[MessageBoxButtons["OKCancel"] = 2] = "OKCancel";
                MessageBoxButtons[MessageBoxButtons["RetryCancel"] = 3] = "RetryCancel";
                MessageBoxButtons[MessageBoxButtons["YesNo"] = 4] = "YesNo";
                MessageBoxButtons[MessageBoxButtons["YesNoCancel"] = 5] = "YesNoCancel";
            })(MessageBoxButtons = Dialogs.MessageBoxButtons || (Dialogs.MessageBoxButtons = {}));
        })(Dialogs = ViewModels.Dialogs || (ViewModels.Dialogs = {}));
    })(ViewModels = MsPortalFx.ViewModels || (MsPortalFx.ViewModels = {}));
})(MsPortalFx || (MsPortalFx = {}));
(function (MsPortalFx) {
    let ViewModels;
    (function (ViewModels) {
        ViewModels.ReExportedEnum = Dialogs.DialogResult;
        var DialogButtons = Dialogs.MessageBoxButtons;
        ViewModels.Callback = Dialogs.DialogResultCallback;
        class SomeUsagesOfTheseConsts {
            constructor() {
                const value1 = ViewModels.ReExportedEnum.Cancel;
                console.log(value1);
                const value2 = DialogButtons.OKCancel;
                console.log(value2);
            }
        }
        ViewModels.SomeUsagesOfTheseConsts = SomeUsagesOfTheseConsts;
    })(ViewModels = MsPortalFx.ViewModels || (MsPortalFx.ViewModels = {}));
})(MsPortalFx || (MsPortalFx = {}));
