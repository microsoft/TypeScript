//// [tests/cases/compiler/cloduleGenericOnSelfMember.ts] ////

//// [cloduleGenericOnSelfMember.ts]
class ServiceBase<T> {
    field: T;
}
class Service extends ServiceBase<typeof Service.Base> {
}
namespace Service {
    export const Base = {
        name: "1",
        value: 5
    };
}

//// [cloduleGenericOnSelfMember.js]
class ServiceBase {
    field;
}
class Service extends ServiceBase {
}
(function (Service) {
    Service.Base = {
        name: "1",
        value: 5
    };
})(Service || (Service = {}));
