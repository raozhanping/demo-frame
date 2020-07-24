<template>
  <div id="app">
    <nav id="nav">
      <router-link
        :to="route.path"
        v-for="route in $router.options.routes"
        :key="route.path"
      >{{route.name}}</router-link>
    </nav>
    <main id="content">
      <keep-alive>
        <router-view />
      </keep-alive>
    </main>
  </div>
</template>
<script>
export default {
  created() {
    console.log(this)
  }
}
</script>

<style lang="scss">
#app {
  --primary-color: #42b983;
  --border-color: #ebebeb;
  --text-color: #2c3e50;
  display: flex;
  width: 100vw;
  height: 100vh;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: var(--text-color);
}
#nav {
  width: 20vw;
  padding: 10px;
  display: flex;
  flex-direction: column;
  border-right: 1px solid var(--border-color);
  a {
    width: 100%;
    height: 40px;
    font-weight: bold;
    color: var(--text-color);
    &:hover {
      color: var(--primary-color);
    }
    &.router-link-exact-active {
      color: var(--primary-color);
    }
  }
}
#content {
  flex: 1;
}
</style>
