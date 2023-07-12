const Jimp = require("jimp");
const fs = require('fs');
const path = require('path');

const FROM_FORMAT = "jpg"
const TO_FORMAT = "jpeg"
const FROM_DIR = `data${path.sep}temp3`
const TO_DIR = `data${path.sep}train`
const SIZE_W = 96
const SIZE_H = 96
// const LOW_QUALITY = 10
// const HIGH_QUALITY = 90 
const BLUR = 1
const BRIGHTNESS = .4

const convert = (dataDir) => {
  let filesToProccess = []
  var files = fs.readdirSync(dataDir);
  console.log(files, 'FOTOS')
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
        // const blured = image.blur(BLUR)
        // if (i.toLowerCase().includes("blur")) {
        //   // image.quality(LOW_QUALITY);
        //   image.blur(BLUR)
        // }

        const newFileName = i
          .replace("." + FROM_FORMAT, "." + TO_FORMAT)
          .replace(FROM_DIR, TO_DIR)
          console.log("newFileName","./" + newFileName)
        image.write("./" + newFileName)
        image.blur(BLUR).write("./" + newFileName.replace("goodQuality", "blured"))
        image.brightness(BRIGHTNESS).write("./" + newFileName.replace("goodQuality", "bright"))
      }
    })
  }) 
}

convert(FROM_DIR)