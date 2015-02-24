//@target: ES6
Symbol() instanceof Symbol;
Symbol instanceof Symbol();
(Symbol() || {}) instanceof Object; // This one should be okay, it's a valid way of distinguishing types
Symbol instanceof (Symbol() || {});