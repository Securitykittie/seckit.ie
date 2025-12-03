# Stripe Payment Integration Setup

## Quick Setup (5 minutes)

### Step 1: Get Stripe Account
1. Sign up at https://stripe.com (free)
2. Get your **Secret Key** from Dashboard → Developers → API keys
3. Copy your **Publishable Key** too (for future use)

### Step 2: Install Dependencies
```bash
npm install
```

### Step 3: Set Your Stripe Key
Create a `.env` file in the project root:
```
STRIPE_SECRET_KEY=sk_test_your_secret_key_here
```

Or set it directly when running:
```bash
STRIPE_SECRET_KEY=sk_test_your_key node server.js
```

### Step 4: Start the Server
```bash
npm start
```

The server will run on `http://localhost:3000`

### Step 5: Update Frontend (if needed)
If your server is on a different URL, update the fetch URL in `script.js`:
```javascript
const response = await fetch('YOUR_SERVER_URL/create-checkout-session', {
```

## How It Works

1. User fills in order details and clicks "Proceed to Payment"
2. Frontend sends order to your server
3. Server creates Stripe Checkout session
4. User is redirected to Stripe's secure payment page
5. After payment, user is redirected to success page
6. You receive payment instantly in your Stripe account

## Testing

Use Stripe test cards:
- Success: `4242 4242 4242 4242`
- Any future expiry date
- Any 3-digit CVC
- Any postal code

## Production

1. Switch to **Live Mode** in Stripe Dashboard
2. Use your **Live Secret Key** (starts with `sk_live_`)
3. Deploy server to hosting (Heroku, Railway, etc.)
4. Update frontend URL to production server

## Alternative: Stripe Payment Links (No Backend)

If you don't want to run a server, you can use Stripe Payment Links:
1. Create payment links in Stripe Dashboard
2. Link them to your checkout button
3. Less flexible but simpler

## Support

- Stripe Docs: https://stripe.com/docs
- Stripe Support: https://support.stripe.com

