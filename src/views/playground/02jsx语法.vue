<script setup lang="tsx">
import { ref } from 'vue';

const money = ref(100)
const list = ref([
  { id: 1, content: "吃饭", done: true },
  { id: 2, content: "睡觉", done: false },
  { id: 3, content: "打代码", done: true },
]);

const fn = () => {
  money.value++
}

const MyBox = () => {

  if (money.value < 105) {
    return (
      <div>
        <button onClick={fn}>继续挣钱</button>
      </div>
    )
  } else {
    return (
      <div>
        <h1>盒子 -- {money.value}</h1>
        <button onClick={fn}>挣钱</button>
        <ul>
          {
            list.value.map((item) => <li key={item.id}>{item.content}</li>)
          }
        </ul>
      </div>
    )
  }
}
</script>


<template>
  <MyBox></MyBox>
</template>


<style scoped>

</style>
