import { test as base } from '@playwright/test';
import { getEnvFile} from "./config";
import {TestConstants, TestContext, TestAuth} from "./test-context";

const environment = (process.env.ENVIRONMENT ?? 'CI').toLowerCase();
const { envFile, envFileName } = getEnvFile(environment);

console.log(`Loaded '${envFileName}' for environment '${environment}'`);

const constants = {
    webClientURL: envFile.WEBCLIENT_URL,
};

const auth = {

    web: {
        username: envFile.USERNAME,
        password: envFile.PASSWORD,
    }
};


export const test = base.extend<TestContext<Constants, Auth>>({
    constants: constants,
    auth: auth,
});

export type Constants = TestConstants<typeof constants>;
export type Auth = TestAuth<keyof typeof auth>;
