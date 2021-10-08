import braintree from "braintree"

const gateway = new braintree.BraintreeGateway({
  environment: braintree.Environment.Sandbox,
  merchantId: "vpw2nybwkyjpb5rs",
  publicKey: "8p2wf83dw2x93yy2",
  privateKey: "fcc5a3e5380e17f3ce27976894bccea6"
});

export const getToken=(req,res)=>{
    gateway.clientToken.generate({}, (err, response) => {
        if(err){
           res.status(500).send(err)
       }else{
           res.send(response)
       }
      });
    }
    
export const processPayment=(req,res)=>{
    let nonceFromTheClient =req.body.paymentMethodNonce
    let amount=req.body.amount 
    gateway.transaction.sale({
        amount: amount,
        paymentMethodNonce: nonceFromTheClient,
        options: {
          submitForSettlement: true
        }
      }, (err, result) => {
          if (err) {
              res.status(500).json(err)
          }else{
              res.json(result)

          }
      });
}