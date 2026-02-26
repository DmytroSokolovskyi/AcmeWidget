import { describe, expect, it } from 'vitest';
import { Basket } from './Basket';
import { defaultCatalog, defaultDeliveryRule, defaultOfferRules } from './pricingRules';

const createBasket = () =>
    new Basket({
      catalog: defaultCatalog,
      deliveryRule: defaultDeliveryRule,
      offerRules: defaultOfferRules,
    });

describe('Base Requirements', () => {
  it('B01, G01 => 37.85', () => {
    const basket = createBasket();
    basket.addProductByCode('B01');
    basket.addProductByCode('G01');
    expect(basket.total()).toBeCloseTo(37.85, 2);
  });

  it('R01, R01 => 54.37', () => {
    const basket = createBasket();
    basket.addProductByCode('R01');
    basket.addProductByCode('R01');
    expect(basket.total()).toBeCloseTo(54.37, 2);
  });

  it('R01, G01 => 60.85', () => {
    const basket = createBasket();
    basket.addProductByCode('R01');
    basket.addProductByCode('G01');
    expect(basket.total()).toBeCloseTo(60.85, 2);
  });

  it('B01, B01, R01, R01, R01 => 98.27', () => {
    const basket = createBasket();
    basket.addProductByCode('B01');
    basket.addProductByCode('B01');
    basket.addProductByCode('R01');
    basket.addProductByCode('R01');
    basket.addProductByCode('R01');
    expect(basket.total()).toBeCloseTo(98.27, 2);
  });
});

describe('Edge cases', () => {
  it('should throw error for invalid product codes', () => {
    const basket = createBasket();
    expect(() => basket.addProductByCode('UNKNOWN')).toThrowError('Unknown product code: UNKNOWN');
  });

  it('should handle empty state correctly', () => {
    const basket = createBasket();
    expect(basket.total()).toBe(0);
  });

  it('should apply discount correctly', () => {
    const basket = createBasket();
    basket.addProductByCode('R01');
    basket.addProductByCode('R01');
    basket.addProductByCode('R01');

    const breakdown = basket.breakdown();
    expect(breakdown.discountCents).toBe(Math.ceil(3295 / 2));
  });
});
