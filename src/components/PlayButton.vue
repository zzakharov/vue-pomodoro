<template>
  <button
    type="button"
    @click="handleClick"
    :style="styles"
  >
  </button>
</template>

<script>
export default {
  name: 'PlayButton',
  props: {
    handleClick: {
      type: Function,
      required: true,
    },
    width: {
      type: Number,
      required: true
    },
    height: {
      type: Number,
      required: true
    },
    color: {
      type: String,
      default: '#000'
    },
  },
  data: function() {
    const borderColor = `${'transparent '.repeat(3)} ${this.color}`;
    const borderWidth = `${this.width}px 0 ${this.width}px ${this.height}px`;
    const transformX = this.width * 2 / 3.5;
    const transform = `translate(-${transformX}px, -${51}%)`

    return {
      styles: {
        borderColor,
        borderWidth,
        transform,
      },
    };
  }
}
</script>

<style scoped>
  button {
    background: none;
    width: 0;
    height: 0;
    border-style: solid;
    position: absolute;
    transition: .15s;
    left: 50%;
    top: 50%;
  }
  button:hover {
    opacity: .6;
  }
  button:active {
    opacity: .3;
  }
  button:focus {
    outline: none;
  }
</style>
