// @target: es2015
// Shouldn't compile (the long form f = f + ""; doesn't):
class f { }

f += '';
