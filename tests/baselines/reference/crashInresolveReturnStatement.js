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
var __names = (this && this.__names) || (function() {
    var name = Object.defineProperty ? (function(proto, name) {
        Object.defineProperty(proto[name], 'name', { 
            value: name, configurable: true, writable: false, enumerable: false
        });
    }) : (function(proto, name) {
        proto[name].name = name;
    });
    return function (proto, keys) {
        for (var i = keys.length - 1; i >= 0; i--) {
            name(proto, keys[i])
        }
    };
})();
var WorkItemToolbar = (function () {
    function WorkItemToolbar() {
    }
    WorkItemToolbar.prototype.onToolbarItemClick = function () {
        WITDialogs.createCopyOfWorkItem();
    };
    __names(WorkItemToolbar.prototype, ["onToolbarItemClick"]);
    return WorkItemToolbar;
}());
var CreateCopyOfWorkItemDialog = (function () {
    function CreateCopyOfWorkItemDialog() {
    }
    CreateCopyOfWorkItemDialog.prototype.getDialogResult = function () {
        return null;
    };
    __names(CreateCopyOfWorkItemDialog.prototype, ["getDialogResult"]);
    return CreateCopyOfWorkItemDialog;
}());
function createWorkItemDialog(dialogType) {
}
var WITDialogs = (function () {
    function WITDialogs() {
    }
    WITDialogs.createCopyOfWorkItem = function () {
        createWorkItemDialog(CreateCopyOfWorkItemDialog);
    };
    return WITDialogs;
}());
