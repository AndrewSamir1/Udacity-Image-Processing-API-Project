import sharp from 'sharp';
import path from 'path';
import fs from 'fs';

type i = {
  n?: string;
  w?: string;
  h?: string;
};

//Resize Function
export const resize = async (i: i): Promise<string | null> => {
  if (!(i.n && i.n && i.h)) {
    return 'Invalid input parameter';
  }
  await sharp(
    path.resolve(__dirname, '../public/photos/original', `${i.n}.jpg`)
  ) //using sharp to resize image
    .resize(Number(i.w), Number(i.h))
    .toFile(
      path.resolve(
        __dirname,
        '../public/photos/resized',
        `${i.n}___${i.w}___${i.h}.jpg`
      )
    );
  return null;
};
//

//checking resized folder to see if image already resize
export const checkCache = async (i: i): Promise<boolean> => {
  const resizedImageLocation: string = path.resolve(
    __dirname,
    '../public/photos/resized',
    `${i.n}___${i.w}___${i.h}.jpg`
  );

  if (fs.existsSync(resizedImageLocation)) {
    console.log('Image Sent From Cache');
    return true; //return true if found
  } else {
    console.log('Image resized Succefully');
    return false; //return false if not found
  }
};
//

//getting resized image location
export const getresizedImageLocation = async (i: i): Promise<string> => {
  const resizedImageLocation: string = path.resolve(
    __dirname,
    '../public/photos/resized',
    `${i.n}___${i.w}___${i.h}.jpg`
  );
  return resizedImageLocation;
};
//

//checking filename input
export const checkFilename = async (i: i): Promise<string | null> => {
  if (!i.n) {
    return 'Error ! Please Enter File Name.';
  }
  if (
    !fs.existsSync(
      path.resolve(__dirname, '../public/photos/original', `${i.n}.jpg`)
    )
  ) {
    return 'Invalid original file name';
  }
  return null;
};
//

//checking width input
export const checkWidth = async (i: i): Promise<string | null> => {
  if (!Number(i.w)) {
    //checking if input is falsy
    return 'Error ! Please Enter a Valid Width.';
  }
  if (Number(i.w) < 1) {
    //checking if input is negative
    return 'Error ! Please Enter A postive Number for The width';
  }

  return null;
};
//

//checking height input
export const checkHeight = async (i: i): Promise<string | null> => {
  // const parsedHeight = parseInt(params.height || '');

  if (!Number(i.h)) {
    //checking if input is falsy
    return 'Error ! Please Enter a Valid Height.';
  }
  if (Number(i.h) < 1) {
    //checking if input is negative
    return 'Error ! Please Enter A postive Number for The Height';
  }

  return null;
};
//
