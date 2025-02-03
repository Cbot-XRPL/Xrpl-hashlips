const fs = require("fs");
const path = require("path");
const xrpl = require("@transia/xrpl");
const { derive, utils, signAndSubmit } = require("xrpl-accountlib");
const crypto = require("crypto");
require("dotenv").config();
const basePath = process.cwd();


//Number of URITokens (NFTs) you want to Invoke
const numberURIs = 5;
//Select your network "Testnet" or "Mainnet"
const net = "Testnet";
//CID from tour ipfs files without 'ipfs://' part. Fake example: 'bafybeigyy2u2sbgtxxr2tdc6snxgefdo52bx2qy2nd3vjrjzaieg4yr3ce'
const ipfs_cid = 'bafybeieoyz3sghr27ybimhssgahaba5of6anmldjjtmufsxen22gmenjl4';




//main func
async function main() {

  //defibe some speical timeing func
  function esperar(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }



  //set network
  let network = "wss://xahau-test.net";
  let NetworkID = 21338;
  if (net === "Mainnet") {
    network = "wss://xahau.network";
    NetworkID = 21337;
  }

  //connect to network
  const client = new xrpl.Client(network);
  await client.connect().then(
    console.log('connected to Xahau')
  );



  //configure hook account for searching
  const account = derive.familySeed(process.env.HOOK_SEED, { algorithm: "secp256k1" });

  //confifure hook wallet for invokes
  const my_wallet = xrpl.Wallet.fromSeed(process.env.HOOK_SEED);

  // log your hook address
  console.log(`Your public address is: ${my_wallet.address}`);


    //check speical utils for network info
    const networkInfo = await utils.txNetworkAndAccountValues(network, account);


  //check your account info
  const response = await client.request({
    command: "account_info",
    account: my_wallet.address,
    ledger_index: "validated",
  });

  //log info about xah amounts
  const total_balance = (response.result.account_data.Balance) / 1000000;
  const reserves = (response.result.account_data.OwnerCount * 0.2) + 1;
  console.log(`Your total balance (available+reserves) is: ${total_balance} XAH`);
  console.log(`Your reserves is: ${reserves} XAH`);
  const balance = total_balance - reserves;
  console.log(`Your available balance is: ${balance} XAH`);

  //NEED TO ADD FIX FOR JSON NUMBERS-------------------------------------------------------------------------------------------------------
  const TicketTotalCost = numberURIs * 0.3;
  console.log(
    `To create the tickets needed, you need to have at least this balance: ${TicketTotalCost} XAH`
  );
  if (balance <= TicketTotalCost) {
    console.log(
      `To create the tickets needed, you need to have at least this balance: ${TicketTotalCost} XAH. I recommend have a bit more.`
    );
    client.disconnect();
    console.log(`Connection closed`);
  } else {

    //We check how many tickets you had before running the code
    let response = await client.request({
      command: "account_objects",
      account: my_wallet.address,
      type: "ticket",
    });
    let numberTickets = 0;
    if (
      Array.isArray(response.result.account_objects) &&
      response.result.account_objects.length > 0
    ) {
      numberTickets = response.result.account_objects.length;
      console.log(`This account has ${numberTickets} tickets already`);
    } else {
      console.log("This account has no tickets already");
    }

    const account_info = await client.request({
      command: "account_info",
      account: my_wallet.address,
    });
    numberTickets = numberURIs - numberTickets;
    console.log(`${numberTickets} tickets will be created`);
    if (numberTickets > 0) {
      let current_sequence = account_info.result.account_data.Sequence;
      console.log("Actual Sequence", current_sequence);
      //Generate tickets:
      const prepared = {
        TransactionType: "TicketCreate",
        Account: my_wallet.address,
        TicketCount: numberTickets,
        Sequence: current_sequence,
        ...networkInfo.txValues,
      };

      // Submit TicketCreate -------------------------------------------------------
      const tx = signAndSubmit(prepared, network, account);
      console.log("Info tx ", tx);
      const jsonDataString = JSON.stringify(tx);
      console.log(jsonDataString);
      //finished
      await esperar(10000);
    } else {
      console.log(
        `New tickets are not created. You have enough created already.`
      );
    };
    const response2 = await client.request({
      command: "account_objects",
      account: my_wallet.address,
      type: "ticket",
    });
    console.log(
      "Checking the tickets created are enough for your bulk minting, wait 10 seconds..."
    );
    let tickets = [];
    await esperar(10000);
    for (let i = 0; i < numberURIs; i++) {
      y = i + 1;
      tickets[i] = response2.result.account_objects[i].TicketSequence;
      console.log("Generated tickets nº ", y, tickets[i]);
    }
    console.log("Ticket generation finished");
    if (numberURIs > response2.result.account_objects.length) {
      console.log(`Tickets needed ${numberURIs}`);
      console.log(`Tickets created ${response2.result.account_objects.length}`);
      console.log(
        `You need more tickets to start the mint, re-execute this code.`
      );
    } else {
      console.log(`Tickets needed ${numberURIs}`);
      console.log(`Tickets created ${response2.result.account_objects.length}`);

      //Checking if every file is in the folder /json_files:
      //NEED TO ADD FIX FOR JSON NUMBERS-------------------------------------------------------------------------------------------------------
      let count_files = 0;
      for (let i = 0; i < numberURIs; i++) {


        //define normal file path
        let filePath = `${basePath}/build/json/00000.json`;

        //set proper for 1-10
        if (i < 10) {
          filePath = `${basePath}/build/json/0000${i + 1}.json`;
        }

        //set proper for 10-99
        if (i >= 10 && i < 100) {
          filePath = `${basePath}/build/json/000${i + 1}.json`;
        }

        //set proper for 100-999
        if (i >= 100 && i < 1000) {
          filePath = `${basePath}/build/json/00${i + 1}.json`;
        }

        //set proper for 100-999
        if (i >= 1000 && i < 10000) {
          filePath = `${basePath}/build/json/0${i + 1}.json`;
        }

        //set proper for 100-999
        if (i >= 10000 && i < 99999) {
          filePath = `./json_files/${i + 1}.json`;
        }

        //ensure all files are in place
        if (fs.existsSync(filePath)) {
          console.log(`File ${filePath} exists.`);
          count_files = count_files + 1;
        } else {
          console.log(`File ${filePath} DOESN'T exists.`);
        }
      }


      if (count_files != numberURIs) {
        console.log(`There are ${numberURIs - count_files} .json files that DONT exists. Please insert them to /json_files folder.`);
      } else {


        //Iterate through json files and invoke them-------------------------------------------------------------------------------------------------------
        for (let i = 0; i < numberURIs; i++) {
          let y = i + 1;


//define normal file path
let uriPath = `00000.json`;


//set proper for 1-10
if (i < 10) {
  uriPath = `0000${y}.json`;
}

//set proper for 10-99
if (i >= 10 && i < 100) {
  uriPath = `000${y}.json`;
}

//set proper for 100-999
if (i >= 100 && i < 1000) {
  uriPath = `00${y}.json`;
}

//set proper for 1000-9999
if (i >= 1000 && i < 10000) {
  uriPath = `0${y}.json`;
}

//set proper for 10000-99999
if (i >= 10000 && i < 99999) {
  uriPath = `${y}.json`;
}


          
 let URI = xrpl.convertStringToHex(`ipfs://${ipfs_cid}/${uriPath}`);
 console.log(URI)

 
 const yHex = y.toString(16).padStart(16, '0').toUpperCase(); // Ensures UINT64 format

 const prepared = await client.autofill({
   TransactionType: "Invoke",
   Account: my_wallet.address,
   NetworkID: NetworkID,
   Sequence: 0,
   TicketSequence: tickets[i],
   HookParameters: [  // ✅ Ensure it's an array of objects
     {
       HookParameter: {
         HookParameterName: "4E554D",  // "NUM" in Hex
         HookParameterValue: yHex  
       }
     },
     {
       HookParameter: {
         HookParameterName: "555249",  // "URI" in Hex
         HookParameterValue: URI
       }
     }
   ],
   Flags: 0
 });
 
 console.log("Prepared TX:", prepared);
 
 const signed = my_wallet.sign(prepared);
 const tx = await client.submitAndWait(signed.tx_blob);
 console.log('TX submitted:', y, tx);
 console.log(JSON.stringify(tx));
 
      }
  
      console.log('Invoke finished. Enjoy!');
      console.log('Feel free to donate to: rCboTXmnomVJzRKVXqDMDFzwTaCKFAcYs or follow me @cbot_xrpl');
  
      await client.disconnect();
      console.log("Connection closed");
  }

}


}
}
main();