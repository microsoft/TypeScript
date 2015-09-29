/// <reference path="fourslash.ts" />

////let noSubTemplate = `/*    /*1*/`;
////let templateHead = `/*    /*2*/${1 + 2}`;
////let templateMiddle = `/*    ${1 + 2    /*3*/}`;
////let templateTail = `/*    ${1 + 2}    /*4*/`;

goTo.marker('1');
edit.insert("\n");

goTo.marker('2');
edit.insert("\n");

goTo.marker('3');
edit.insert("\n");

goTo.marker('4');
edit.insert("\n");


verify.currentFileContentIs("let noSubTemplate = `/*    \n`;\nlet templateHead = `/*    \n${1 + 2}`;\nlet templateMiddle = `/*    ${1 + 2\n    }`;\nlet templateTail = `/*    ${1 + 2}    \n`;");
