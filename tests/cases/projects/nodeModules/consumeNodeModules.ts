import {FileAtRoot} from "file-at-root";
var fileAtRoot = new FileAtRoot();
fileAtRoot.fileAtRoot = '123';

import {NestedFile} from "somemodule/nested-file";
var nestedFile = new NestedFile();
nestedFile.nestedFile = '123';

import {FindByIndex} from "find-by-index";
var findByIndex = new FindByIndex();
findByIndex.findByIndex = '123';

import {FindByPackageMain} from "find-by-package-main";
var findByPackageMain = new FindByPackageMain();
findByPackageMain.findByPackageMain = '123';
