import sharp from "sharp";
import fs from "fs";

export interface sharpResizeParams {
  inputImagePath: string;
  outputImagePath: string;
  width: number;
  height: number;
}

const processImage = (params: sharpResizeParams) => {
  return new Promise((res, rej) => {
    if (fs.existsSync(params.outputImagePath)) {
      res(params.outputImagePath);
    } else {
      sharp(params.inputImagePath)
        .resize(params.width, params.height)
        .toFile(params.outputImagePath, () => {
          res(params.outputImagePath);
        });
    }
  });
};

export default processImage;
