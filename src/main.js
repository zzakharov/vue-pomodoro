import Vue from 'vue'
import App from './App.vue'
import notification from './sounds/notification_3.mp3';
import './global.css';

Vue.config.productionTip = false;

new Vue({
  render: h => {
    const props = {
      workPeriod: 1500,
      radius: 120,
      strokePx: 12,
      timerBodyBackground: '#F4F4F4',
      progressBackground: '#C4C4C4',
      progressForeground: '#636363',
      textColor: '#636363',
      buttonColor: '#636363',
      sound: notification
    };

    return h(App, { props });
  }
}).$mount('#app')
