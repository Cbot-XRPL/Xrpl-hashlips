# Xahau Read Me
This is a variant of the Hashlips Art Engine thats been supercharged to pin files to ipfs via Pinita and invoke URI into Xahau hooks. This is a very basic program use at your own risk!!  


## Tools

- [PINITA](https://docs.pinata.cloud/web3/pinning/pinning-files#json)
- [HASHLIPS](https://hashlips.online/HashLips)
- [XAHAU URI TOKEN REMIT HOOK](https://github.com/Cbot-XRPL/URI-Token-Remit)
  
## Set Up

Type `npm install` and bring in all your dependencies. This runs off an older version of dependencies, so you may need to downgrade Node or Python. You will need to set your environmental variable in a standard `.env` file. You will need a JWT token from Pinata and a Gateway address from Pinata. You will also need the Seed (secret) for your account with the hook installed on it. You will also be putting the image and JSON file base URI in the `.env` in a later step. Go read the [HASHLIPS_README.MD](HASHLIPS_README.md) to learn how Hashlips works. Once you have learned about Hashlips, configure your image layers and metadata in config.js.


PINATA_JWT=QRFH#YOURTOKEN#$BRKJF
GATEWAY_URL=your-gate-way-264.mypinata.cloud
HOOK_SEED=VARRYOURSEEDOBVH
IMAGE_BASE_URI=ipfs://YOURIPFSBASEUIRIMAGEFOLDERAFTERYOURPINIT
JSON_BASE_URI=ipfs://YOURIPFSBASEUIRJSONFOLDERAFTERYOURPINIT


## Build and Upload Files

Use the command in the terminal `npm run build` to build your image and JSON metadata files. You can then set the file you want to upload in the `config.js` file, either images or JSON. FIRST, set your folder upload to images in the `config.js`, then in the console run the command `npm run folder_upload`(modify folderupload file to make sure right upload type). After the image folder is uploaded, collect the base path to your image folder and save it in the `.env` file as `IMAGE_BASE_URI`. Once you have saved the `IMAGE_BASE_URI`, in the console enter `npm run update_info` to fix your image path in all your metadata JSON files. Finally, once the metadata files are correct, you can set the folder upload in `config.js` to JSON and run `npm run folder_upload`(delete bulk json prior). If you've done everything right, you should have all your images and metadata properly saved on IPFS. For use in a later step, add your `JSON_BASE_URI` to your `.env` file.



## Add all your URIs to a Xahau hook with a Invoke TX

Check and ensure all your metadata files are correct. Test some image pointers in the metadata to make sure you set it up right. Also, check that all your metadata files have the EXACT same character count. Go to your hook account and make sure you have the hook installed with a `URIL` and `COST`. If the `URIL` is not set properly in relation to the character count of your metadata, your invoke will add corrupted data to the hook state. You can always rewrite over it, but it's best to do it right the first time. Once you're all ready to add your URIs to the hook state, use `npm run invoke`.



  

