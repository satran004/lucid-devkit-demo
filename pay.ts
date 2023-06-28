import { Blockfrost, Lucid } from "https://deno.land/x/lucid@0.9.8/mod.ts"; Deno

const lucid = await Lucid.new(
 // new Blockfrost("https://cardano-preprod.blockfrost.io/api/v0", 
 new Blockfrost("http://localhost:8080/api/v1",
  ""),
  "Preprod",
);

lucid.selectWalletFromSeed('damp wish scrub sentence vibrant gauge tumble raven game extend winner acid side amused vote edge affair buzz hospital slogan patient drum day vital');

const tx = await lucid.newTx()
  .payToAddress("addr_test1wr297svp7eth4y2qd356a042gwn3th93j93843sa3hgm5lcgc3gkc", { lovelace: 5000000n })
  .complete();

const signedTx = await tx.sign().complete();

const txHash = await signedTx.submit();

console.log(txHash);
