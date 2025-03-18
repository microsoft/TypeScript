//// [tests/cases/conformance/enums/enumExportMergingES6.ts] ////

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
export { Animals };
var Animals;
(function (Animals) {
    Animals[Animals["Cat"] = 1] = "Cat";
})(Animals || (Animals = {}));
(function (Animals) {
    Animals[Animals["Dog"] = 2] = "Dog";
})(Animals || (Animals = {}));
(function (Animals) {
    Animals["CatDog"] = Cat | Dog;
    if (typeof Animals.CatDog !== "string") Animals[Animals.CatDog] = "CatDog";
})(Animals || (Animals = {}));
