<template>
  <el-switch
    ref="switchRef"
    v-model="darkMode"
    v-bind="attrs"
    :active-action-icon="DarkIcon"
    :inactive-action-icon="LightIcon"
    :before-change="handleBeforeChange"
  />
</template>

<script setup lang="ts">
import { ref, watch, useAttrs } from 'vue';
import { isDark, toggleDark } from './helper';
import DarkIcon from './darkIcon.vue';
import LightIcon from './lightIcon.vue';

defineOptions({
  name: 'ThemeToggler'
})
const attrs = useAttrs()
const switchRef = ref()

const darkMode = ref(isDark.value)

watch(
  () => darkMode.value,
  (newVal) => {
    console.log('darkMode changed:', newVal)
    toggleDark()
  }
)
declare global {
  interface Document {
    startViewTransition?: (callback: () => void) => {
      ready: Promise<void>;
    };
  }
}
const handleBeforeChange = () => {
  if (!document.startViewTransition){
    toggleDark()//
    return true
  }

  return new Promise(resolve => {
    const switchEl = switchRef.value.$el as HTMLElement
    const rect = switchEl.getBoundingClientRect()
    const x = rect.left + rect.width / 2
    const y = rect.top + rect.height / 2
    const radius = Math.hypot(
      Math.max(x, innerWidth - x),
      Math.max(y, innerHeight - y)
    )
    
    const transition = document.startViewTransition(() => {
      toggleDark() //
      resolve(true)
    })
    transition.ready.then(() => {
      document.documentElement.animate(
        {
          clipPath: [
            `circle(0px at ${x}px ${y}px)`,
            `circle(${radius}px at ${x}px ${y}px)`
          ]
        },
        {
          duration: 400,
          easing: 'ease-in',
          pseudoElement: '::view-transition-new(root)'
        }
      )
    })
  })
}
</script>

<style lang="scss" scoped>
:deep(.dark-icon) {
  border-radius: 50%;
  color: #cfd3dc;
  background-color: #141414;
}

:deep(.light-icon) {
  color: #606266;
}

</style>