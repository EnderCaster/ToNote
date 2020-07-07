<template>
  <div class="ec-header">
    <img src="../images/logo.png" class="layout-logo" />
  </div>
</template>
<style lang="less" scoped>
.ec-header {
  background-color: rgb(197, 195, 195);
  width: 100%;
  height: 60px;
  position: absolute;
  .layout-logo {
    width: 100px;
    height: 30px;
    border-radius: 3px;
    float: left;
    position: relative;
    top: 15px;
    left: 20px;
  }
}
</style>
<script>
export default {
  name: "ec-header"
};
</script>