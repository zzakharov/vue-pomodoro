<template>
  <svg
    :height="radius * 2"
    :width="radius * 2"
  >
    <circle
      fill="transparent"
      style="stroke-dashoffset: 0"
      :stroke="backgroundColor"
      :stroke-width="stroke"
      :stroke-dasharray="`${circumference} ${circumference}`"
      :r="normalizedRadius"
      :cx="radius"
      :cy="radius"
    />
    <circle
      fill="transparent"
      :stroke="foregroundColor"
      :stroke-width="stroke"
      :stroke-dasharray="`${circumference} ${circumference}`"
      :r="normalizedRadius"
      :cx="radius"
      :cy="radius"
      :style="{
        strokeDashoffset,
        ...transitionStyles
      }"
    />
  </svg>
</template>

<script>
import positiveNumberValidator from '../utils/positiveNumberValidator';

export default {
  name: 'RadialProgress',
  props: {
    radius: {
      type: Number,
      required: true,
      validator: positiveNumberValidator
    },
    stroke: {
      type: Number,
      required: true,
      validator: positiveNumberValidator
    },
    progressPercent: {
      type: Number,
      default: 0,
      validator: value => (
        positiveNumberValidator(value) &&
        value <= 100
      )
    },
    backgroundColor: {
      type: String,
      default: '#FFF'
    },
    foregroundColor: {
      type: String,
      default: '#000'
    },
  },
  data() {
    const normalizedRadius = this.radius - this.stroke / 2;
    const circumference =  2 * Math.PI * normalizedRadius;

    return {
      normalizedRadius,
      circumference,
    }
  },
  computed: {
    strokeDashoffset() {
      return this.circumference - this.progressPercent / 100 * this.circumference;
    },
    transitionStyles() {
      const styles = {};
      const isFullOrNull = [0, 100].includes(this.progressPercent);

      if (isFullOrNull) {
        styles.transitionTimingFunction = 'cubic-bezier(0.65, 0, 0.35, 1)';
        styles.transitionDuration = '.4s';
      } else {
        styles.transitionTimingFunction = 'cubic-bezier(0.68, -0.6, 0.32, 1.6)';
        styles.transitionDuration = '.25s';
      }

      return styles;
    },
  },
}
</script>

<style scoped>
  circle {
    transform: rotate(-90deg);
    transform-origin: 50% 50%;
  }
</style>
