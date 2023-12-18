# XRPL MINT Read Me


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
  
  

