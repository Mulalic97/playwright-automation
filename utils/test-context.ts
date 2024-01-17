import { Auth } from './auth';
import { Immutable } from './immutable';

// Unchanging values that can be re-used between tests
export type TestConstants<T> = Immutable<T>;

// Usernames and passwords for the various applications and pages
export type TestAuth<T extends string> = Immutable<Record<T, Auth>>;

export interface TestContext<
    C extends TestConstants<unknown>,
    A extends TestAuth<string>,
    > {
    constants: C;
    auth: A;
}