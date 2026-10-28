import crypto from 'crypto';

export interface RazorpayOrderPayload {
  amount: number; // in paise (e.g. 110000 = Rs 1100)
  currency: string;
  receipt: string;
  notes?: Record<string, string>;
}

export interface RazorpayOrderResponse {
  id: string;
  entity: string;
  amount: number;
  amount_paid: number;
  amount_due: number;
  currency: string;
  receipt: string;
  status: 'created' | 'attempted' | 'paid';
  attempts: number;
  notes: Record<string, string>;
  created_at: number;
}

/**
 * Validates Razorpay Payment Signature cryptographically
 * signature = HMAC-SHA256(order_id + "|" + payment_id, secret)
 */
export function verifyRazorpaySignature(
  orderId: string,
  paymentId: string,
  razorpaySignature: string,
  keySecret: string
): boolean {
  if (!orderId || !paymentId || !razorpaySignature || !keySecret) {
    return false;
  }
  const text = `${orderId}|${paymentId}`;
  const generatedSignature = crypto
    .createHmac('sha256', keySecret)
    .update(text)
    .digest('hex');

  const generatedBuffer = Buffer.from(generatedSignature, 'utf-8');
  const signatureBuffer = Buffer.from(razorpaySignature, 'utf-8');

  if (generatedBuffer.length !== signatureBuffer.length) {
    return false;
  }

  return crypto.timingSafeEqual(generatedBuffer, signatureBuffer);
}

/**
 * Creates a server-side order with Razorpay REST API
 */
export async function createRazorpayOrder(
  payload: RazorpayOrderPayload,
  keyId: string,
  keySecret: string
): Promise<RazorpayOrderResponse> {
  const authHeader = 'Basic ' + Buffer.from(`${keyId}:${keySecret}`).toString('base64');

  const response = await fetch('https://api.razorpay.com/v1/orders', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: authHeader,
    },
    body: JSON.stringify({
      amount: payload.amount,
      currency: payload.currency || 'INR',
      receipt: payload.receipt,
      notes: payload.notes || {},
    }),
  });

  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(`Razorpay API Error [${response.status}]: ${errorBody}`);
  }

  return (await response.json()) as RazorpayOrderResponse;
}
