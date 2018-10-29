// @module: amd
// @declaration: true
// @target: es5
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
