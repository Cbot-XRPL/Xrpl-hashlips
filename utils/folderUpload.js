const basePath = process.cwd();
const { NFTStorage } = require('nft.storage')
const { filesFromPath, getFilesFromPath } = require('files-from-path') 
const { folderUpload, token } = require(`${basePath}/src/config.js`);


//storage token


const main = async ()=> {
//path to files to pin
 const fullPath = `C:\\Users\\Cbot\\OneDrive\\Desktop\\Code\\project's\\cbot_art_engine\\build\\${folderUpload}`;
 const path = fullPath.slice(2);
 const storage = new NFTStorage({ token })
//assign files to var
 const files = await getFilesFromPath(path);
 console.log(files);
 console.log(`storing ${files.length} file(s) from path ${path}`);

 const cid = await storage.storeDirectory(files, {
    pathPrefix: 'images', // see note about path prefix
    hidden: false // use false if you want to ingore files starting with "."
 })
 console.log({cid})

 const status = await storage.status(cid)
 console.log(status); 

}

main();