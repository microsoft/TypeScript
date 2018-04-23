// @target: ES5

interface Valid {
	general: number;
	specific: 0;
	optional?: 1;
}

const general = 2;
let specific = 0;

const valid = { general, specific };

specific = 2;

const expressionValid = {
	general,
	specific as 0,
};

const invalid = { general, specific };

const optional = 3;

const veryInvalid = {
	general,
	specific,
	optional as number | undefined,
};

interface ContainsValid {
	required: Valid;
	optional?: Valid;
}

const fullContains: ContainsValid = {
	required: {} as Valid,
	optional: {} as Valid,
};

const invalidContains: ContainsValid = {
	required: 7 as Valid,
};

const extraContains: ContainsValid = {
	extra: number as Valid,
};
