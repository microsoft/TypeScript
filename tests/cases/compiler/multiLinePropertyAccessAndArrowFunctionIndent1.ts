return this.edit(role)
    .then((role: Role) =>
        this.roleService.add(role)
            .then((data: ng.IHttpPromiseCallbackArg<Role>) => data.data));
