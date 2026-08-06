// @target: esnext
// @noEmit: true
// @noTypesAndSymbols: true

const regexes: RegExp[] = [
    /[^\q{xy}b]/v,
    /[^b\q{xy}]/v,
    /[^a-c\q{xy}]/v,
    /[^b[b\q{xy}]]/v,
];
