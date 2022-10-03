/// <reference path="fourslash.ts"/>

////export='foo';

format.document();
verify.currentFileContentIs(`export = 'foo';`);
