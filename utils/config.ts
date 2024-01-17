import { config as dotenvConfig, DotenvParseOutput } from 'dotenv';
import { resolve } from 'path';

interface EnvFileResult {
    envFile: DotenvParseOutput;
    envFileName: string;
}

export const getEnvFile = (environment: string, ahco?: string): EnvFileResult => {
    const envFileName = ahco ? `.env.${ahco}.${environment}` : `.env.${environment}`;

    const envFile = dotenvConfig({ path: resolve(envFileName) });

    if (envFile.error) {
        throw new Error(`Failed to load env file: ${envFileName}`);
    }

    return {
        envFile: envFile.parsed,
        envFileName: envFileName,
    };
};