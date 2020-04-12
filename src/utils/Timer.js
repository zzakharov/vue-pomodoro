export default class Timer {
  #tickInterval;
  #beforeTickCallback;
  #stopCallback;
  #remainingSeconds;
  #interval = null;
  #previousTickTimestamp = 0;
  startTimestamp = 0;
  endTimestamp = 0;

  constructor({
      seconds = 0,
      beforeTickCallback = () => {},
      stopCallback = () => {},
      tickInterval = 1000,
  }) {
      this.#remainingSeconds = seconds;
      this.#beforeTickCallback = beforeTickCallback;
      this.#stopCallback = stopCallback;
      this.#tickInterval = tickInterval;
  }

  get remainingSeconds() {
    return this.#remainingSeconds;
  }

  _tick() {
    this.#beforeTickCallback();

    if (this.#remainingSeconds <= 0) {
      clearInterval(this.#interval);
      this.endTimestamp = Date.now();
      this.#stopCallback();

      return;
    }

    const tickTimestamp = Date.now();

    this.#tickInterval = 1000 + this.#previousTickTimestamp - tickTimestamp;
    this.#previousTickTimestamp = tickTimestamp;

    --this.#remainingSeconds;
  }

  start() {
      this.startTimestamp = Date.now();
      this.endTimestamp = 0;
      this.#previousTickTimestamp = this.startTimestamp;

      this._tick();

      this.#interval = setInterval(
          this._tick.bind(this),
          this.#tickInterval
      );
  }
}
