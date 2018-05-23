type Loop<T, U extends Loop<T, U>> = {
    [P in keyof T]: U[P] extends boolean ? number : string;
};