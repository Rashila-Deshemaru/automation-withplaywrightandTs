module.exports = {
  default: {
    paths: [
      "tests/features/**/*.feature"
    ],
    require: [
      //"dotenv/config",
      "tests/steps/**/*.ts",
      "tests/support/**/*.ts"
    ],
    requireModule: [
      "ts-node/register"
    ],
    format: [
      "progress"
    ],
    publishQuiet: true
  }
};
