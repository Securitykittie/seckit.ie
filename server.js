// Simple Express server for Stripe Checkout
// Run: npm install express stripe cors
// Then: node server.js

const express = require('express');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY); // Your Stripe secret key
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Create Stripe Checkout Session
app.post('/create-checkout-session', async (req, res) => {
    try {
        const { items, customerInfo, total } = req.body;

        // Build line items for Stripe
        const lineItems = [];
        
        // Add each product with quantity
        Object.entries(items).forEach(([productName, quantity]) => {
            if (quantity > 0) {
                // Calculate price per item based on total quantity
                const totalQty = Object.values(items).reduce((sum, qty) => sum + qty, 0);
                const pricing = getPricingForQuantity(totalQty);
                
                lineItems.push({
                    price_data: {
                        currency: 'eur',
                        product_data: {
                            name: `Security Kitty - ${productName}`,
                            description: `Security Kitty style: ${productName}`,
                        },
                        unit_amount: Math.round(pricing.perItem * 100), // Convert to cents
                    },
                    quantity: quantity,
                });
            }
        });

        // Add bonus item if applicable
        const totalQty = Object.values(items).reduce((sum, qty) => sum + qty, 0);
        if (totalQty >= 5) {
            lineItems.push({
                price_data: {
                    currency: 'eur',
                    product_data: {
                        name: 'Security Kitty - Black & Blue (FREE BONUS)',
                        description: 'Free bonus item with 5+ purchase',
                    },
                    unit_amount: 0, // Free
                },
                quantity: 1,
            });
        }

        // Create checkout session
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: lineItems,
            mode: 'payment',
            success_url: `${req.headers.origin}/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${req.headers.origin}/order`,
            customer_email: customerInfo.contact.includes('@') ? customerInfo.contact : undefined,
            metadata: {
                customerName: customerInfo.name,
                deliveryAddress: customerInfo.address,
                eircode: customerInfo.eircode,
                contact: customerInfo.contact,
                orderDetails: JSON.stringify(items),
            },
        });

        res.json({ sessionId: session.id, url: session.url });
    } catch (error) {
        console.error('Error creating checkout session:', error);
        res.status(500).json({ error: error.message });
    }
});

// Helper function to calculate pricing (same logic as frontend)
function getPricingForQuantity(qty) {
    const pricingData = {
        1: { total: 10, perItem: 10.00 },
        2: { total: 18, perItem: 9.00 },
        3: { total: 25, perItem: 8.33 },
        4: { total: 30, perItem: 7.50 },
        5: { total: 35, perItem: 7.00 },
    };
    
    if (qty <= 5) {
        return pricingData[qty] || pricingData[1];
    }
    
    // For quantities > 5, use €7 per item
    const basePrice = pricingData[5].total;
    const additionalItems = qty - 5;
    const additionalPrice = additionalItems * pricingData[5].perItem;
    const total = basePrice + additionalPrice;
    
    return {
        total: total,
        perItem: pricingData[5].perItem,
    };
}

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log('Make sure to set STRIPE_SECRET_KEY environment variable');
});

