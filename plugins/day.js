import Vue from 'vue'
import dayjs from 'dayjs'

Vue.filter('dayjs', (value, formatter = 'YYYY-MM-DD HH:mm:ss') => {
  if (!value) return ''
  return dayjs(value).format(formatter)
})