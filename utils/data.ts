import faker from "faker";

export const registerData = {
  name: faker.name.findName(),
  lastName: faker.name.findName(),
  email: faker.internet.email(),
  password: faker.internet.password(),
};

export const registerDataAPI = {
  name: faker.name.findName(),
  lastName: faker.name.findName(),
  email: faker.internet.email(),
  password: faker.internet.password(),
};
