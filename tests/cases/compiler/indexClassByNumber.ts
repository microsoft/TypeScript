// Shouldn't be able to index a class instance by a number (unless it has declared a number index signature)

class foo { }

var f = new foo();

f[0] = 4; // Shouldn't be allowed