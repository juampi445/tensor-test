const Jimp = require("jimp");
const fs = require('fs');
const path = require('path');

const FROM_FORMAT = "jpg"
const TO_FORMAT = "jpeg"
const FROM_DIR = `data${path.sep}temp2`
const TO_DIR = `data${path.sep}train${path.sep}`
const SIZE_W = 300
const SIZE_H = 300
// const LOW_QUALITY = 10
// const HIGH_QUALITY = 90 
const BLUR = 0.5
const BRIGHTNESS = .7
const DARK = -.7

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
  filesToProccess.map((i, index) => {
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
        console.log(i, 'name')
        const newFileName = `${TO_DIR}sample${index}.${i.split('.').pop()}`
          .replace("." + FROM_FORMAT, "." + TO_FORMAT)
          .replace("." + "png", "." + TO_FORMAT)
          .replace(FROM_DIR, TO_DIR)
          image.write("./" + newFileName)
          image.clone().cloneQuiet().gaussian(2).write("./" + newFileName.replace("sample", "blured"))
          image.clone().cloneQuiet().brightness(BRIGHTNESS).write("./" + newFileName.replace("sample", "bright"))
          image.clone().cloneQuiet().brightness(DARK).write("./" + newFileName.replace("sample", "dark"))
          // const rotated = image.clone().cloneQuiet().rotate(30, false).scale(1.45)
          // rotated.crop(Math.floor((rotated.bitmap.width - SIZE_W) / 2),Math.floor((rotated.bitmap.height - SIZE_H) / 2),96,96).write("./" + newFileName.replace("sample", "rotate"))
      }
    })
  }) 
}

convert(FROM_DIR)