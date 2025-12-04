# 📧 EmailJS Setup Guide

This guide will help you set up EmailJS to receive order notifications via email.

## Why EmailJS?

- ✅ **Free tier**: 200 emails/month (perfect for starting out)
- ✅ **No backend needed**: Works entirely from the browser
- ✅ **Easy setup**: 5 minutes to configure
- ✅ **Reliable**: Professional email delivery

## Step-by-Step Setup

### Step 1: Create EmailJS Account

1. Go to [https://www.emailjs.com/](https://www.emailjs.com/)
2. Click **"Sign Up"** (it's free!)
3. Create your account (you can use Google/GitHub to sign in)

### Step 2: Add Your Email Service

**⚠️ IMPORTANT: If Gmail API doesn't work, use Gmail SMTP instead (more reliable)**

#### Option A: Gmail SMTP (Recommended - More Reliable)

1. In EmailJS dashboard, go to **"Email Services"**
2. Click **"Add New Service"**
3. Choose **"Gmail"** → Select **"Gmail SMTP"** (NOT Gmail API)
4. You'll need to create a Gmail App Password:
   - Go to your Google Account: https://myaccount.google.com/
   - Click **Security** → **2-Step Verification** (enable it if not already)
   - Then go to **App Passwords**: https://myaccount.google.com/apppasswords
   - Select "Mail" and "Other (Custom name)" → Type "EmailJS"
   - Copy the 16-character password it generates
5. Back in EmailJS:
   - **Email**: Your Gmail address (e.g., yourname@gmail.com)
   - **Password**: Paste the 16-character App Password (NOT your regular Gmail password)
   - **Name**: Security Kitty Orders (or any name you like)
6. Click **"Create Service"**
7. **Save your Service ID** (you'll see it after creation)

#### Option B: Gmail API (If SMTP doesn't work)

1. In EmailJS dashboard, go to **"Email Services"**
2. Click **"Add New Service"**
3. Choose **"Gmail"** → Select **"Gmail API"**
4. Click **"Connect Account"** and sign in with Google
5. **If it says "please connect your account" after signing in:**
   - Try refreshing the page
   - Try a different browser (Chrome works best)
   - Clear browser cache and cookies
   - Make sure pop-ups aren't blocked
   - Try disconnecting and reconnecting
6. Once connected, click **"Create Service"**
7. **Save your Service ID**

### Step 3: Create Email Template

1. Go to **"Email Templates"** in the dashboard
2. Click **"Create New Template"**
3. Use this template:

**Subject:**
```
New Security Kitty Order #{{order_number}} - €{{total_price}}
```

**Content (Email Body) - Select "HTML" format:**
```html
<div style="font-family: system-ui, sans-serif, Arial; font-size: 14px; color: #333; padding: 14px 8px; background-color: #f5f5f5;">
  <div style="max-width: 600px; margin: auto; background-color: #fff">
    <div style="border-top: 6px solid #6366f1; padding: 16px">
      <span style="font-size: 24px; vertical-align: middle; margin-right: 8px;">🐾</span>
      <span style="font-size: 16px; vertical-align: middle; border-left: 1px solid #333; padding-left: 8px;">
        <strong>New Security Kitty Order</strong>
      </span>
    </div>
    <div style="padding: 0 16px">
      <p style="color: #666; margin-bottom: 16px;">A new order has been placed. The customer will receive an automatic confirmation email with payment instructions.</p>
      
      <div style="text-align: left; font-size: 14px; padding-bottom: 4px; border-bottom: 2px solid #333; margin-bottom: 16px;">
        <strong>Order Number: {{order_number}}</strong><br>
        <span style="font-size: 12px; color: #666;">Order Date: {{order_date}}</span>
      </div>

      <div style="background-color: #f9fafb; padding: 16px; border-radius: 8px; margin-bottom: 16px;">
        <h3 style="margin-top: 0; color: #6366f1; font-size: 16px;">Customer Details</h3>
        <p style="margin: 8px 0;"><strong>Name:</strong> {{customer_name}}</p>
        <p style="margin: 8px 0;"><strong>Email:</strong> {{customer_email}}</p>
        <p style="margin: 8px 0;"><strong>Phone:</strong> {{customer_phone}}</p>
        <p style="margin: 8px 0;"><strong>Delivery Address:</strong><br>{{delivery_address}}</p>
        <p style="margin: 8px 0;"><strong>Eircode:</strong> {{eircode}}</p>
      </div>

      <div style="margin-bottom: 16px;">
        <h3 style="color: #6366f1; font-size: 16px; margin-bottom: 8px;">Order Items</h3>
        <div style="background-color: #f9fafb; padding: 12px; border-radius: 8px; font-family: monospace; white-space: pre-line; font-size: 13px;">{{order_items}}</div>
      </div>

      <div style="padding: 16px 0;">
        <div style="border-top: 2px solid #333;"></div>
      </div>

      <table style="border-collapse: collapse; width: 100%; text-align: right; margin-bottom: 16px;">
        <tr>
          <td style="width: 60%;"></td>
          <td style="padding: 8px;">Total Quantity</td>
          <td style="padding: 8px; white-space: nowrap;">{{total_quantity}}</td>
        </tr>
        <tr>
          <td style="width: 60%;"></td>
          <td style="padding: 8px;">Savings</td>
          <td style="padding: 8px; white-space: nowrap; color: #10b981;">{{savings}}</td>
        </tr>
        <tr>
          <td style="width: 60%;"></td>
          <td style="padding: 8px; color: #f59e0b;">🎁 Bonus Item</td>
          <td style="padding: 8px; white-space: nowrap; color: #f59e0b;">{{bonus_item}}</td>
        </tr>
        <tr>
          <td style="width: 60%;"></td>
          <td style="border-top: 2px solid #333; padding-top: 16px;">
            <strong style="white-space: nowrap;">Order Total</strong>
          </td>
          <td style="padding: 16px 8px; border-top: 2px solid #333; white-space: nowrap;">
            <strong style="font-size: 18px; color: #6366f1;">{{total_price}}</strong>
          </td>
        </tr>
      </table>

      <div style="background-color: #dbeafe; border-left: 4px solid #6366f1; padding: 16px; margin: 16px 0; border-radius: 4px;">
        <p style="margin: 0 0 12px 0; font-weight: 600; color: #1e40af; font-size: 16px;">✅ Automated Process</p>
        <p style="margin: 0 0 12px 0; color: #1e3a8a;">
          The customer has automatically received a confirmation email with:
        </p>
        <ul style="margin: 8px 0; padding-left: 20px; color: #1e3a8a;">
          <li>Order confirmation and details</li>
          <li>Revolut payment link (https://revolut.me/seckit)</li>
          <li>Payment instructions including order number</li>
        </ul>
      </div>

      <div style="background-color: #fef3c7; border-left: 4px solid #f59e0b; padding: 12px; margin: 16px 0; border-radius: 4px;">
        <p style="margin: 0; font-weight: 600; color: #92400e;">📋 Your Next Steps:</p>
        <ol style="margin: 8px 0; padding-left: 20px; color: #78350f;">
          <li><strong>Wait for payment</strong> - Customer will pay via the Revolut link they received</li>
          <li><strong>Verify payment</strong> - Check your Revolut account and match payment notes to order number: <strong>{{order_number}}</strong></li>
          <li><strong>Prepare order</strong> - Once payment confirmed, prepare and package the Security Kitties</li>
          <li><strong>Ship with An Post</strong> - Send the package and notify customer within 24 hours that An Post has collected it</li>
        </ol>
      </div>
    </div>
  </div>
  <div style="max-width: 600px; margin: auto; padding-top: 16px;">
    <p style="color: #999; font-size: 12px; text-align: center;">
      Security Kitty Order Notification<br />
      Hand-printed in Dublin, Ireland
    </p>
  </div>
</div>
```

**Note:** I removed the `{{#if}}` conditional - the bonus_item will always show (it will say "No" if there's no bonus, which is fine).

**Important:** Make sure to select **"HTML"** as the content type when creating the template in EmailJS (not plain text).

4. **Save your Template ID** (you'll need this later) - This is your **Business Owner Template ID**

### Step 4: Create Customer Confirmation Email Template

You'll need a second template for sending order confirmations to customers:

1. Go to **"Email Templates"** → **"Create New Template"**
2. Template Name: `Security Kitty Customer Confirmation`
3. Subject: `Your Security Kitty Order Confirmation - {{order_number}}`

**To Email:** `{{to_email}}` (this will use the customer's email address)

**From Name:** `Security Kitty`

**From Email:** Check "Use Default Email Address"

**Reply To:** Your Gmail address

**Content (Email Body) - Select "HTML" format:**
```html
<div style="font-family: system-ui, sans-serif, Arial; font-size: 14px; color: #333; padding: 14px 8px; background-color: #f5f5f5;">
  <div style="max-width: 600px; margin: auto; background-color: #fff">
    <div style="border-top: 6px solid #6366f1; padding: 16px">
      <span style="font-size: 24px; vertical-align: middle; margin-right: 8px;">🐾</span>
      <span style="font-size: 16px; vertical-align: middle; border-left: 1px solid #333; padding-left: 8px;">
        <strong>Thank You for Your Order!</strong>
      </span>
    </div>
    <div style="padding: 0 16px">
      <p style="color: #666; margin-bottom: 16px;">Hi {{customer_name}},</p>
      <p style="color: #666; margin-bottom: 16px;">Thank you for your Security Kitty order! We've received your order request.</p>
      <p style="color: #666; margin-bottom: 16px;"><strong>Important:</strong> Your order will be processed and prepared once payment is received. Please scroll down for payment instructions.</p>
      
      <div style="text-align: left; font-size: 14px; padding-bottom: 4px; border-bottom: 2px solid #333; margin-bottom: 16px;">
        <strong>Order Number: {{order_number}}</strong>
      </div>

      <div style="margin-bottom: 16px;">
        <h3 style="color: #6366f1; font-size: 16px; margin-bottom: 8px;">Your Order</h3>
        <div style="background-color: #f9fafb; padding: 12px; border-radius: 8px; font-size: 13px; white-space: pre-line;">{{order_items}}</div>
      </div>

      <div style="padding: 16px 0;">
        <div style="border-top: 2px solid #333;"></div>
      </div>

      <table style="border-collapse: collapse; width: 100%; text-align: right; margin-bottom: 16px;">
        <tr>
          <td style="width: 60%;"></td>
          <td style="border-top: 2px solid #333; padding-top: 16px;">
            <strong style="white-space: nowrap;">Order Total</strong>
          </td>
          <td style="padding: 16px 8px; border-top: 2px solid #333; white-space: nowrap;">
            <strong style="font-size: 18px; color: #6366f1;">{{total_price}}</strong>
          </td>
        </tr>
      </table>

      <div style="background-color: #dbeafe; border-left: 4px solid #6366f1; padding: 16px; margin: 16px 0; border-radius: 4px;">
        <p style="margin: 0 0 12px 0; font-weight: 600; color: #1e40af; font-size: 16px;">💳 Complete Your Payment</p>
        <p style="margin: 0 0 12px 0; color: #1e3a8a;">
          <strong>Amount to pay: {{payment_amount}}</strong>
        </p>
        <p style="margin: 0 0 16px 0; color: #1e3a8a;">
          Click the button below to pay securely via Revolut:
        </p>
        <div style="text-align: center; margin: 20px 0;">
          <a href="{{revolut_link}}" style="display: inline-block; background: linear-gradient(135deg, #6366f1 0%, #ec4899 100%); color: white; padding: 16px 32px; text-decoration: none; border-radius: 12px; font-weight: 600; font-size: 16px; box-shadow: 0 4px 15px rgba(99, 102, 241, 0.4); transition: transform 0.2s;">
            💰 Pay {{payment_amount}} via Revolut
          </a>
        </div>
        <div style="background-color: #fff; border: 2px solid #6366f1; border-radius: 8px; padding: 12px; margin-top: 16px;">
          <p style="margin: 0 0 8px 0; font-weight: 600; color: #1e40af; font-size: 14px;">⚠️ Important Payment Instructions:</p>
          <ol style="margin: 0; padding-left: 20px; color: #1e3a8a; font-size: 13px;">
            <li>Click the payment button above</li>
            <li>Enter the payment amount: <strong>{{payment_amount}}</strong></li>
            <li><strong>Copy your order number:</strong> <span style="background-color: #fef3c7; padding: 2px 6px; border-radius: 4px; font-family: monospace; font-weight: 600;">{{order_number}}</span></li>
            <li><strong>Paste it in the payment notes/reference field</strong> so we can match your payment to your order</li>
          </ol>
        </div>
      </div>

      <div style="background-color: #f9fafb; padding: 16px; border-radius: 8px; margin: 16px 0;">
        <h3 style="margin-top: 0; color: #6366f1; font-size: 16px;">Delivery Details</h3>
        <p style="margin: 8px 0;"><strong>Delivery Address:</strong><br>{{delivery_address}}</p>
        <p style="margin: 8px 0;"><strong>Eircode:</strong> {{eircode}}</p>
        <p style="margin: 8px 0; color: #666; font-size: 13px;">You'll receive an email within 24 hours confirming that An Post has collected your package and it's on the way.</p>
      </div>

      <div style="background-color: #f0fdf4; border-left: 4px solid #10b981; padding: 16px; margin: 16px 0; border-radius: 4px;">
        <p style="margin: 0 0 12px 0; font-weight: 600; color: #065f46; font-size: 16px;">📦 What Happens After Payment?</p>
        <ol style="margin: 8px 0; padding-left: 20px; color: #047857; font-size: 14px;">
          <li><strong>We receive your payment</strong> - We'll match it to your order using your order number</li>
          <li><strong>We prepare your order</strong> - Your Security Kitties will be carefully packaged</li>
          <li><strong>We ship via An Post</strong> - Your package will be sent to the address you provided</li>
          <li><strong>You get confirmation</strong> - Within 24 hours of shipping, you'll receive an email confirming that An Post has collected your package</li>
        </ol>
        <p style="margin: 12px 0 0 0; color: #047857; font-size: 13px;">
          <strong>Estimated delivery:</strong> 2-3 business days after An Post collection (standard delivery within Ireland)
        </p>
      </div>

      <p style="color: #666; margin-top: 24px;">If you have any questions, just reply to this email!</p>
      <p style="color: #666; margin-bottom: 16px;">Thank you for supporting Security Kitty! 🐾</p>
    </div>
  </div>
  <div style="max-width: 600px; margin: auto; padding-top: 16px;">
    <p style="color: #999; font-size: 12px; text-align: center;">
      Security Kitty<br />
      Hand-printed in Dublin, Ireland<br />
      Order Date: {{order_date}}
    </p>
  </div>
</div>
```

4. **Save your Customer Template ID** (you'll need this later)

**Important:** Make sure Content Type is set to **"HTML"**

### Step 5: Get Your Public Key

1. Go to **"Account"** → **"General"**
2. Find your **"Public Key"** (starts with something like `abc123xyz`)
3. **Copy this key** (you'll need it)

### Step 6: Get Your Revolut Payment Link

1. Open your Revolut app
2. Go to **"Request"** or **"Payment Links"**
3. Create a new payment request (you can leave the amount blank or set a default)
4. Copy the payment link (it will look something like: `https://revolut.me/yourname` or similar)
5. **Save this link** - you'll need it in the next step

### Step 7: Update Your Website Code

1. Open `index.html`
2. Find this line (around line 850):
   ```javascript
   emailjs.init("YOUR_PUBLIC_KEY");
   ```
3. Replace `YOUR_PUBLIC_KEY` with your actual EmailJS Public Key

4. Open `script.js`
5. Find these lines (around line 1030):
   ```javascript
   const EMAILJS_SERVICE_ID = 'YOUR_SERVICE_ID';
   const EMAILJS_TEMPLATE_ID = 'YOUR_TEMPLATE_ID';
   ```
6. Replace:
   - `YOUR_SERVICE_ID` with your Service ID from Step 2
   - `YOUR_TEMPLATE_ID` with your **Business Owner Template ID** from Step 3

7. Find this line (around line 1100):
   ```javascript
   const EMAILJS_CUSTOMER_TEMPLATE_ID = 'YOUR_CUSTOMER_TEMPLATE_ID';
   ```
8. Replace `YOUR_CUSTOMER_TEMPLATE_ID` with your **Customer Template ID** from Step 4

9. Find this line (around line 1105):
   ```javascript
   const REVOLUT_PAYMENT_LINK = 'YOUR_REVOLUT_PAYMENT_LINK';
   ```
10. Replace `YOUR_REVOLUT_PAYMENT_LINK` with your actual Revolut payment link from Step 6

### Step 8: Test It!

1. Go to your website
2. Add some items to cart
3. Fill in the order form
4. Click "Submit Order Request"
5. Check your email inbox - you should receive the order!

## Troubleshooting

### Email not sending?

1. **Check browser console** (F12) for error messages
2. **Verify your keys** are correct in the code
3. **Check EmailJS dashboard** → "Logs" to see if emails are being sent
4. **Make sure** your email service is connected properly

### Getting "EmailJS not loaded" error?

- Make sure the EmailJS script is loaded in `index.html`
- Check your internet connection
- Verify the EmailJS CDN link is correct

### Emails going to spam?

- Add your email address to your contacts
- Check spam folder
- Consider using a custom domain email for better deliverability

## Free Tier Limits

- **200 emails/month** on the free plan
- If you need more, upgrade to a paid plan (starts at $15/month for 1,000 emails)

## Security Note

The Public Key is safe to use in frontend code - it's designed to be public. However, make sure your email service is properly configured and only sends emails to your verified email address.

## Need Help?

- EmailJS Docs: https://www.emailjs.com/docs/
- EmailJS Support: support@emailjs.com
- Check EmailJS dashboard logs for detailed error messages

---

**Once set up, every order will automatically email you with all the details, and you can then send a Revolut payment request to the customer!** 🎉

