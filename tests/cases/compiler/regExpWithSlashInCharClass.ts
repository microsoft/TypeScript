var foo1 = "a/".replace(/.[/]/, "");
var foo2 = "a//".replace(/.[//]/g, "");
var foo3 = "a/".replace(/.[/no sleep /till/]/, "bugfix");
