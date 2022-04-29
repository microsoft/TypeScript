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