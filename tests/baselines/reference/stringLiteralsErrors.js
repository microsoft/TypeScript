//// [stringLiteralsErrors.ts]
// Srtings missing line terminator
var es1 = "line 1
";
var es2 = 'line 1
';

// Space after backslash
var es3 = 'line 1\ 
';
var es4 = 'line 1\ 
';

// Unterminated strings
var es5 = "unterminated
var es6 = 'unterminated

// wrong terminator
var es7 = "unterminated '
var es8 = 'unterminated "

// wrong unicode sequences
var es9 = "\u00";
var es10 = "\u00GG";
var es11 = "\x0";
var es12 = "\xmm";

// End of file
var es13 = " 

//// [stringLiteralsErrors.js]
// Srtings missing line terminator
var es1 = "line 1;
";;
var es2 = 'line 1;
';;
// Space after backslash
var es3 = 'line 1\ ;
';;
var es4 = 'line 1\ ;
';;
// Unterminated strings
var es5 = "unterminated;
var es6 = 'unterminated;
// wrong terminator
var es7 = "unterminated ';
var es8 = 'unterminated ";
// wrong unicode sequences
var es9 = "\u00";
var es10 = "\u00GG";
var es11 = "\x0";
var es12 = "\xmm";
// End of file
var es13 = " ;
