//// [tests/cases/compiler/multiLinePropertyAccessAndArrowFunctionIndent1.ts] ////

//// [multiLinePropertyAccessAndArrowFunctionIndent1.ts]
return this.edit(role)
    .then((role: Role) =>
        this.roleService.add(role)
            .then((data: ng.IHttpPromiseCallbackArg<Role>) => data.data));


//// [multiLinePropertyAccessAndArrowFunctionIndent1.js]
var _this = this;
return this.edit(role)
    .then(function (role) {
    return _this.roleService.add(role)
        .then(function (data) { return data.data; });
});
