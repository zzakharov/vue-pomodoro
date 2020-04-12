<template>
  <div
    class="timer-wrapper"
    :style="{
      color: textColor,
      ...fontStyles
    }"
  >
    <h1>Pomodoro</h1>
    <div class="timer-root">
      <RadialProgress
        :radius="radius"
        :stroke="strokePx"
        :progressPercent="progressPercent"
        :foregroundColor="progressForeground"
        :backgroundColor="progressBackground"
      />
      <div class="timer-root__body">
        <TimerBody
          :radius="radius - strokePx"
          :backgroundColor="timerBodyBackground"
        >
          <transition name="fade">
            <div
              class="animated"
              key="1"
              v-if="started"
            >
              {{formatedTime}}
            </div>
            <div
              class="animated"
              key="2"
              v-else
            >
              <PlayButton
                :handleClick="handleStart"
                :color="buttonColor"
                :width="playButtonWidth"
                :height="playButtonHeight"
              />
            </div>
          </transition>
        </TimerBody>
      </div>
    </div>
  </div>
</template>

<script>
import positiveNumberValidator from './utils/positiveNumberValidator';
import assignIdenticalProperties from './utils/assignIdenticalProperties';
import TimerWorker from 'worker-loader?fallback=true!./utils/timerWorkerWrapper';

import RadialProgress from './components/RadialProgress';
import TimerBody from './components/TimerBody';
import PlayButton from './components/PlayButton';

export default {
  name: 'App',
  props: {
    ...assignIdenticalProperties([
      'workPeriod',
      'radius',
      'strokePx',
    ], {
      type: Number,
      required: true,
      validator: positiveNumberValidator
    }),
    ...assignIdenticalProperties([
      'timerBodyBackground',
      'progressBackground',
      'progressForeground',
      'buttonColor',
      'sound'
    ], {
      type: String
    }),
    textColor: {
      type: String,
      default: '#000'
    },
  },
  components: {
    RadialProgress,
    TimerBody,
    PlayButton,
  },
  data () {
    const fontStyles = {
      fontSize: `${this.radius / 1.875}px`,
      lineHeight: `${this.radius / 1.6}px`
    };
    const playButtonWidth = this.radius / 2.857;
    const playButtonHeight = this.radius / 1.665;
    let audioObject = null;

    if (this.sound) {
      audioObject = new Audio(this.sound);
    }

    return {
      fontStyles,
      playButtonWidth,
      playButtonHeight,
      audioObject,
      secondsPassed: 0,
      started: false,
    };
  },
  methods: {
    handleStart() {
      const app = this;
      const worker = new TimerWorker();

      worker.postMessage({
        command: 'create',
        seconds: app.workPeriod
      });

      worker.addEventListener('message', message => {
        switch(message.data.callbackName) {
          case 'beforeTickCallback':
            app.secondsPassed = app.workPeriod - message.data.postValue;
            break;
          case 'stopCallback':
            app.playSound();
            worker.terminate();

            setTimeout(() => {
              app.started = false;
              app.secondsPassed = 0;
            }, 550);
        }
      });

      worker.postMessage({
        command: 'start'
      });

      app.started = true;
    },
    playSound() {
      if (this.audioObject) {
        this.audioObject.play();
      }
    }
  },
  computed: {
    progressPercent() {
      const secondsInPercent = this.workPeriod / 100;

      return this.secondsPassed / secondsInPercent;
    },
    formatedTime() {
      const remainingSeconds = this.workPeriod - this.secondsPassed;
      const minutes = Math.floor(remainingSeconds / 60);
      const seconds = remainingSeconds % 60;

      return [minutes, seconds].map(time => (
          time.toString()
              .padStart(2, '0')
      )).join(':');
    },
  },
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Roboto&display=swap&text=0123456789:pomdr');

.timer-wrapper {
  font-family: Roboto, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  margin-top: 74px;
}
h1 {
  margin-bottom: 98px;
  font-size: 24px;
  line-height: 28px;
  color: #000;
}
.timer-root {
  position: relative;
}
.timer-root__body {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.animated {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
.fade-enter-active,
.fade-leave-active {
    transition: .55s;
}

.fade-enter,
.fade-leave-to {
    opacity: 0;
    transform: translate(-50%, -10%);
}
</style>
