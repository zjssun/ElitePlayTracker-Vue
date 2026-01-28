<script setup lang="ts">
   const model = defineModel<string>({required:true});
</script>

<template>
   <div class="input-wrapper">
    <label>用户名称：</label>
    <input v-model="model" type="text" placeholder="请输入..." />
    
    <button @click="model = 'Vue Very Cool'">一键填入</button>
  </div>
</template>

<style scoped>
.input-wrapper { margin: 10px 0; border: 1px solid #ccc; padding: 10px; }
</style>