import Timer from './Timer';

let timer;
const triggerCallback = (callbackName, postValue) => {
  if (timer instanceof Timer) {
    self.postMessage({
      callbackName,
      postValue
    })
  }
}

self.addEventListener('message', message => {
  switch(message.data.command) {
    case 'create':
      console.time('pomodoro');
      timer = new Timer({
        seconds: message.data.seconds,
        beforeTickCallback() {
          triggerCallback('beforeTickCallback', this.remainingSeconds);
        },
        stopCallback() {
          console.timeEnd('pomodoro');
          triggerCallback('stopCallback');
        }
      });
      break;
    case 'start':
      if (timer instanceof Timer) {
        timer.start();
      }
  }
});
