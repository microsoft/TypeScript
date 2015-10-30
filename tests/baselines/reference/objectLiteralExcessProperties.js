//// [objectLiteralExcessProperties.ts]
interface Book {
    foreword: string;
}

interface Cover {
    color?: string;
}

var b1: Book = { forword: "oops" };

var b2: Book | string = { foreward: "nope" };

var b3: Book | (Book[]) = [{ foreword: "hello" }, { forwards: "back" }];

var b4: Book & Cover = { foreword: "hi", colour: "blue" };

var b5: Book & Cover = { foreward: "hi", color: "blue" };

var b6: Book & Cover = { foreword: "hi", color: "blue", price: 10.99 };

var b7: Book & number = { foreword: "hi", price: 10.99 };


//// [objectLiteralExcessProperties.js]
var b1 = { forword: "oops" };
var b2 = { foreward: "nope" };
var b3 = [{ foreword: "hello" }, { forwards: "back" }];
var b4 = { foreword: "hi", colour: "blue" };
var b5 = { foreward: "hi", color: "blue" };
var b6 = { foreword: "hi", color: "blue", price: 10.99 };
var b7 = { foreword: "hi", price: 10.99 };
