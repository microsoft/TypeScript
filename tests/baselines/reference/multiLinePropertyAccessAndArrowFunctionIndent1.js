//// [tests/cases/compiler/multiLinePropertyAccessAndArrowFunctionIndent1.ts] ////

//// [multiLinePropertyAccessAndArrowFunctionIndent1.ts]
return this.edit(role)
    .then((role: Role) =>
        this.roleService.add(role)
            .then((data: ng.IHttpPromiseCallbackArg<Role>) => data.data));


//// [multiLinePropertyAccessAndArrowFunctionIndent1.js]
return this.edit(role)
    .then((role) => this.roleService.add(role)
    .then((data) => data.data));
