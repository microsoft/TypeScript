/// <reference path='fourslash.ts' />

////class C {
////<<<<<<< HEAD
////v = 1;
////=======
////v = 2;
////>>>>>>> Branch - a
////}

format.document();
verify.currentFileContentIs("class C {\r\n\
<<<<<<< HEAD\r\n\
    v = 1;\r\n\
=======\r\n\
v = 2;\r\n\
>>>>>>> Branch - a\r\n\
}");