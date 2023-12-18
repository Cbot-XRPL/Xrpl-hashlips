# Cbot Read Me


`1. configure program`
### -configure layers, metadata, nft.storage, and xrpl in config.js

`2. npm install`
### -bring in dependencies 

`3. npm run build`
### -build the images and json files
  then config folder upload to image file in config.js
  go into utlis/folderUpload and update your pc path to build folder

`4. npm run folder_upload`
### upload images to ipfs
  then update config file for ipfs image pin cid

`5. npm run update_info `
### -update metadata files to contain image ipfs links
   then configure folder upload to json files
   then delete bulk json file

`6. npm run folder_upload`
### -upload json to ipfs
 then configure mint file to contain json ipfs link
 
 go into utlis/mint and update your pc path to build/json folder

`7. npm run mint`
### -mint all json files into nfts
  
  

