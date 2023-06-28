import { Blockfrost, Lucid, fromText } from "https://deno.land/x/lucid@0.9.8/mod.ts"; Deno

const lucid = await Lucid.new(
 new Blockfrost("http://localhost:8080/api/v1",
  ""),
  "Preprod",
);

lucid.selectWalletFromSeed('damp wish scrub sentence vibrant gauge tumble raven game extend winner acid side amused vote edge affair buzz hospital slogan patient drum day vital');

const { paymentCredential } = lucid.utils.getAddressDetails(
    await lucid.wallet.address(),
  );


const mintingPolicy = lucid.utils.nativeScriptFromJson(
    {
      type: "all",
      scripts: [
        { type: "sig", keyHash: paymentCredential.hash },
        {
          type: "before",
          slot: lucid.utils.unixTimeToSlot(Date.now() + 1000000),
        },
      ],
    },
  );

const policyId = lucid.utils.mintingPolicyToId(mintingPolicy);

const unit = policyId + fromText("MyMintedToken");

const tx = await lucid.newTx()
  .mintAssets({ [unit]: 1n })
  .validTo(Date.now() + 200000)
  .attachMintingPolicy(mintingPolicy)
  .complete();

const signedTx = await tx.sign().complete();

const txHash = await signedTx.submit();

console.log(txHash);
