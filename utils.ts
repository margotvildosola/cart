import fs from "fs";

const fileOpts = {
  encoding: "utf8"
};

export const parseFile = (filePath: string): object => {
  return JSON.parse(fs.readFileSync(filePath, fileOpts));
};
