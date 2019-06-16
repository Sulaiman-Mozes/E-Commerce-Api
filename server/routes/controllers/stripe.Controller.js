const stripeSecretKey = process.env.STRIPE_SECRET_KEY;


const stripe = require('stripe')(stripeSecretKey);

module.exports = {
  charge: async (req, res) => {
    try {
      const charges = await stripe.charges.create({ amount: 100, source: 'tok_visa', currency: 'usd' });

      return res.status(200).json({ message: 'payment Successfully', charges });
    } catch (error) {
      return res.status(200).json({ message: 'payment Failure', error });
    }
  },
};
