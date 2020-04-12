<template>
  <div
    class="timer-body"
    :style="{
      width: diameterPx,
      height: diameterPx,
      backgroundColor
    }"
  >
    <div class="timer-body__slot">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import positiveNumberValidator from '../utils/positiveNumberValidator';

export default {
  name: 'TimerBody',
  props: {
    radius: {
      type: Number,
      required: true,
      validator: positiveNumberValidator
    },
    backgroundColor: {
      type: String,
      default: '#FFF'
    }
  },
  data() {
    const diameterPx = `${this.radius * 2}px`;

    return {
      diameterPx,
    }
  },
}
</script>

<style scoped>
  .timer-body {
    display: inline-block;
    position: relative;
    border-radius: 100%;
  }
  .timer-body__slot {
    display: inline-block;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
</style>
