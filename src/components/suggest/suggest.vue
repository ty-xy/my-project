<template>
  <scroll 
  class="suggest" 
  :data="result" 
  :pullup="pullup"
  @scrollToEnd="searchMore"
  >
      <ul class="suggest-list">
          <li class="suggest-item" v-for="item in result " :key="item.id">
              <div class="icon">
                  <i :class="getIconClass(item)"></i>
              </div>
              <div class="name">
                  <p class="text" v-html="getDisplayName(item)"></p>
              </div>
             
          </li>
           <loading v-show="hasMore" title=""></loading>
      </ul>
      <!-- <div v-show="!hasMore && !result.length" class="no-result-wrapper">
        <no-result title="抱歉，暂无搜索结果"></no-result>
      </div> -->
  </scroll>
</template>
<script  type="text/ecmascript-6">
import {search} from 'api/search'
import {ERR_OK} from 'api/config'
import {createSong} from 'common/js/song'
import {filterSinger} from 'common/js/song'
import Scroll from 'base/scroll/scroll'
import Loading from 'base/loading/loading'
const perpage = 20
const TYPE_SINGER = "singer"
export default {
    props:{
        query:{
           type:String,
           default:''
        },
        showSinger:{
           type:Boolean,
           default:true
        }
    },
    data(){
        return {
            page:1,
            result:[],
            pullup:true,
            hasMore:true
        }
    },
    methods:{
         search(){
             this.hasMore = true
             search (this.query,this.page,this.showSinger,perpage).then((res)=>{
                  if(ERR_OK === res.code){
                      console.log(res.data)
                      this.result =  this.genResult(res.data)
                      console.log(this.result)
                      this._checkMore(res.data)
                  }
             })
         },
         searchMore(){
              if(!this.hasMore){
                  return
              }
              this.page++
              search (this.query,this.page,this.showSinger,perpage).then((res)=>{
                  if(ERR_OK === res.code){
                      this.result =  this.result.concat(this.genResult(res.data))
                    //   console.log(this.result)
                      this._checkMore(res.data)
                  }
             })
         },
         _checkMore(data){
             const song = data.song
             if(!song.list.length||(song.curnum + song.curpage*perpage)>song.totalnum){
                   this.hasMore = false 
             }
         },
         getIconClass(item){
             if(item.type===TYPE_SINGER){
                 return 'icon-mine'
             }else{
                 return 'icon-music'
             }
         },
         getDisplayName(item){
               if(item.type===TYPE_SINGER){
                   return item.singername
               }else{
                   return `${item.name}-${item.singer}`
               }
         },
         genResult(data){
             let ret = []
             if(data.zhida&&data.zhida.singeid){
                 ret.push({...data.zhida,...{type:TYPE_SINGER}})
                 console.log(ret)
             }
             if(data.song){
                 ret = ret.concat(this._normalizeSongs(data.song.list))
             }
             return ret
         },
         _normalizeSongs(list){
             let ret = []
             list.forEach((musicData)=>{
                 if(musicData.songid&&musicData.albumid){
                     ret.push(createSong(musicData))
                 }
             })
             return ret 
         }
    },
    watch:{
        query(){
            this.search()
        }
    },
    components:{
        Scroll,
        Loading
    }
}
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"

  .suggest
    height: 100%
    overflow: hidden
    .suggest-list
      padding: 0 30px
      .suggest-item
        display: flex
        align-items: center
        padding-bottom: 20px
      .icon
        flex: 0 0 30px
        width: 30px
        [class^="icon-"]
          font-size: 14px
          color: $color-text-d
      .name
        flex: 1
        font-size: $font-size-medium
        color: $color-text-d
        overflow: hidden
        .text
          no-wrap()
    .no-result-wrapper
      position: absolute
      width: 100%
      top: 50%
      transform: translateY(-50%)
</style>


