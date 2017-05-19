// @target:es5

var comp: number;

comp **= 1;
comp **= comp **= 1;
comp **= comp **= 1 + 2;
comp **= comp **= 1 - 2;
comp **= comp **= 1 * 2;
comp **= comp **= 1 / 2;

comp **= comp **= (1 + 2);
comp **= comp **= (1 - 2);
comp **= comp **= (1 * 2);
comp **= comp **= (1 / 2);

comp **= comp **= 1 + 2 ** 3;
comp **= comp **= 1 - 2 ** 4;
comp **= comp **= 1 * 2 ** 5;
comp **= comp **= 1 / 2 ** 6;

comp **= comp **= (1 + 2) ** 3;
comp **= comp **= (1 - 2) ** 4;
comp **= comp **= (1 * 2) ** 5;
comp **= comp **= (1 / 2) ** 6;
