import { ResponseToolkit, Server } from '@hapi/hapi';
export interface StateResponseToolkit extends ResponseToolkit {
    getLogger: () => any;
}
export declare const StatePlugin: {
    version: string;
    name: string;
    once: boolean;
    register: (server: Server) => Promise<void>;
};
