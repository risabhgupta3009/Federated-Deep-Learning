// import crypto from 'crypto';
// import express from 'express';
// import multer from 'multer';
// import cors from 'cors';
// import fs from 'fs';
// import axios from 'axios';
// import spawn1 from  "child_process";
const crypto = require('crypto')
const express = require('express')
const multer = require('multer')
const cors = require('cors')
const fs = require('fs')
const axios = require('axios')
const tf = require('@tensorflow/tfjs-node');
const Jimp = require('jimp');


const app = express();

app.use(cors());

const fileStorageEngine = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./images");
  },
  filename: (req, file, cb) => {
    cb(null, 'predictImage.jpg');
  },
});

const upload = multer({ storage: fileStorageEngine });


app.get("/", async (req, res) => {
    console.log(await publicIp.v4());
});


app.post("/single", upload.single("image"), async (req, res) => {
  const fileBuffer = fs.readFileSync('./images/predictImage.jpg')
  const hash = crypto.createHash('sha256')
  const finalHex = hash.update(fileBuffer).digest('hex')
  const blockchainData = {
      fileHash : finalHex,
      senderIpaddress: "14.139.238.98"
  }
  axios.post('http://localhost:3001/transaction',blockchainData).
        then(()=>{
            axios.get('http://localhost:3001/mine')
                .then(async (data)=>{
                  const model = await tf.loadLayersModel(`file://models/model.json`);
                  const image = await Jimp.read("./images/predictImage.jpg")
                  image.cover(224, 224, Jimp.HORIZONTAL_ALIGN_CENTER | Jimp.VERTICAL_ALIGN_MIDDLE);
                  let values = new Float32Array(224 * 224 * 3);
                  let i = 0;
                  const NUM_OF_CHANNELS = 3;
                  image.scan(0, 0, image.bitmap.width, image.bitmap.height, (x, y, idx) => {
                    const pixel = Jimp.intToRGBA(image.getPixelColor(x, y));
                    pixel.r = pixel.r / 127.0 - 1;
                    pixel.g = pixel.g / 127.0 - 1;
                    pixel.b = pixel.b / 127.0 - 1;
                    pixel.a = pixel.a / 127.0 - 1;
                    values[i * 3 + 0] = pixel.r;
                    values[i * 3 + 1] = pixel.g;
                    values[i * 3 + 2] = pixel.b;
                    i++;
                  })
                  const outShape = [224, 224, NUM_OF_CHANNELS];
                  let img_tensor = tf.tensor3d(values, outShape, 'float32');
                  img_tensor = img_tensor.expandDims(0);
                  const predictions = await model.predict(img_tensor).dataSync();
                  if(Math.round(predictions[0]*100) > 60){
                    console.log('Normal')
                    res.send("Normal")
                  }else{
                    console.log('Covid')
                    res.send("Covid")
                  }
                }) 
                .catch((err)=>{
                    console.log(err)
                })
        }) 
        .catch((err)=>{
            console.log(err)
        })

});


app.listen(5000,async ()=>{
    console.log('Server Started at port 5000')
   
});
