/// <reference types="ambient" />
import { Server } from '@hapi/hapi';
import { ServiceConfig } from '../shared/config';
declare function run(config: ServiceConfig): Promise<Server>;
declare const _default: {
    run: typeof run;
};
export default _default;
