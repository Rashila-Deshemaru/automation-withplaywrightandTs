import "./logsetup"; 
import log4js from "log4js";

log4js.configure({
  appenders: {
    file: {
      type: "file",
      filename: "reports/test.log",
    },
    console: {
      type: "console",
    },
  },
  categories: {
    default: {
      appenders: ["file", "console"],
      level: "info",
    },
  },
});



export const stepLogger = log4js.getLogger();
export const pageLogger = log4js.getLogger();
