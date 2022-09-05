const { NFTStorage, File, Blob } = require('nft.storage')

const NFT_STORAGE_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweEEzYTMxMjcwM0Y4RjA5NEZGRTI0NDkzN0M0MDJEOEFjNGYyMThDY0QiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY1MzkzMDM5Njc5NSwibmFtZSI6Inh3aXphcmQgbWludCJ9.1-BuJcwClH5_C2V18o9SRBrGJ1SozZl934xvL6MpZ38'
const client = new NFTStorage({ token: NFT_STORAGE_TOKEN })




 const getCid = async () => {
    
     const cid = await client.storeDirectory([

       new File([JSON.stringify({'name': 'xWizard_01'}, null, 2)], 'xWizard_01.json')])

console.log(cid)
}

getCid()   

