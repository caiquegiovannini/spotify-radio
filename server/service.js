import fs from 'fs';
import fsPromise from 'fs/promises';
import config from './config';
import { join, extname } from 'path';
const {
  dir: {
    publicDirectory,
  },
} = config;

export class Service {
  createFileStream(filename) {
    return fs.createReadStream(filename);
  };

  async getFileInfo(file) {
    // file = home/index.html
    const fullFilePath = join(publicDirectory, file)
    // valida se existe, se nao existir estora erro!
    await fsPromise.access(fullFilePath);
    const fileType = extname(fullFilePath);

    return {
      type: fileType,
      name: fullFilePath,
    };
  };
  async getFileStream(file) {
    const {
      name,
      type,
    } = await this.getFileInfo(file);
    return {
      sream: this.createFileStream(name),
      type,
    };
  };
};