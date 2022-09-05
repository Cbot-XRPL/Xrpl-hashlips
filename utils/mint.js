// file imports ------------------------------------------------------------
const xrpl = require('xrpl');
const basePath = process.cwd();
const { NFTSeed} = require(`${basePath}/src/config.js`);
const { filesFromPath, getFilesFromPath } = require('files-from-path') 

// create needed var --------------------------------------------------------
//your path to your json files
const fullPath = `C:\\Users\\Cbot\\OneDrive\\Desktop\\Code\\project's\\cbot_art_engine\\build\\json`;
const path = fullPath.slice(2);
//input you pinned ipfs base uri
const jsonUri = '';

// mint nft func ---------------------------------------------------------------
  async function mintToken(NFTSeed,jsonUri,file) {
	const wallet = xrpl.Wallet.fromSeed(NFTSeed)
	const client = new xrpl.Client("wss://xls20-sandbox.rippletest.net:51233")
	await client.connect()
	console.log("Connected to Sandbox")

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







