var obj: Object;
if (ArrayBuffer.isView(obj)) {
    // isView should be a guard that narrows type to ArrayBufferView.
    var ab: ArrayBufferView = obj;
}