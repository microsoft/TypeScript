/// <reference path='fourslash.ts'/>
////class Base {}
////interface Implemented1 {}
/////*classDecl1_classKeyword*/class C1 /*classDecl1_extendsKeyword*/extends Base /*classDecl1_implementsKeyword*/implements Implemented1 {
////    /*getDecl_getKeyword*/get e() { return 1; }
////    /*setDecl_setKeyword*/set e(v) {}
////}
/////*interfaceDecl1_interfaceKeyword*/interface I1 /*interfaceDecl1_extendsKeyword*/extends Base { }
/////*typeDecl_typeKeyword*/type T = { }
/////*enumDecl_enumKeyword*/enum E { }
/////*namespaceDecl_namespaceKeyword*/namespace N { }
/////*moduleDecl_moduleKeyword*/module M { }
/////*functionDecl_functionKeyword*/function fn() {}
/////*varDecl_varKeyword*/var x;
/////*letDecl_letKeyword*/let y;
/////*constDecl_constKeyword*/const z = 1;
////interface Implemented2 {}
////interface Implemented3 {}
////class C2 /*classDecl2_implementsKeyword*/implements Implemented2, Implemented3 {}
////interface I2 /*interfaceDecl2_extendsKeyword*/extends Implemented2, Implemented3 {}
verify.baselineFindAllReferences(
    'classDecl1_classKeyword',
    'classDecl1_extendsKeyword',
    'classDecl1_implementsKeyword',
    'classDecl2_implementsKeyword',
    'getDecl_getKeyword',
    'setDecl_setKeyword',
    'interfaceDecl1_interfaceKeyword',
    'interfaceDecl1_extendsKeyword',
    'interfaceDecl2_extendsKeyword',
    'typeDecl_typeKeyword',
    'enumDecl_enumKeyword',
    'namespaceDecl_namespaceKeyword',
    'moduleDecl_moduleKeyword',
    'functionDecl_functionKeyword',
    'varDecl_varKeyword',
    'letDecl_letKeyword',
    'constDecl_constKeyword',)
