declare var x: Uppercase<Lowercase<string>>;

// good
x = "A";

// bad
x = "a";

declare var y: Uppercase<Lowercase<`${number}`>>;

// good
y = "1";

// bad
y = "a";
y = "A";