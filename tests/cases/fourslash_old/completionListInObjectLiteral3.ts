/// <reference path='fourslash.ts'/>

////interface IASTNode {
////    name: string;
////    children: IASTNode[];
////}
////var ast2: IASTNode = {
////    /**/
////}

goTo.marker()
verify.completionListContains('name');
verify.completionListContains('children');
verify.not.completionListContains('any');
verify.not.completionListContains('number');
