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
