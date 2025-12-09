const { cToF, fToC, validateOptions } = require('../src/temperature');

describe('Temperature Converter', () => {
  describe('cToF (Celsius to Fahrenheit)', () => {
    test('converts freezing point (0°C = 32°F)', () => {
      expect(cToF(0)).toBe(32);
    });

    test('converts boiling point (100°C = 212°F)', () => {
      expect(cToF(100)).toBe(212);
    });

    test('converts body temperature (37°C = 98.6°F)', () => {
      expect(cToF(37)).toBeCloseTo(98.6, 1);
    });

    test('converts negative temperature (-40°C = -40°F)', () => {
      expect(cToF(-40)).toBe(-40);
    });

    test('converts room temperature (25°C = 77°F)', () => {
      expect(cToF(25)).toBe(77);
    });

    test('handles decimal input (20.5°C)', () => {
      expect(cToF(20.5)).toBeCloseTo(68.9, 1);
    });
  });

  describe('fToC (Fahrenheit to Celsius)', () => {
    test('converts freezing point (32°F = 0°C)', () => {
      expect(fToC(32)).toBe(0);
    });

    test('converts boiling point (212°F = 100°C)', () => {
      expect(fToC(212)).toBe(100);
    });

    test('converts body temperature (98.6°F = 37°C)', () => {
      expect(fToC(98.6)).toBeCloseTo(37, 1);
    });

    test('converts negative temperature (-40°F = -40°C)', () => {
      expect(fToC(-40)).toBe(-40);
    });

    test('converts room temperature (77°F = 25°C)', () => {
      expect(fToC(77)).toBe(25);
    });

    test('handles decimal input (68.9°F)', () => {
      expect(fToC(68.9)).toBeCloseTo(20.5, 1);
    });
  });

  describe('validateOptions', () => {
    test('allows valid C to F conversion', () => {
      expect(() => validateOptions('C', 'F')).not.toThrow();
    });

    test('allows valid F to C conversion', () => {
      expect(() => validateOptions('F', 'C')).not.toThrow();
    });

    test('rejects same unit conversion (C to C)', () => {
      expect(() => validateOptions('C', 'C'))
        .toThrow('Cannot convert from C to C');
    });

    test('rejects same unit conversion (F to F)', () => {
      expect(() => validateOptions('F', 'F'))
        .toThrow('Cannot convert from F to F');
    });

    test('rejects invalid from unit', () => {
      expect(() => validateOptions('K', 'F'))
        .toThrow('Invalid unit: K. Must be C or F');
    });

    test('rejects invalid to unit', () => {
      expect(() => validateOptions('C', 'K'))
        .toThrow('Invalid unit: K. Must be C or F');
    });

    test('rejects lowercase units', () => {
      expect(() => validateOptions('c', 'f'))
        .toThrow('Invalid unit');
    });

    test('rejects empty from unit', () => {
      expect(() => validateOptions('', 'F'))
        .toThrow('Invalid unit');
    });

    test('rejects empty to unit', () => {
      expect(() => validateOptions('C', ''))
        .toThrow('Invalid unit');
    });

    test('rejects null/undefined units', () => {
      expect(() => validateOptions(null, 'F'))
        .toThrow('Invalid unit');
      expect(() => validateOptions('C', undefined))
        .toThrow('Invalid unit');
    });
  });

  describe('Round-trip conversions', () => {
    test('C → F → C returns original value', () => {
      const original = 25;
      const fahrenheit = cToF(original);
      const backToCelsius = fToC(fahrenheit);
      expect(backToCelsius).toBeCloseTo(original, 10);
    });

    test('F → C → F returns original value', () => {
      const original = 77;
      const celsius = fToC(original);
      const backToFahrenheit = cToF(celsius);
      expect(backToFahrenheit).toBeCloseTo(original, 10);
    });
  });
});

