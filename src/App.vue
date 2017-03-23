<!-- 项目框架 -->
<template>
  <div id="app">
    <div class="container">
      <!--<nav class="navbar navbar-dark bg-inverse navbar-fixed-top">
        <router-link to="/" class="navbar-brand text-success">繁读</router-link>
        <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
          <li class="nav-item">
            <router-link to="/home" class="nav-link"><i class="fa fa-home"></i>Home</router-link>
          </li>
          <li class="nav-item">
            <a href="#" class="nav-link"><i class="fa fa-flag"></i>Hot</a>
          </li>
        </ul>
        <form action="" class="form-inline float-xs-right">
          <input type="text" class="form-control" placeholder="搜索公共号/文章">
          <router-link to="/search"><i class="fa fa-search btn btn-outline-success" @click=""></i></router-link>
          <i class="fa fa-user-o btn btn-outline-success"></i>
        </form>
      </nav>-->
      <nav class="navbar navbar-toggleable-md navbar-light bg-faded">
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarTogglerDemo01">
          <router-link to="/" class="navbar-brand text-success">繁读</router-link>
          <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
            <li class="nav-item active">
              <router-link to="/home" class="nav-link"><i class="fa fa-home"></i>Home</router-link>
            </li>
            <li class="nav-item">
              <a href="#" class="nav-link"><i class="fa fa-flag"></i>Hot</a>
            </li>
          </ul>
          <form class="form-inline my-2 my-lg-0">
            <input type="text" class="form-control" placeholder="搜索公共号/文章">
            <router-link to="/search"><i class="fa fa-search btn btn-outline-success" @click=""></i></router-link>
            <i class="fa fa-user-o btn btn-outline-success"></i>
          </form>
        </div>
      </nav>
    </div>

    <div class="container" style="margin-top: 80px">
      <div class="row">
        <div class="col-xs-12 col-md-3 push-md-9 col-xl-3 push-xl-9"> <!-- 左到右push 右往左pull -->
          <siderbar></siderbar>
        </div>
        <div class="col-xs-12 col-md-9 pull-md-3 col-xl-9 pull-xl-3">
          <router-view></router-view> <!-- 此处渲染视图组件，渲染嵌套组件(若加上name属性，则为命名视图，渲染对应的路由配置中 components 下的相应组件) -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Siderbar from './components/Siderbar.vue'  // 导入Sidebar组件
  export default{     // 导出父组件
      components: {
          'siderbar': Siderbar      // 局部注册Sidebar组件, 当前组件为其父模板
      }
  }
</script>

<style>
  .fa-flag, .fa-home{
    color: #5cb85c;
  }
  nav .fa-search{
    margin-left: 10px;
    margin-right: 1px;
  }
</style>
