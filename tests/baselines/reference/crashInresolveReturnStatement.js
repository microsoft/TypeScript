//// [crashInresolveReturnStatement.ts]
class WorkItemToolbar {
    public onToolbarItemClick() {
        WITDialogs.createCopyOfWorkItem();
    }
}
class CreateCopyOfWorkItemDialog {
    public getDialogResult() {
        return null;
    }
}
function createWorkItemDialog<P0>(dialogType: P0) {
}
class WITDialogs {
    public static createCopyOfWorkItem() {
        createWorkItemDialog(CreateCopyOfWorkItemDialog);
    }
}


//// [crashInresolveReturnStatement.js]
var WorkItemToolbar = /** @class */ (function () {
    function WorkItemToolbar() {
    }
    WorkItemToolbar.prototype.onToolbarItemClick = function () {
        WITDialogs.createCopyOfWorkItem();
    };
    return WorkItemToolbar;
}());
var CreateCopyOfWorkItemDialog = /** @class */ (function () {
    function CreateCopyOfWorkItemDialog() {
    }
    CreateCopyOfWorkItemDialog.prototype.getDialogResult = function () {
        return null;
    };
    return CreateCopyOfWorkItemDialog;
}());
function createWorkItemDialog(dialogType) {
}
var WITDialogs = /** @class */ (function () {
    function WITDialogs() {
    }
    WITDialogs.createCopyOfWorkItem = function () {
        createWorkItemDialog(CreateCopyOfWorkItemDialog);
    };
    return WITDialogs;
}());
