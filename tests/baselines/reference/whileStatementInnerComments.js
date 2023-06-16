//// [tests/cases/compiler/whileStatementInnerComments.ts] ////

//// [whileStatementInnerComments.ts]
/*a*/ while /*b*/ ( /*c*/ false /*d*/ ) /*e*/ {}

/*a*/ do /*b*/ {} /*c*/ while /*d*/ ( /*e*/ true /*f*/ );


//// [whileStatementInnerComments.js]
/*a*/ while /*b*/ ( /*c*/false /*d*/) /*e*/ { }
/*a*/ do /*b*/ { } /*c*/ while /*d*/ ( /*e*/true /*f*/);
