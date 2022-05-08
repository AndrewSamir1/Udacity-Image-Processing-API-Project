//importing express
import express from 'express';
//

//importing my functions
import { checkCache } from '../../myfunctions';
import { resize } from '../../myfunctions';
import { getresizedImageLocation } from '../../myfunctions';
import { checkFilename } from '../../myfunctions';
import { checkWidth } from '../../myfunctions';
import { checkHeight } from '../../myfunctions';
//

const resizeImage = express.Router();

//server get request
resizeImage.get('/', async (req, res): Promise<void> => {
  //saving error messages if there's any
  const fileNameError = await checkFilename(req.query);
  const widthError = await checkWidth(req.query);
  const heightError = await checkHeight(req.query);
  //

  //Server responding with error messages if any found
  if (fileNameError) {
    res.send(fileNameError);
    return;
  }

  if (widthError) {
    res.send(widthError);
    return;
  }

  if (heightError) {
    res.send(heightError);
    return;
  }
  //

  //checking if image is already resized
  const cacheFlag = await checkCache(req.query);
  //

  // if not resized, resized it - if resized, get it from cache
  if (!cacheFlag) {
    await resize(req.query);
    const destination = await getresizedImageLocation(req.query);
    res.sendFile(destination);
  } else {
    const destination = await getresizedImageLocation(req.query);

    res.sendFile(destination); //already
  }
  //
});

export default resizeImage;
