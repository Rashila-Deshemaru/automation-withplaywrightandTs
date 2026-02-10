import fs from "fs";
import path from "path";

const reportsDir = path.resolve("reports");
const logFile = path.join(reportsDir, "test.log");

// ensure reports folder exists
if (!fs.existsSync(reportsDir)) {
  fs.mkdirSync(reportsDir);
}

// delete old log BEFORE logger starts
if (fs.existsSync(logFile)) {
  fs.unlinkSync(logFile);
}
