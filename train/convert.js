const Jimp = require("jimp");
const fs = require('fs');
const path = require('path');

const FROM_FORMAT = "jpg"
const TO_FORMAT = "jpeg"
const FROM_DIR = "data/temp"
const TO_DIR = "data/test"
const SIZE_W = 96
const SIZE_H = 96

const convert = (dataDir) => {
  let filesToProccess = []
  var files = fs.readdirSync(dataDir);
  for (let i = 0; i < files.length; i++) {
    if (!files[i].toLocaleLowerCase().endsWith("." + FROM_FORMAT)) {
      continue;
    }
    var filePath = path.join(dataDir, files[i]);
    filesToProccess.push(filePath)
  }
  filesToProccess.map(i => {
    Jimp.read(i, function (err, image) {
      //If there is an error in reading the image, 
      //we will print the error in our terminal
      if (err) {
        console.log(err)
      }
      //Otherwise we convert the image into PNG format 
      //and save it inside images folder using write() method.
      else {
        image.resize(SIZE_W,SIZE_H)

        const newFileName = i
          .replace("." + FROM_FORMAT, "." + TO_FORMAT)
          .replace(FROM_DIR, TO_DIR)
          console.log("newFileName","./" + newFileName)
        image.write("./" + newFileName)
      }
    })
  }) 
}

convert(FROM_DIR)