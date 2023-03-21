const router = require("express").Router();
const Razorpay = require('razorpay');
 const shortid = require('shortid')
 const bodyParser = require('body-parser')
// const stripe = require("stripe")(process.env.STRIPE_KEY);
 router.use(bodyParser.json())

const razorpay = new Razorpay({
	key_id: 'rzp_test_vxmw1WaPp9zxSb',
	key_secret: 'Jy5XQBVFo23GLbWLNQ8Wkyyp'
})

router.post('/payment', async (req, res) => {
	console.log(req.body.amount);
	const payment_capture = 1
	const amount = req.body.amount
	const currency = 'INR'

	const options = {
		amount: parseInt(amount) * 100,
		currency,
		receipt: shortid.generate(),
		payment_capture
	}

	try {
		const response = await razorpay.orders.create(options)
		console.log(response)
		console.log(response.amount)
		res.json({
			id: response.id,
			currency: response.currency,
			amount: response.amount
		})
	} catch (error) {
		console.log(error)
	}
})

// router.post("/payment", (req, res) => {
//   console.log(req.body);
//  stripe.charges.create(
//     {
//       source: req.body.tokenId,
//       amount: req.body.amount,
//       currency: 'usa'
//     },
//     (stripeErr, stripeRes) => {
//       if (stripeErr) {
//         res.status(500).json(stripeErr);
//       } else {
//         res.status(200).json(stripeRes);
//       }
//     }
//   );
// });
module.exports = router;
