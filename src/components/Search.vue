<template>
    <div class="crad">
        <div class="card-header" align="center">
            <form action="" class="form-inline">
                <input type="text" class="form-control form-control-lg wide" placeholder="搜索公众号/文章"
                 v-model="searchInput" @keyup.enter="searchMp(1)">  <!-- @keyup.enter 按键修饰符(enter按键时触发) 相当于 v-on:keyup.enter -->
                <button class="fa fa-search btn btn-lg btn-outline-success" :disabled="searchInput==''"
                   @click="searchMp(1)" ></button> <!-- 绑定disabled属性 -->
            </form>
        </div>
        <div class="card-block">
            <div class="media" v-for="(mp, index) in mpList">
                <div class="media-left imgbox">
                    <a class="" href="#">
                        <img class="media-object rounded " :src="mp.image" style="margin-top: 5px;">
                    </a></div>
                <div class="media-body">
                    <a :href="mp.encGzhUrl" target="_blank" class="nav-link"><h5 v-html="mp.name"></h5></a>
                    <p class="" style="margin-bottom: 0px;"><small> 简介：</small><small v-html="mp.summary"></small></p>
                    <p class="text-muted" style="margin-bottom: 0px;">
                        <a href="javascript:" @click="subscribe(index)">
                            <i class="fa fa-lg float-xs-right"
                               :class="{'fa-star text-danger': mp.isSubscribed, 'fa-star-o text-muted': !mp.isSubscribed,}"></i>
                        </a>
                        <small title="粉丝" class="s1"><i class="fa fa-heart-o"></i> {{ mp.rank.fans }} </small>
                        <small title="月平均发表文章" class="s1"><i class="fa fa-file-text-o"></i> {{ mp.rank.pnum }}</small>
                        <small title="平均阅读次数" class="s1"><i class="fa fa-eye"></i> {{ mp.rank.rnum }}</small>
                        <small  title="最近更新" class=" s2"> <i class="fa fa-clock-o"></i> {{ mp.date }} </small></p>
                    <p class="text-muted" style="margin-bottom: 30px;"> <small class="text-muted s1">
                        <a :href="mp.url" target="_blank" class="nav-link">{{ mp.title1}}</a>
                        <span v-html="mp.content"></span> </small> </p>
                </div>
            </div>
        </div>
        <div class="card card-block text-xs-right" v-if="hasNextPage && searchResultJson && !isSearching">
            <h5 class="btn btn-outline-success btn-block" @click="searchMp(page)"> 下一页 ({{page}})
                <i class="fa fa-angle-double-right"></i>
            </h5>
        </div>
    </div>
</template>

<script>
    export default {
      name: 'SearchResult',
      data() {         // data 必须为一个函数，由此，每当创建一个实例都会创建一个新的数据副本
        return {
          searchKey: '',
          searchInput: '',
          searchResultJson: '',
          isSearching: false,
          page: 1,
          hasNextPage: true,
          hasPrePage: false
        }
      },
//      data:function(){
//        return {
//          searchKey: '',
//          searchInput: '',
//          searchResultJson: '',
//          isSearching: false,
//          page: 1,
//          hasNextPage: true,
//          hasPrePage: false
//        }
//      },
      computed: {
        subscribeList() {   // this 指向当前vue实例
          return this.$store.state.subscribeList     // 从vuex store 中取出数据
        },
        mpList() {
          return this.$store.state.mpList
        }
      },
      methods: {
        searchMp(pg) {
          this.isSearching = true;
          if(pg==1) {
            this.searchKey = this.searchInput;
            this.$store.dispatch('clearSearchResult', 'clear');
            this.page = 1;
            this.hasNextPage = true;
            this.hasPrePage = false;
          }
          // DOM 还没有更新
          this.$nextTick(function () {
            // DOM 更新了
          });
          this.$http.jsonp("http://weixin.sogou.com/weixinwap?_rtype=json&ie=utf8", {
              params: {
                page: pg,
                type: 1, //公众号
                query: this.searchKey
              },
              jsonp:'cb'
          }).then(
              function(res){
              // 处理搜狗返回的数据，又臭又长
                this.searchResultJson = JSON.parse(res.bodyText);
                var mpXmls = this.searchResultJson.items;
                var i, xmlDoc, mpResult, onePageResults=[];
                for (i in mpXmls) {
                  mpResult = {};
                  xmlDoc = new DOMParser().parseFromString(mpXmls[i], 'text/xml');
                  mpResult['title'] = xmlDoc.getElementsByTagName("title")[1].childNodes[0].nodeValue;
                  mpResult['name'] = xmlDoc.getElementsByTagName("name")[0].childNodes[0].nodeValue.replace('', '<span class="text-success">').replace('', '</span>');
                  try {
                    mpResult['summary'] = xmlDoc.getElementsByTagName("summary")[0].childNodes[0].nodeValue.replace('', '<span class="text-success">').replace('', '</span>')
                  }catch (e) {
                    mpResult['summary'] = '无介绍'
                  }

                  mpResult['encGzhUrl'] = xmlDoc.getElementsByTagName("encGzhUrl")[0].childNodes[0].nodeValue; 	// 主页链接
                  try {
                    mpResult['url'] = xmlDoc.getElementsByTagName("url")[2].childNodes[0].nodeValue; 		// 最新更新文章
                    mpResult['title1'] = xmlDoc.getElementsByTagName("title1")[0].childNodes[0].nodeValue;
                  } catch (e) {
                    mpResult['url'] =  '';
                    mpResult['title1'] =  ''
                  }
                  try {
                    mpResult['content'] = xmlDoc.getElementsByTagName("content")[0].childNodes[0].nodeValue.replace('', '<span class="text-success">').replace('', '</span>');
                  } catch (e) {
                    mpResult['content'] = ''
                  }
                  mpResult['date'] = xmlDoc.getElementsByTagName("date")[1].childNodes[0].nodeValue;
                  mpResult['image'] = xmlDoc.getElementsByTagName("image")[0].childNodes[0].nodeValue;
                  mpResult['weixinhao'] = xmlDoc.getElementsByTagName("weixinhao")[0].childNodes[0].nodeValue;
                  mpResult['openid'] = xmlDoc.getElementsByTagName("id")[0].childNodes[0].nodeValue;
                  var rank = xmlDoc.getElementsByTagName("rank")[0].attributes;
                  mpResult['rank'] = {};
                  mpResult['rank']['fans'] = rank.fans.nodeValue;	// 粉丝数
                  mpResult['rank']['rnum'] = rank.rnum.nodeValue;	// 月发文 篇
                  mpResult['rank']['pnum'] = rank.pnum.nodeValue;	// 平均阅读
                  mpResult['isSubscribed'] = false;
                  for(let item of this.subscribeList) {
                    if(item.weixinhao == mpResult['weixinhao'] ) {
                      mpResult['isSubscribed'] = true;
                      break
                    }
                  }
                  onePageResults.push(mpResult);
                }
                this.$store.dispatch('addSearchResultList', onePageResults);    // 通知 vuex保存搜索结果
                this.searchInput = '';
                if(this.page > 1){
                  this.hasPrePage = true;
                }
                this.page = this.page+1;
                if (this.page > this.searchResultJson.totalPages) {
                    this.hasNextPage = false;
                }
                this.isSearching = false;
              },
              function(){
                this.isSearching = false;
                alert('Sorry, 网络似乎有问题')
              }
          );
        },
        subscribe(idx) {
          if (this.mpList[idx].isSubscribed== true ) {
            // 删除该公众号
            return this.$store.dispatch('unsubSearchResult',this.mpList[idx].weixinhao);
          }
          // 如果Mp添加了新的属性，在这里增加
          var mp = {
            mpName : this.mpList[idx].title,
            image : this.mpList[idx].image,
            date : this.mpList[idx].date,	// 最近更新
            weixinhao : this.mpList[idx].weixinhao,
            encGzhUrl : this.mpList[idx].encGzhUrl,
            openid : this.mpList[idx].openid,
            subscribeDate : new Date().getTime(),
            showRemoveBtn: false
          };
          for(let item of this.subscribeList) {
            // 如果已经订阅，则什么也不做
            if(item.mpName == mp.mpName) return false
          }
          this.$store.dispatch('subscribeMp', mp);
          //  this.mpList[idx].isSubscribed = true;
        }
      }
    }
</script>

<style>
    .form-inline .wide {
        width: 80%;
    }
    .wide{
        margin-right: 25px;
    }
    .imgbox {
        width: 100px;
        height: 120px;
        overflow: hidden;
        margin-right: 10px;
    }
    .imgbox img{
        max-width: 100px;
        /*max-height: 120px;*/
    }
    .s1 {
        margin-right: 20px;
    }
    .s2 {
        margin-left: 20px;
        margin-right: 20px;
    }
    .btn{
        cursor: pointer;
    }
</style>