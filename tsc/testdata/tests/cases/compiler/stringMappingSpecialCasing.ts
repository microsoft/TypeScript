// @noEmit: true

// https://github.com/microsoft/typescript-go/issues/3489

type Lower = Lowercase<"İSPANYOL" | "ΟΣ">;

const lowerMap: Record<Lower, string> = {
	["i̇spanyol"]: "spanish",
	["ος"]: "greek-final-sigma",
};

type Upper = Uppercase<"ßfoo" | "ﬁoo">;

const upperMap: Record<Upper, string> = {
	["SSFOO"]: "eszett",
	["FIOO"]: "ligature",
};

type Capitalized = Capitalize<"ßfoo" | "ﬁoo">;

const capitalizedMap: Record<Capitalized, string> = {
	["SSfoo"]: "eszett",
	["FIoo"]: "ligature",
};

type Uncapitalized = Uncapitalize<"İfoo" | "ΟΣ">;

const uncapitalizedMap: Record<Uncapitalized, string> = {
	["i̇foo"]: "dotted-i",
	["οΣ"]: "sigma-prefix",
};
