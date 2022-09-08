import { Server } from '@hapi/hapi';
declare function register(server: Server): Promise<Server>;
declare const _default: {
    register: typeof register;
};
export default _default;
