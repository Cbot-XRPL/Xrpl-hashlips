// file imports ------------------------------------------------------------
const xrpl = require("@transia/xrpl");
const basePath = process.cwd();
const { getFilesFromPath } = require("files-from-path");
const { File } = require("buffer");  // Import File from buffer module
require("dotenv").config();



// Ensure correct directory path
const dirPath = path.join(__dirname, "../build/json");

// Get files from path
const files = await getFilesFromPath(dirPath);

//input you pinned ipfs base uri
const jsonUri = '';

//set up wall
const wallet = xrpl.Wallet.fromSeed(process.env.HOOK_SEED)

// mint nft func ---------------------------------------------------------------
  async function mintToken(jsonUri,file) {
	
const client = new xrpl.Client("wss://xahau.network/")
await client.connect()
console.log("Connected to Xahau")

	const transactionBlob = {
		TransactionType: "NFTokenMint",
		Account: wallet.classicAddress,
		URI: xrpl.convertStringToHex(`${jsonUri}${file}`),
		Flags:8,
		NFTokenTaxon: Number(file.slice(6,7))
	}
	// Submit signed blob --------------------------------------------------------
	const tx = await client.submitAndWait(transactionBlob,{wallet})

	const nfts = await client.request({
		method: "account_nfts",
		account: wallet.classicAddress
	})
	console.log(nfts)

	// Check transaction results -------------------------------------------------
	console.log("Transaction result:", tx.result.meta.TransactionResult)
	console.log("Balance changes:",
	  JSON.stringify(xrpl.getBalanceChanges(tx.result.meta), null, 2))
	client.disconnect()
} 
  





// main sequence --------------------------------------------------------------------
const main = async()=>{

//get json files
files = await getFilesFromPath(path)
console.log(files)

//cycle json files and mint
   files.reduce(async(memo,file) =>{
  await memo; 
  await mintToken(NFTSeed,jsonUri,file.name)   
  },undefined) 
}


// run program
main()







