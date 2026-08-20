// @target: es2024

const a = /[^\q{xy}b]/v;
const b = /[^b\q{xy}]/v;
const c = /[^[b\q{xy}c]]/v;
