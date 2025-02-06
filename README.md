# Xahau Read Me
This is a variant of the Hashlips Art Engine thats been supercharged to pin files to ipfs via Pinita and invoke URI into Xahau hooks. This is a work in progress atm!!  


## Tools

- https://docs.pinata.cloud/web3/pinning/pinning-files#json


## Set Up

Type NPM install and bring in all your dependencys. This runs off a older verison dependencys you may need to downgrade node or python. You will need to set your eviromental varible in a standard .env file. You will need a JWT token from Pinita and a Gateway address from Pinita. you will also need the Seed (secert) for your account with the hook install on it. You will also putting the image and json file base uri in the .env in a later step. Go read the [HASHLIPS_README.MD](HASHLIPS_README.md) to learn how hashlips works. Once you have learned about hashlips configure your image layers and metadata in config.js.

PINATA_JWT=QRFH#YOURTOKEN#$BRKJF
GATEWAY_URL=your-gate-way-264.mypinata.cloud
HOOK_SEED=VARRYOURSEEDOBVH
IMAGE_BASE_URI=YOURIPFSBASEUIRIMAGEFOLDERAFTERYOURPINIT
JSON_BASE_URI=YOURIPFSBASEUIRJSONFOLDERAFTERYOURPINIT




## 3. build and upload files
use command in terminal `npm run build` to build your image and json metadata files. You can then set the file you want to upload in the config.js file either images or json. FIRST set your folder upload to images in the config.js then in the console run the command `npm run folder_upload`. After the image folder is uploaded collect the base path to your image folder and save it in the.env file as IMAGE_BASE_URI. Once you have saved the IMAGE_BASE_URI, in the console enter `npm run update_info` to fix your image path in all your metadata json files. Finally once the metadata files are correct you can set the folder upload in config.js to json and run `npm run folder_upload`. If you done everything right you should have all your images and metadata proper saved on IPFS.



### 7. Add all your URIs to a Xahau hook with a Invoke TX

  
  

