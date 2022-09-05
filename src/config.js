const basePath = process.cwd();
const { MODE } = require(`${basePath}/constants/blend_mode.js`);
const { NETWORK } = require(`${basePath}/constants/network.js`);

const network = NETWORK.eth;

// General metadata
const namePrefix = "xWizard";
const description = "Remember to replace this description";
const baseUri = "ipfs://bafybeicbfsd43crg2t7j3osrxl6dndjp4kwtvhz5gh376lmxcqjvhu643a/images";



const solanaMetadata = {
  symbol: "YC",
  seller_fee_basis_points: 1000, // Define how much % you want from secondary market sales 1000 = 10%
  external_url: "https://www.youtube.com/c/hashlipsnft",
  creators: [
    {
      address: "7fXNuer5sbZtaTEPhtJ5g5gNtuyRoKkvxdjEjEnPN4mC",
      share: 100,
    },
  ],
};

// If you have selected Solana then the collection starts from 0 automatically
const layerConfigurations = [
  {
    growEditionSizeTo: 100,
    layersOrder: [
      { name: "Background" },
      { name: "Item" },
      { name: "Outfit" },
      { name: "Body" },
      { name: "Beard" },
      { name: "Hat" }
    ],
  },
];

// ipfs settings
const folderUpload = "images"
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweEEzYTMxMjcwM0Y4RjA5NEZGRTI0NDkzN0M0MDJEOEFjNGYyMThDY0QiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY1MzkzMDM5Njc5NSwibmFtZSI6Inh3aXphcmQgbWludCJ9.1-BuJcwClH5_C2V18o9SRBrGJ1SozZl934xvL6MpZ38'

// mint settings
const NFTSeed = 'snhLMR1f8BjCJ5XT5TuFj6xWch2JG'



const shuffleLayerConfigurations = false;

const debugLogs = false;

const format = {
  width: 801,
  height: 800,
  smoothing: false,
};

const gif = {
  export: false,
  repeat: 0,
  quality: 100,
  delay: 500,
};

const text = {
  only: false,
  color: "#ffffff",
  size: 20,
  xGap: 40,
  yGap: 40,
  align: "left",
  baseline: "top",
  weight: "regular",
  family: "Courier",
  spacer: " => ",
};

const pixelFormat = {
  ratio: 2 / 128,
};

const background = {
  generate: true,
  brightness: "80%",
  static: false,
  default: "#000000",
};

const extraMetadata = {};

const rarityDelimiter = "#";

const uniqueDnaTorrance = 10000;

const preview = {
  thumbPerRow: 5,
  thumbWidth: 50,
  imageRatio: format.height / format.width,
  imageName: "preview.png",
};

const preview_gif = {
  numberOfImages: 5,
  order: "ASC", // ASC, DESC, MIXED
  repeat: 0,
  quality: 100,
  delay: 500,
  imageName: "preview.gif",
};

module.exports = {
  format,
  baseUri,
  description,
  background,
  folderUpload,
  token,
  NFTSeed,
  uniqueDnaTorrance,
  layerConfigurations,
  rarityDelimiter,
  preview,
  shuffleLayerConfigurations,
  debugLogs,
  extraMetadata,
  pixelFormat,
  text,
  namePrefix,
  network,
  gif,
  preview_gif,
  solanaMetadata
};
