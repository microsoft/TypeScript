// @target: es5

function three({} = {}) {}

function four([] = []) {}

// should not be an error

three(undefined);

three(null);

four(undefined);

four(null)