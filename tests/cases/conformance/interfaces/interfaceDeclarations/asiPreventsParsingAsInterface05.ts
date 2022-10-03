"use strict"

var interface: number;

// 'interface' is a strict mode reserved word, and so it would be permissible
// to allow 'interface' and the name of the interface to be on separate lines;
// however, this complicates things, and so it is preferable to restrict interface 
// declarations such that their identifier must follow 'interface' on the same line.

interface   // This should be the identifier 'interface'
I           // This should be the identifier 'I'
{ }         // This should be a block body