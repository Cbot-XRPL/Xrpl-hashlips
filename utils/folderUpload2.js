const basePath = process.cwd();
const { PinataSDK } = require("pinata-web3")
const { filesFromPath, getFilesFromPath } = require('files-from-path') 
const {folderUpload} = require(`${basePath}/src/config.js`);
require("dotenv").config()



//set up pinta api keys
const pinata = new PinataSDK({
  pinataJwt: process.env.PINATA_JWT,
  pinataGateway: process.env.GATEWAY_URL
})

async function upload(){
  try {

    //path to files to pin
     const fullPath = `C:\\Users\\codyr\\OneDrive\\Desktop\\Code\\xrpl_hashlips_5\\build\\${folderUpload}`;
     const path = fullPath.slice(2);

    //assign files to var
     const files = await getFilesFromPath(path);
     console.log(files);
  
  //upload files
    const upload = await pinata.upload.fileArray(files)
    console.log(upload)

    //handle error
  } catch (error) {
    console.log(error)
  }
}

upload()