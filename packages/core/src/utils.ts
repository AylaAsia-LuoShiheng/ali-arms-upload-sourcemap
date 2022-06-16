import path from "path";
import fs from "fs";

// 读文件夹
export function readDir(dirPath: string) {
  const fileList = [];
  const handleRead = (dirPathVal: string) => {
    fs.readdirSync(dirPathVal, { withFileTypes: true }).forEach(item => {
      const filePath = path.join(dirPathVal, item.name);
      if (item.isFile()) {
        fileList.push(filePath);
      } else if (item.isDirectory()) {
        handleRead(filePath);
      }
    });
  };
  try {
    handleRead(dirPath);
    return fileList;
  } catch (err) {
    console.log(err);
  }
}

// 读文件
export function readFile(filePath: string): string {
  try {
    const buff = fs.readFileSync(filePath);
    return buff.toString();
  } catch (err) {
    console.log(err);
  }
}
