//// [tests/cases/compiler/crashInresolveReturnStatement.ts] ////

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
class WorkItemToolbar {
    onToolbarItemClick() {
        WITDialogs.createCopyOfWorkItem();
    }
}
class CreateCopyOfWorkItemDialog {
    getDialogResult() {
        return null;
    }
}
function createWorkItemDialog(dialogType) {
}
class WITDialogs {
    static createCopyOfWorkItem() {
        createWorkItemDialog(CreateCopyOfWorkItemDialog);
    }
}
