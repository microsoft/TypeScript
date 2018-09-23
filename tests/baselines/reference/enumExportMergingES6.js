//// [enumExportMergingES6.ts]
export enum Animals {
	Cat = 1
}
export enum Animals {
	Dog = 2
}
export enum Animals {
	CatDog = Cat | Dog
}


//// [enumExportMergingES6.js]
export const Animals = {};
export { Animals };
(function (Animals) {
    Animals[Animals["Cat"] = 1] = "Cat";
})(Animals);
(function (Animals) {
    Animals[Animals["Dog"] = 2] = "Dog";
})(Animals);
(function (Animals) {
    Animals[Animals["CatDog"] = 3] = "CatDog";
})(Animals);
