define(["require", "exports", "file-at-root", "somemodule/nested-file", "find-by-index", "find-by-package-main"], function (require, exports, file_at_root_1, nested_file_1, find_by_index_1, find_by_package_main_1) {
    var fileAtRoot = new file_at_root_1.FileAtRoot();
    fileAtRoot.fileAtRoot = '123';
    var nestedFile = new nested_file_1.NestedFile();
    nestedFile.nestedFile = '123';
    var findByIndex = new find_by_index_1.FindByIndex();
    findByIndex.findByIndex = '123';
    var findByPackageMain = new find_by_package_main_1.FindByPackageMain();
    findByPackageMain.findByPackageMain = '123';
});
