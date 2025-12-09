/**
 * Pure temperature conversion functions (no I/O)
 */

/**
 * Converts Celsius to Fahrenheit
 * Formula: F = (C × 9/5) + 32
 * @param {number} celsius - Temperature in Celsius
 * @returns {number} Temperature in Fahrenheit
 */
function cToF(celsius) {
  return (celsius * 9/5) + 32;
}

/**
 * Converts Fahrenheit to Celsius
 * Formula: C = (F - 32) × 5/9
 * @param {number} fahrenheit - Temperature in Fahrenheit
 * @returns {number} Temperature in Celsius
 */
function fToC(fahrenheit) {
  return (fahrenheit - 32) * 5/9;
}

/**
 * Validates conversion options
 * @param {string} from - Source temperature unit ('C' or 'F')
 * @param {string} to - Target temperature unit ('C' or 'F')
 * @throws {Error} If options are invalid
 */
function validateOptions(from, to) {
  const validUnits = ['C', 'F'];
  
  // Check if units are valid
  if (!from || !validUnits.includes(from)) {
    throw new Error(`Invalid unit: ${from}. Must be C or F`);
  }
  
  if (!to || !validUnits.includes(to)) {
    throw new Error(`Invalid unit: ${to}. Must be C or F`);
  }
  
  // Check if trying to convert to same unit
  if (from === to) {
    throw new Error(`Cannot convert from ${from} to ${to}`);
  }
}

module.exports = {
  cToF,
  fToC,
  validateOptions
};

