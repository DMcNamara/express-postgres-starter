/** @type {import("jest").Config} **/
module.exports = {
  testEnvironment: "node",
  rootDir: "src",
  transform: {
    "^.+\\.tsx?$": ["ts-jest", { tsconfig: "tsconfig.test.json" }],
  },
};
