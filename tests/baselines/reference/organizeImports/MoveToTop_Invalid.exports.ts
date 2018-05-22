// ==ORIGINAL==

export { F1, F2 } from "lib";
1;
export * from "lib";
2;
export { b } from `${'lib'}`;
export { a } from `${'lib'}`;
export { D } from "lib";
3;

// ==ORGANIZED==

export * from "lib";
export { D, F1, F2 } from "lib";
export { b } from `${'lib'}`;
export { a } from `${'lib'}`;
1;
2;
3;
