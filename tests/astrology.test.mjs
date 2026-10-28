import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import {
  calculateJulianDay,
  calculateLahiriAyanamsha,
  getZodiacSign,
  getNakshatraInfo,
  generateKundli
} from '../src/lib/astrology/kundli.ts';
import { calculateKundliMatching } from '../src/lib/astrology/matching.ts';
import { verifyRazorpaySignature } from '../src/lib/payments/razorpay.ts';

describe('Vedic Astronomy & Ephemeris Calculations', () => {
  test('Julian Day Number for J2000 Epoch (2000-01-01 12:00 UTC)', () => {
    const jd = calculateJulianDay(2000, 1, 1, 12);
    assert.equal(jd, 2451545.0, 'JD should match J2000 standard reference');
  });

  test('Lahiri Ayanamsha for J2000 Epoch is ~23.85°', () => {
    const jd = 2451545.0;
    const ayan = calculateLahiriAyanamsha(jd);
    assert.ok(ayan > 23.85 && ayan < 23.86, `Expected ~23.85°, got ${ayan}°`);
  });

  test('Zodiac sign determination from longitude', () => {
    const aries = getZodiacSign(15);
    assert.equal(aries.sign, 'Aries');
    assert.equal(aries.odiaSign, 'ମେଷ');
    assert.equal(aries.signIndex, 1);

    const leo = getZodiacSign(125);
    assert.equal(leo.sign, 'Leo');
    assert.equal(leo.signIndex, 5);
  });

  test('Nakshatra and Pada calculation', () => {
    const ashwini = getNakshatraInfo(5);
    assert.equal(ashwini.nakshatra, 'Ashwini');
    assert.equal(ashwini.pada, 2);

    const bharani = getNakshatraInfo(20);
    assert.equal(bharani.nakshatra, 'Bharani');
  });

  test('Kundli Generation returns valid 9 planets and 12 houses', () => {
    const kundli = generateKundli('Test Client', '1995-10-25', '14:30', 'Bhubaneswar', 20.2961, 85.8245, 5.5);
    assert.equal(kundli.planets.length, 9, 'Must calculate 9 Vedic planets (Navagraha)');
    assert.equal(kundli.houses.length, 12, 'Must calculate 12 Bhavas');
    assert.ok(kundli.lagna.sign, 'Lagna must have a designated sign');
    assert.ok(kundli.moonSign.sign, 'Moon sign must exist');
  });
});

describe('Ashtakoota 36-Guna Kundli Matching', () => {
  test('Calculates 8 Kootas and total score <= 36', () => {
    const boy = generateKundli('Groom', '1992-04-12', '08:00', 'Cuttack', 20.46, 85.88, 5.5);
    const girl = generateKundli('Bride', '1994-07-18', '11:30', 'Bhubaneswar', 20.29, 85.82, 5.5);

    const match = calculateKundliMatching(boy, girl);
    assert.equal(match.kootas.length, 8, 'Must calculate exactly 8 Kootas');
    assert.ok(match.totalScore >= 0 && match.totalScore <= 36, 'Score must be within 0-36 Gunas');
    assert.ok(match.verdict.grade, 'Must provide an assessment grade');
  });
});

import crypto from 'node:crypto';

describe('Razorpay Cryptographic Verification', () => {
  test('Validates authentic HMAC SHA256 payment signature', () => {
    const orderId = 'order_test_123';
    const paymentId = 'pay_test_456';
    const secret = 'sacred_key_secret';

    const validSig = crypto
      .createHmac('sha256', secret)
      .update(`${orderId}|${paymentId}`)
      .digest('hex');

    const isValid = verifyRazorpaySignature(orderId, paymentId, validSig, secret);
    assert.equal(isValid, true, 'Cryptographic signature must verify successfully');

    const isTampered = verifyRazorpaySignature(orderId, paymentId, 'tampered_signature', secret);
    assert.equal(isTampered, false, 'Tampered signature must be rejected');
  });
});
