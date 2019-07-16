// @strict: true
declare const config: {
    [key: string]: boolean | { prop: string };
};

if (typeof config['works'] !== 'boolean') {
    config.works.prop = 'test'; // ok
    config['works'].prop = 'test'; // error, config['works']: boolean | { 'prop': string }
}
if (typeof config.works !== 'boolean') {
    config['works'].prop = 'test'; // error, config['works']: boolean | { 'prop': string }
    config.works.prop = 'test'; // ok
}
