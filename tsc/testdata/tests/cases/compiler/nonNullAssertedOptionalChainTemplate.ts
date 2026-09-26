// @target: es2015, esnext
var f: any;

f?.x!`text`;
f?.x!!`text`;
f?.[0]!`text${1}`;
f?.()!`text`;
f?.x!`text`();
f?.x!`text`.x;

(f?.x)!`text`;
(f?.x!)`text`;
f.x!`text`;
