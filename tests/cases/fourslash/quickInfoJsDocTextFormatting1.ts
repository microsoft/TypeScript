/// <reference path='fourslash.ts'/>

// Regression test for #33386

//// /**
////  * @param {number} var1 **Highlighted text**
////  * @param {string} var2 Another **Highlighted text**
//// */
//// function f1(var1, var2) { }
//// 
//// /**
////  * @param {number} var1 *Regular text with an asterisk
////  * @param {string} var2 Another *Regular text with an asterisk
//// */
//// function f2(var1, var2) { }
//// 
//// /**
////  * @param {number} var1 
////  * *Regular text with an asterisk
////  * @param {string} var2 
////  * Another *Regular text with an asterisk
//// */
//// function f3(var1, var2) { }
//// 
//// /**
////  * @param {number} var1 
////  * **Highlighted text**
////  * @param {string} var2 
////  * Another **Highlighted text**
//// */
//// function f4(var1, var2) { }
//// 
//// /**
////  * @param {number} var1 
////    **Highlighted text**
////  * @param {string} var2 
////    Another **Highlighted text**
//// */
//// function f5(var1, var2) { }
//// 
//// f1(/*1*/);
//// f2(/*2*/);
//// f3(/*3*/);
//// f4(/*4*/);
//// f5(/*5*/);

verify.signatureHelp({
    marker: "1",
    parameterDocComment: "**Highlighted text**",
    tags: [{
        name: "param",
        text: "var1 **Highlighted text**"
    }, {
        name: "param",
        text: "var2 Another **Highlighted text**"
    }]
});
verify.signatureHelp({
    marker: "2",
    parameterDocComment: "*Regular text with an asterisk",
    tags: [{
        name: "param",
        text: "var1 *Regular text with an asterisk"
    }, {
        name: "param",
        text: "var2 Another *Regular text with an asterisk"
    }]
});
verify.signatureHelp({
    marker: "3",
    parameterDocComment: "*Regular text with an asterisk",
    tags: [{
        name: "param",
        text: "var1 *Regular text with an asterisk"
    }, {
        name: "param",
        text: "var2 Another *Regular text with an asterisk"
    }]
});
verify.signatureHelp({
    marker: "4",
    parameterDocComment: "**Highlighted text**",
    tags: [{
        name: "param",
        text: "var1 **Highlighted text**"
    }, {
        name: "param",
        text: "var2 Another **Highlighted text**"
    }]
});
verify.signatureHelp({
    marker: "5",
    parameterDocComment: "**Highlighted text**",
    tags: [{
        name: "param",
        text: "var1 **Highlighted text**"
    }, {
        name: "param",
        text: "var2 Another **Highlighted text**"
    }]
});