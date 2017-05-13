// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * XML Shallow Parsing with Regular Expressions
 *
 * @path ch15/15.10/15.10.2/S15.10.2_A1_T1.js
 * @description See bug http://bugzilla.mozilla.org/show_bug.cgi?id=103087
 */

// REX/Javascript 1.0 
// Robert D. Cameron "REX: XML Shallow Parsing with Regular Expressions",
// Technical Report TR 1998-17, School of Computing Science, Simon Fraser 
// University, November, 1998.
// Copyright (c) 1998, Robert D. Cameron. 
// The following code may be freely used and distributed provided that
// this copyright and citation notice remains intact and that modifications
// or additions are clearly identified.

TextSE = "[^<]+";
UntilHyphen = "[^-]*-";
Until2Hyphens = UntilHyphen + "([^-]" + UntilHyphen + ")*-";
CommentCE = Until2Hyphens + ">?";
UntilRSBs = "[^]]*]([^]]+])*]+";
CDATA_CE = UntilRSBs + "([^]>]" + UntilRSBs + ")*>";
S = "[ \\n\\t\\r]+";
NameStrt = "[A-Za-z_:]|[^\\x00-\\x7F]";
NameChar = "[A-Za-z0-9_:.-]|[^\\x00-\\x7F]";
Name = "(" + NameStrt + ")(" + NameChar + ")*";
QuoteSE = '"[^"]' + "*" + '"' + "|'[^']*'";
DT_IdentSE = S + Name + "(" + S + "(" + Name + "|" + QuoteSE + "))*";
MarkupDeclCE = "([^]\"'><]+|" + QuoteSE + ")*>";
S1 = "[\\n\\r\\t ]";
UntilQMs = "[^?]*\\?+";
PI_Tail = "\\?>|" + S1 + UntilQMs + "([^>?]" + UntilQMs + ")*>";
DT_ItemSE = "<(!(--" + Until2Hyphens + ">|[^-]" + MarkupDeclCE + ")|\\?" + Name + "(" + PI_Tail + "))|%" + Name + ";|" + S;
DocTypeCE = DT_IdentSE + "(" + S + ")?(\\[(" + DT_ItemSE + ")*](" + S + ")?)?>?";
DeclCE = "--(" + CommentCE + ")?|\\[CDATA\\[(" + CDATA_CE + ")?|DOCTYPE(" + DocTypeCE + ")?";
PI_CE = Name + "(" + PI_Tail + ")?";
EndTagCE = Name + "(" + S + ")?>?";
AttValSE = '"[^<"]' + "*" + '"' + "|'[^<']*'";
ElemTagCE = Name + "(" + S + Name + "(" + S + ")?=(" + S + ")?(" + AttValSE + "))*(" + S + ")?/?>?";
MarkupSPE = "<(!(" + DeclCE + ")?|\\?(" + PI_CE + ")?|/(" + EndTagCE + ")?|(" + ElemTagCE + ")?)";
XML_SPE = TextSE + "|" + MarkupSPE;

///
////
/////

__patterns = [TextSE,UntilHyphen,Until2Hyphens,CommentCE,UntilRSBs,CDATA_CE,S,NameStrt, NameChar, 
Name, QuoteSE, DT_IdentSE, MarkupDeclCE, S1,UntilQMs, PI_Tail, DT_ItemSE, DocTypeCE, DeclCE, 
PI_CE, EndTagCE, AttValSE, ElemTagCE, MarkupSPE, XML_SPE];

__html=""+
'<html xmlns="http://www.w3.org/1999/xhtml"\n' +
'      xmlns:xlink="http://www.w3.org/XML/XLink/0.9">\n' +
'  <head><title>Three Namespaces</title></head>\n' +
'  <body>\n' +
'    <h1 align="center">An Ellipse and a Rectangle</h1>\n' +
'    <svg xmlns="http://www.w3.org/Graphics/SVG/SVG-19991203.dtd"\n' +
'         width="12cm" height="10cm">\n' +
'      <ellipse rx="110" ry="130" />\n' +
'      <rect x="4cm" y="1cm" width="3cm" height="6cm" />\n' +
'    </svg>\n' +
'    <p xlink:type="simple" xlink:href="ellipses.html">\n' +
'      More about ellipses\n' +
'    </p>\n' +
'    <p xlink:type="simple" xlink:href="rectangles.html">\n' +
'      More about rectangles\n' +
'    </p>\n' +
'    <hr/>\n' +
'    <p>Last Modified February 13, 2000</p>\n' +
'  </body>\n' +
'</html>';

//////////////////////////////////////////////////////////////////////////////
//CHECK#1
try {
    for(var index=0; index<__patterns.length; index++) {
    	__re = new RegExp(__patterns[index]);
    	__re.test(__html);
    }
} catch (e) {
	$ERROR('#'+index+": XML Shallow Parsing with Regular Expression: "+__patterns[index]);
}
//
//////////////////////////////////////////////////////////////////////////////


