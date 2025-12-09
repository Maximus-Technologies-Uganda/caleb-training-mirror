/**
 * Pure stopwatch core module (no direct I/O)
 */

class Stopwatch {
  constructor() {
    this.startTime = null;
    this.stopTime = null;
    this.laps = [];
    this.isRunning = false;
  }

  /**
   * Starts the stopwatch
   * @throws {Error} if stopwatch is already running
   */
  start() {
    if (this.isRunning) {
      throw new Error('Stopwatch is already running');
    }
    this.startTime = Date.now();
    this.stopTime = null;
    this.laps = [];
    this.isRunning = true;
  }

  /**
   * Records a lap time
   * @returns {number} elapsed time in milliseconds at the lap
   * @throws {Error} if stopwatch is not running
   */
  lap() {
    if (!this.isRunning) {
      throw new Error('Cannot lap: stopwatch not started');
    }
    const lapTime = this.elapsedMs();
    this.laps.push(lapTime);
    return lapTime;
  }

  /**
   * Stops the stopwatch
   * @returns {number} final elapsed time in milliseconds
   * @throws {Error} if stopwatch is not running
   */
  stop() {
    if (!this.isRunning) {
      throw new Error('Cannot stop: stopwatch not started');
    }
    this.stopTime = Date.now();
    this.isRunning = false;
    return this.elapsedMs();
  }

  /**
   * Gets the elapsed time in milliseconds
   * @returns {number} elapsed time in milliseconds
   */
  elapsedMs() {
    if (!this.startTime) {
      return 0;
    }
    const endTime = this.stopTime || Date.now();
    return endTime - this.startTime;
  }

  /**
   * Formats milliseconds into HH:MM:SS.mmm format
   * @param {number} ms - milliseconds to format
   * @returns {string} formatted time string
   */
  static formatTime(ms) {
    const totalSeconds = Math.floor(ms / 1000);
    const milliseconds = ms % 1000;
    
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    const pad = (num, size) => String(num).padStart(size, '0');

    return `${pad(hours, 2)}:${pad(minutes, 2)}:${pad(seconds, 2)}.${pad(milliseconds, 3)}`;
  }
}

module.exports = Stopwatch;

