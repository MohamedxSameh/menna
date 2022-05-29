import path from "path";
import fs from "fs";
import supertest from "supertest";
import app from "../index";
import processImage from "../image-processing";

const request = supertest(app);

describe('Test endpoints responses',() :void => {

  it('test / endpoint status', async (): Promise <void> => {
    const response = await request.get('/');
    expect(response.status).toBe(200);
  });

  it('test /api/images endpoint', async (): Promise <void> => {
    const response = await request.get('/api/images');
    expect(response.status).toBe(200);
  });

  it('test / endpoint text', async (): Promise <void> => {
    const response = await request.get('/api/images');
    expect(response.text).toBe('Udacity Image proccessing API project');
  });

  it('image proccessing test', async () => {
  const imagesFolder: string = path.normalize(__dirname + "/../../../assets");
  const filename='santamonica';
  const width = 400;
  const height = 400;
  
    const processPrams ={
    inputImagePath: `${imagesFolder}/full/${filename}.jpg`,
    outputImagePath: `${imagesFolder}/thumb/${filename}${width}-${height}.jpg`,
    width,
    height,
    }

    const outputImagePath = await processImage(processPrams);
    const exists = fs.existsSync(outputImagePath as string);
    expect(exists).toEqual(true);
    fs.unlinkSync(outputImagePath as string);
    
  })

});
