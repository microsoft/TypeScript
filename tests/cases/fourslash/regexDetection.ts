/// <reference path="fourslash.ts" />

////  /*1*/15 / /*2*/Math.min(61 / /*3*/42, 32 / 15) / /*4*/15;

goTo.marker("1");
verify.not.quickInfoExists();

goTo.marker("2");
verify.quickInfoIs("const Math: Math",
    "An intrinsic object that provides basic mathematics functionality and constants.");

goTo.marker("3");
verify.not.quickInfoExists();

goTo.marker("4");
verify.not.quickInfoExists();