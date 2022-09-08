import { ServerRegisterPluginObject } from '@hapi/hapi';
declare function initialize(): Promise<ServerRegisterPluginObject<any>>;
declare const _default: {
    initialize: typeof initialize;
};
export default _default;
