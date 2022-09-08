import { ResponseToolkit, Request } from '@hapi/hapi';
export default function onPreHandler(request: Request, h: ResponseToolkit): Promise<symbol>;
