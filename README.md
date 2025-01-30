# Xahau Read Me
This is a variant of the Hashlips Art Engine thats been supercharged to pin files to ipfs via Pinita and invoke URI into Xahau hooks. This is a work in progress atm!! This runs off a older verison dependencys you may need to downgrade node or python. 


## Tools

- https://docs.pinata.cloud/web3/pinning/pinning-files#json


## Set Up

You will need to set your eviromental varible in a standard .env file. You will need a JWT token from Pinita and a Gateway address from Pinita. you will also need the Seed (secert) for your account with the hook install on it. Go read the [HASHLIPS_README.MD](HASHLIPS_README.md) to learn how hashlips works. Once you have learned about hashlips configure your image layers and metadata in config.js.

PINATA_JWT=QRFH#YOURTOKEN#$BRKJF
GATEWAY_URL=your-gate-way-264.mypinata.cloud
HOOK_SEED=VARRYOURSEEDOBVH

### 1. configure program
- configure layers, metadata, nft.storage, and xrpl in config.js


### 2. bring in dependencies 
- use command in terminal `npm install`


### 3. build the images and json files
- use command in terminal `npm run build`
- then set folder upload to image folder in config.js
- go into utlis/folderUpload and update your pc path to build folder


### 4. upload images to ipfs
- use command in terminal `npm run folder_upload`
- update config file for ipfs image pin cid


### 5. update metadata files to contain image ipfs links
- use the command in terminal `npm run update_info`
- configure folder upload to json folder
- delete bulk json file


### 6. upload json to ipfs
- use command in terminal `npm run folder_upload`
- configure mint file to contain json ipfs link
- go into utlis/mint and update your pc path to build/json folder


### 7. mint all json files into nfts
- use command in the terminal `npm run mint`
  
  

