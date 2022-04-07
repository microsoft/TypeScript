//// [tests/cases/compiler/recursiveConditionalDepth.ts] ////

//// [monoroutes.ts]
type ExtractRouteParams<T> = string extends T
    ? Record<string, string | number>
    : T extends `${infer _Start}<string:${infer Param}>/${infer Rest}`
    ? ExtractRouteParams<_Start> & {[k in Param]: string} & ExtractRouteParams<Rest>
    : T extends `${infer _Start}<number:${infer Param}>/${infer Rest}`
    ? ExtractRouteParams<_Start> & {[k in Param]: number} & ExtractRouteParams<Rest>
    : T extends `${infer _Start}<string:${infer Param}>`
    ? {[k in Param]: string}
    : T extends `${infer _Start}<number:${infer Param}>`
    ? {[k in Param]: number}
    : {};

export const route = 
<
    TName extends string,
    TPath extends string,
    TResolve extends {},
    TTabs extends string[] = ["index"]
>(options: {
    name: TName;
    path: TPath;
    tabs?: [...TTabs];
    resolve?: (
        props: {
            params: ExtractRouteParams<TPath>;
            resolved: Record<never, never>;
        }
    ) => TResolve
}) => {
    const outerOptions = {
        ...options,
        resolve: options.resolve ?? (() => Promise.resolve({} as TResolve)),
        tabs: (options.tabs ?? ["index"]) as [...TTabs],
    };

    const innerRoute = <
        TInnerName extends string,
        TInnerPath extends string,
        TInnerResolve,
        TInnerTabs extends string[] = ["index"]
    >(options: {
        name: TInnerName;
        path: TInnerPath;
        tabs?: [...TInnerTabs];
        resolve?: (
            props: {
                params: ExtractRouteParams<`${TPath}${TInnerPath}`>;
                resolved: TResolve;
            }
        ) => TInnerResolve,
    }) => {
        type FullPath = `${TPath}${TInnerPath}`;
        const fullPath: FullPath = `${outerOptions.path}${options.path}`;

        // This is a wrapped resolve that will resolve the outside, then inject
        // the results into the inner resolve. Logic left out as it does not
        // affect the bug.
        const resolve = null as any;

        return route({
            name: options.name,
            path: fullPath,
            resolve,
        });
    };

    return {
        subroute: innerRoute,
    };
};

//// [routes.ts]
import { route } from "./monoroutes";

export const Share = route({
    name: "share",
    path: "/share/<string:uuid>/",
});

export const PasswordReset = route({
    name: "reset",
    path: "/reset/",
});

export const Registration = route({
    name: "register",
    path: "/register/",
});

export const Contact = route({
    name: "contact",
    path: "/contact/",
});

export const Dashboard = route({
    name: "dashboard",
    path: "/dashboard/<string:username>/",
    tabs: ["main", "info", "charts"],
    resolve: () => Promise.resolve({ resultOfApiCall: 1 }),
});

/*
 *
 * The idea here is that the subroute extends the parent route and gets its
 * depedencies.
 *
 * The path is the concatenation of the inner route and the outer one, so
 *
 * "/dashboard/<string:username>/subroute/"
 */
export const SubRouteExample = Dashboard.subroute({
    name: "subroute",
    path: "subroute/",
    resolve: ({ resolved }) => {

    },
});

export const WidgetList = route({
    name: "update_widget",
    path: "widgets/",
});

export const CreateWidget = route({
    name: "create_widget",
    path: "widgets/create/",
});

export const UpdateWidget = route({
    name: "update_widget",
    path: "widgets/<number:widgetId>/",
    tabs: ["main", "advanced"],
});

export const UpdateTrinket = route({
    name: "update_trinket",
    path: "trinkets/<number:trinketId>/",
});

// export const AdditionalRouteOne = route({
//     name: "one",
//     path: "one/",
// });

// export const AdditionalRouteTwo = route({
//     name: "two",
//     path: "two",
// });

// export const AdditionalRouteThree = route({
//     name: "three",
//     path: "/three/",
// });

// export const AdditionalRouteFour = route({
//     name: "four",
//     path: "four/",
// });

// export const AdditionalRouteFive = route({
//     name: "five",
//     path: "five/<number:id>/",
//     tabs: ["foo", "bar"],
// });

// export const AdditionalRouteSix = route({
//     name: "six",
//     path: "six/<number:entryId>/",
// });

// export const AdditionalRouteSeven = route({
//     name: "seven",
//     path: "seven/",
// });

// export const AdditionalRouteEight = route({
//     name: "eight",
//     path: "eight/",
//     tabs: ["snap", "spam"],
// });

// export const AdditionalRouteNine = route({
//     name: "nine",
//     path: "nine/",
// });

// export const AdditionalRouteTen = route({
//     name: "ten",
//     path: "ten/",
// });

// export const AdditionalRouteEleven = route({
//     name: "eleven",
//     path: "create/",
//     tabs: ["first-tab", "second-tab"],
// });

// export const AdditionalRouteTwelve = route({
//     name: "twelve",
//     path: "<number:foodId>/",
// });

// export const RouteThirteen = route({
//     name: "thirteen",
//     path: "thirteen/",
// });

// export const Fourteen = route({
//     name: "fourteen",
//     path: "/fourteen/",
// });

// export const Fifteen = route({
//     name: "fifteen",
//     path: "/fifteen/",
//     tabs: ["schedule", "targets"],
// });

// export const Seventeen = route({
//     name: "seventeen",
//     path: "/seventeen/",
// });

// export const Eighteen = route({
//     name: "eighteen",
//     path: "/eighteen/",
// });

// export const Nineteen = route({
//     name: "nineteen",
//     path: "/nineteen/",
// });

// export const Twenty = route({
//     name: "twenty",
//     path: "/twenty/",
// });

// export const TwentyOne = route({
//     name: "twentyone",
//     path: "/twentyone/",
// });

// export const TwentyTwo = route({
//     name: "twentytwo",
//     path: "/twentytwo/",
// });

// export const Login = route({
//     name: "login",
//     path: "/login/",
// });

// export const Logout = route({
//     name: "logout",
//     path: "/logout/",
// });



//// [monoroutes.js]
export const route = (options) => {
    var _a, _b;
    const outerOptions = Object.assign(Object.assign({}, options), { resolve: (_a = options.resolve) !== null && _a !== void 0 ? _a : (() => Promise.resolve({})), tabs: ((_b = options.tabs) !== null && _b !== void 0 ? _b : ["index"]) });
    const innerRoute = (options) => {
        const fullPath = `${outerOptions.path}${options.path}`;
        // This is a wrapped resolve that will resolve the outside, then inject
        // the results into the inner resolve. Logic left out as it does not
        // affect the bug.
        const resolve = null;
        return route({
            name: options.name,
            path: fullPath,
            resolve,
        });
    };
    return {
        subroute: innerRoute,
    };
};
//// [routes.js]
import { route } from "./monoroutes";
export const Share = route({
    name: "share",
    path: "/share/<string:uuid>/",
});
export const PasswordReset = route({
    name: "reset",
    path: "/reset/",
});
export const Registration = route({
    name: "register",
    path: "/register/",
});
export const Contact = route({
    name: "contact",
    path: "/contact/",
});
export const Dashboard = route({
    name: "dashboard",
    path: "/dashboard/<string:username>/",
    tabs: ["main", "info", "charts"],
    resolve: () => Promise.resolve({ resultOfApiCall: 1 }),
});
/*
 *
 * The idea here is that the subroute extends the parent route and gets its
 * depedencies.
 *
 * The path is the concatenation of the inner route and the outer one, so
 *
 * "/dashboard/<string:username>/subroute/"
 */
export const SubRouteExample = Dashboard.subroute({
    name: "subroute",
    path: "subroute/",
    resolve: ({ resolved }) => {
    },
});
export const WidgetList = route({
    name: "update_widget",
    path: "widgets/",
});
export const CreateWidget = route({
    name: "create_widget",
    path: "widgets/create/",
});
export const UpdateWidget = route({
    name: "update_widget",
    path: "widgets/<number:widgetId>/",
    tabs: ["main", "advanced"],
});
export const UpdateTrinket = route({
    name: "update_trinket",
    path: "trinkets/<number:trinketId>/",
});
// export const AdditionalRouteOne = route({
//     name: "one",
//     path: "one/",
// });
// export const AdditionalRouteTwo = route({
//     name: "two",
//     path: "two",
// });
// export const AdditionalRouteThree = route({
//     name: "three",
//     path: "/three/",
// });
// export const AdditionalRouteFour = route({
//     name: "four",
//     path: "four/",
// });
// export const AdditionalRouteFive = route({
//     name: "five",
//     path: "five/<number:id>/",
//     tabs: ["foo", "bar"],
// });
// export const AdditionalRouteSix = route({
//     name: "six",
//     path: "six/<number:entryId>/",
// });
// export const AdditionalRouteSeven = route({
//     name: "seven",
//     path: "seven/",
// });
// export const AdditionalRouteEight = route({
//     name: "eight",
//     path: "eight/",
//     tabs: ["snap", "spam"],
// });
// export const AdditionalRouteNine = route({
//     name: "nine",
//     path: "nine/",
// });
// export const AdditionalRouteTen = route({
//     name: "ten",
//     path: "ten/",
// });
// export const AdditionalRouteEleven = route({
//     name: "eleven",
//     path: "create/",
//     tabs: ["first-tab", "second-tab"],
// });
// export const AdditionalRouteTwelve = route({
//     name: "twelve",
//     path: "<number:foodId>/",
// });
// export const RouteThirteen = route({
//     name: "thirteen",
//     path: "thirteen/",
// });
// export const Fourteen = route({
//     name: "fourteen",
//     path: "/fourteen/",
// });
// export const Fifteen = route({
//     name: "fifteen",
//     path: "/fifteen/",
//     tabs: ["schedule", "targets"],
// });
// export const Seventeen = route({
//     name: "seventeen",
//     path: "/seventeen/",
// });
// export const Eighteen = route({
//     name: "eighteen",
//     path: "/eighteen/",
// });
// export const Nineteen = route({
//     name: "nineteen",
//     path: "/nineteen/",
// });
// export const Twenty = route({
//     name: "twenty",
//     path: "/twenty/",
// });
// export const TwentyOne = route({
//     name: "twentyone",
//     path: "/twentyone/",
// });
// export const TwentyTwo = route({
//     name: "twentytwo",
//     path: "/twentytwo/",
// });
// export const Login = route({
//     name: "login",
//     path: "/login/",
// });
// export const Logout = route({
//     name: "logout",
//     path: "/logout/",
// });
