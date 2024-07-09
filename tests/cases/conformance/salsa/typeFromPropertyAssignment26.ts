// @noEmit: true
// @noImplicitAny: true
// @checkJs: true
// @allowJs: true
// @Filename: bug24730.js
var UI = {}
UI.TreeElement = class {
    constructor() {
        this.treeOutline = 12
    }
};
UI.context = new UI.TreeElement()

class C extends UI.TreeElement {
    onpopulate() {
        this.doesNotExist
        this.treeOutline.doesntExistEither()
    }
};
