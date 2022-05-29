import express from "express";
import path from "path";
import processImage, { sharpResizeParams } from "../../image-processing";

const images: express.Router = express.Router();

interface ImageQuery {
  filename?: string;
  width?: string;
  height?: string;
}

const validate = (query: ImageQuery) => {
  const name: string = query.filename as string;

  if (!query.width || !query.height || !name) {
    return false;
  } else {
    return true;
  }
};

images.get("/", (request: express.Request, response: express.Response) => {
  const imagesFolder: string = path.normalize(__dirname + "/../../../assets");

  const filename = request.query.filename;
  const width: number = parseInt(request.query.width as string);
  const height: number = parseInt(request.query.height as string);

  const params: sharpResizeParams = {
    inputImagePath: `${imagesFolder}/full/${filename}.jpg`,
    outputImagePath: `${imagesFolder}/thumb/${filename}${width}-${height}.jpg`,
    width,
    height,
  };
  const isGoodRequest = validate(request.query);
  if (isGoodRequest) {
    processImage(params).then((res) => {
      response.status(200).sendFile(res as string);
    });
  } else {
    response.status(404).send("make sure that the query params are correct");
  }
});

export default images;
