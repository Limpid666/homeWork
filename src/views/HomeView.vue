<template>
  <div class="home">
    <ccButton>默认按钮</ccButton>
    <ccButton type="primary">成功按钮</ccButton>
    <ccButton type="danger">危险按钮</ccButton>
    <ccButton type="warning">警告按钮</ccButton>
  </div>
</template>

<script>

export default {
  name: 'Home',
  data() {
    return {
      flag: false
    }
  },
  components: {
    ccButton: () => import('../components/button/index.vue')
  },
  methods: {
    handleSubmit() {
      this.flag = true
      setTimeout(() => {
        console.log('123')
        this.flag = false
      }, 3000)
    }
  }
}
</script>
