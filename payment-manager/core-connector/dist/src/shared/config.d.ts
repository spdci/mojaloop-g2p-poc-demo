export interface ServiceConfig {
    PACKAGE: Record<string, unknown>;
    LISTEN_PORT: number;
    HOST: string;
    CORS_WHITELIST: string[];
    ALLOW_CREDENTIALS: boolean;
    OUTBOUND_ENDPOINT: string;
    BACKEND_ENDPOINT: string;
    REQUEST_TIMEOUT: number;
}
declare const _default: {
    PACKAGE: {
        name: string;
        version: string;
        description: string;
        main: string;
        scripts: {
            build: string;
            watch: string;
            clean: string;
            start: string;
            "start:no-build": string;
            "start:build": string;
            startDev: string;
            dev: string;
            lint: string;
            "lint:fix": string;
            test: string;
            "test:coverage": string;
            "test:coverage-check": string;
            "test:integration": string;
            "test:junit": string;
            "test:unit": string;
            "audit:resolve": string;
            "audit:check": string;
        };
        repository: {
            type: string;
            url: string;
        };
        author: string;
        contributors: string[];
        license: string;
        licenses: {
            type: string;
            url: string;
        }[];
        bugs: {
            url: string;
        };
        homepage: string;
        prettier: {
            trailingComma: string;
            tabWidth: number;
            semi: boolean;
            singleQuote: boolean;
            useTabs: boolean;
            bracketSpacing: boolean;
            arrowParens: string;
        };
        "pre-commit": string[];
        dependencies: {
            "@hapi/hapi": string;
            "@hapi/inert": string;
            "@hapi/vision": string;
            "@mojaloop/central-services-error-handling": string;
            "@mojaloop/central-services-logger": string;
            "@mojaloop/central-services-metrics": string;
            "@mojaloop/central-services-shared": string;
            "@mojaloop/event-sdk": string;
            ajv: string;
            "ajv-keywords": string;
            assert: string;
            axios: string;
            "openhim-mediator-utils": string;
            "parse-strings-in-object": string;
            rc: string;
            redis: string;
            typescript: string;
        };
        devDependencies: {
            "@types/axios": string;
            "@types/hapi__hapi": string;
            "@types/hapi__inert": string;
            "@types/hapi__vision": string;
            "@types/jest": string;
            "@types/node": string;
            "@types/rc": string;
            "@types/redis": string;
            "@typescript-eslint/eslint-plugin": string;
            "@typescript-eslint/parser": string;
            eslint: string;
            "eslint-config-prettier": string;
            "eslint-config-standard": string;
            "eslint-import-resolver-typescript": string;
            "eslint-plugin-cucumber": string;
            "eslint-plugin-import": string;
            "eslint-plugin-node": string;
            "eslint-plugin-prettier": string;
            "eslint-plugin-promise": string;
            "eslint-plugin-standard": string;
            jest: string;
            "jest-junit": string;
            "jest-mock-process": string;
            "npm-audit-resolver": string;
            "npm-check-updates": string;
            prettier: string;
            "ts-jest": string;
            "ts-node": string;
            "tsconfig-paths": string;
        };
        peerDependencies: {
            "@mojaloop/central-services-error-handling": string;
            "@mojaloop/central-services-logger": string;
            "@mojaloop/central-services-metrics": string;
            "@mojaloop/event-sdk": string;
            ajv: string;
            "ajv-keywords": string;
        };
        peerDependenciesMeta: {
            "@mojaloop/central-services-error-handling": {
                optional: boolean;
            };
            "@mojaloop/central-services-logger": {
                optional: boolean;
            };
            "@mojaloop/central-services-metrics": {
                optional: boolean;
            };
            "@mojaloop/event-sdk": {
                optional: boolean;
            };
            ajv: {
                optional: boolean;
            };
            "ajv-keyboards": {
                optional: boolean;
            };
        };
    };
    LISTEN_PORT: number;
    HOST: string;
    CORS_WHITELIST: string[];
    ALLOW_CREDENTIALS: boolean;
    OUTBOUND_ENDPOINT: string;
    BACKEND_ENDPOINT: string;
    REQUEST_TIMEOUT: number;
};
export default _default;
