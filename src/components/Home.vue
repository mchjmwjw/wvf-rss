<template>
    <div>
        <div class="jumbotron">
            <h1 class="display-3 text-success">繁 读</h1>
            <p class="lead">微信公众号简单阅读器 RSS</p>
            <hr class="my-2">
            <p>公众号平常是在微信里阅读，经常会给微信消息打断。这里是一个不被打扰、能个人定制的安静阅读环境。</p>
            <p class="lead">
                <a class="btn btn-outline-success btn-lg" href="#" role="button">Learn more</a>
            </p>
        </div>
    </div>
</template>

<style>
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        /*text-align: center;*/
        color: #2c3e50;
        margin-top: 60px;
    }
    #leftmenu {
        position: absolute;
        left: 0;
        width: 20%;
    }
    #rightcontent {
        position: absolute;
        left: 20%;
        width: 78%;
    }
    #bottom {
        left: 5%;
        position: absolute;
        width: 90%;
        top:95%;
    }
    h1, h2 {
        font-weight: normal;
    }
    a {
        color: #42b983;
    }
</style>