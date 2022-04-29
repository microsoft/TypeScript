// ==ORIGINAL==

export { F1, F2 } from "lib";
1;
export * from "lib";
2;

// ==ORGANIZED==

export * from "lib";
export { F1, F2 } from "lib";
1;
2;
