const Stopwatch = require('../src/stopwatch');

describe('Stopwatch', () => {
  describe('formatTime', () => {
    test('formats 0ms correctly', () => {
      expect(Stopwatch.formatTime(0)).toBe('00:00:00.000');
    });

    test('formats milliseconds only', () => {
      expect(Stopwatch.formatTime(123)).toBe('00:00:00.123');
    });

    test('formats seconds correctly', () => {
      expect(Stopwatch.formatTime(5000)).toBe('00:00:05.000');
    });

    test('formats minutes correctly', () => {
      expect(Stopwatch.formatTime(125000)).toBe('00:02:05.000');
    });

    test('formats hours correctly', () => {
      expect(Stopwatch.formatTime(3725123)).toBe('01:02:05.123');
    });

    test('formats large values correctly', () => {
      expect(Stopwatch.formatTime(86399999)).toBe('23:59:59.999');
    });

    test('handles values over 24 hours', () => {
      expect(Stopwatch.formatTime(90000000)).toBe('25:00:00.000');
    });
  });

  describe('valid sequence: start → lap → stop', () => {
    test('can start stopwatch', () => {
      const sw = new Stopwatch();
      sw.start();
      expect(sw.isRunning).toBe(true);
    });

    test('elapsedMs returns 0 immediately after start', () => {
      const sw = new Stopwatch();
      sw.start();
      const elapsed = sw.elapsedMs();
      expect(elapsed).toBeGreaterThanOrEqual(0);
      expect(elapsed).toBeLessThan(10); // Should be very small
    });

    test('elapsedMs increases over time', (done) => {
      const sw = new Stopwatch();
      sw.start();
      setTimeout(() => {
        const elapsed = sw.elapsedMs();
        expect(elapsed).toBeGreaterThanOrEqual(50);
        expect(elapsed).toBeLessThan(150);
        done();
      }, 100);
    });

    test('lap records current time and returns it', (done) => {
      const sw = new Stopwatch();
      sw.start();
      setTimeout(() => {
        const lapTime = sw.lap();
        expect(lapTime).toBeGreaterThanOrEqual(50);
        expect(sw.laps).toHaveLength(1);
        expect(sw.laps[0]).toBe(lapTime);
        done();
      }, 100);
    });

    test('multiple laps can be recorded', (done) => {
      const sw = new Stopwatch();
      sw.start();
      setTimeout(() => {
        sw.lap();
        setTimeout(() => {
          sw.lap();
          expect(sw.laps).toHaveLength(2);
          expect(sw.laps[1]).toBeGreaterThan(sw.laps[0]);
          done();
        }, 50);
      }, 50);
    });

    test('stop stops the stopwatch and returns final time', (done) => {
      const sw = new Stopwatch();
      sw.start();
      setTimeout(() => {
        const finalTime = sw.stop();
        expect(sw.isRunning).toBe(false);
        expect(finalTime).toBeGreaterThanOrEqual(50);
        done();
      }, 100);
    });

    test('elapsedMs returns stopped time after stop', (done) => {
      const sw = new Stopwatch();
      sw.start();
      setTimeout(() => {
        const stoppedTime = sw.stop();
        // Wait a bit more
        setTimeout(() => {
          const elapsed = sw.elapsedMs();
          // Elapsed should be same as stopped time, not continuing
          expect(elapsed).toBe(stoppedTime);
          done();
        }, 50);
      }, 100);
    });
  });

  describe('invalid sequences', () => {
    test('lap before start throws error', () => {
      const sw = new Stopwatch();
      expect(() => sw.lap()).toThrow('Cannot lap: stopwatch not started');
    });

    test('stop before start throws error', () => {
      const sw = new Stopwatch();
      expect(() => sw.stop()).toThrow('Cannot stop: stopwatch not started');
    });

    test('elapsedMs before start returns 0', () => {
      const sw = new Stopwatch();
      expect(sw.elapsedMs()).toBe(0);
    });

    test('cannot start twice without stopping', () => {
      const sw = new Stopwatch();
      sw.start();
      expect(() => sw.start()).toThrow('Stopwatch is already running');
    });

    test('cannot stop twice', () => {
      const sw = new Stopwatch();
      sw.start();
      sw.stop();
      expect(() => sw.stop()).toThrow('Cannot stop: stopwatch not started');
    });

    test('lap after stop throws error', () => {
      const sw = new Stopwatch();
      sw.start();
      sw.stop();
      expect(() => sw.lap()).toThrow('Cannot lap: stopwatch not started');
    });
  });
});

