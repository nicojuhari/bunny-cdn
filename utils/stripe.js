import Stripe from "stripe";
export const createCheckout = async ({
    priceId,
    mode,
    successUrl,
    cancelUrl,
    couponId,
    clientReferenceId,
    user,
}) => {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

    const extraParams = {};

    if (user?.customerId) {
        extraParams.customer = user.customerId;
    } else {
        if (mode === "payment") {
            extraParams.customer_creation = "always";
            // The option below costs 0.4% (up to $2) per invoice. Alternatively, you can use https://zenvoice.io/ to create unlimited invoices automatically.
            // extraParams.invoice_creation = { enabled: true };
            extraParams.payment_intent_data = { setup_future_usage: "on_session" };
        }
        if (user?.email) {
            extraParams.customer_email = user.email;
        }
        extraParams.tax_id_collection = { enabled: true };
    }

    const stripeSession = await stripe.checkout.sessions.create({
        mode,
        allow_promotion_codes: true,
        client_reference_id: clientReferenceId,
        line_items: [
            {
                price: priceId,
                quantity: 1,
            },
        ],
        discounts: couponId
            ? [
                  {
                      coupon: couponId,
                  },
              ]
            : [],
        success_url: successUrl,
        cancel_url: cancelUrl,
        ...extraParams,
    });

    return stripeSession.url;
};
