/// <reference path="../fourslash.ts" />

//// 
//// 
//// /////////////////////////////
//// /// Windows Script Host APIS
//// /////////////////////////////
//// 
//// declare var ActiveXObject: { new (s: string): any; };
//// 
//// interface ITextWriter {
////     WriteLine(s): void;
//// }
//// 
//// declare var WScript: {
////     Echo(s): void;
////     StdErr: ITextWriter;
////     Arguments: { length: number; Item(): string; };
////     ScriptFullName: string;
////     Quit(): number;
//// }
//// 


goTo.file(0);

//    : 
//    : |--- go here
//   1: 
//   2: 
goTo.position(0);

//    : 
//    : |--- delete "\n\n///..."
//   1: 
//   2: 
edit.deleteAtCaret(100);


//  12: 
//    :  |--- go here
//  13: declare var WScript: {
//  14:     Echo(s): void;
goTo.position(198);

//  12: 
//    :  |--- delete "declare..."
//  13: declare var WScript: {
//  14:     Echo(s): void;
edit.deleteAtCaret(16);


//   9:     StdErr: ITextWriter;
//    :                                   |--- go here
//  10:     Arguments: { length: number; Item(): string; };
//  11:     ScriptFullName: string;
goTo.position(198);

//   9:     StdErr: ITextWriter;
//    :                                   |--- insert "Item(): string; "
//  10:     Arguments: { length: number; Item(): string; };
//  11:     ScriptFullName: string;
edit.insert("Item(): string; ");
