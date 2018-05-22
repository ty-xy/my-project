<template>
   <transition name="slide">
        <music-list :songs="songs" :title="title" :bg-image="bgImage"></music-list>
   </transition>
</template>
<script type="text/ecmascript-6">
  import {mapGetters} from 'vuex'
  import MusicList from 'components/music-list/music-list'
  import {getSingerDetail,getVkey} from 'api/singer'
  import {ERR_OK} from 'api/config'
  import {createSong} from 'common/js/song'
  export default  {
      data(){
          return {
              songs:[]
          }
      },
      computed: {
          title(){
             return this.singer.name
          },
          bgImage(){
             return this.singer.avatar
          },
          ...mapGetters([
            'singer'
          ])
      },
      created(){
        this._getDetail()
      },
      methods:{
       async _getDetail (){
             if(!this.singer.id){
                 this.$router.push('/singer')
                 return 
             }
            let lists =  await getSingerDetail(this.singer.id)
           if(lists){
                 this.songs =  this._normalizeSongs(lists.data.list)
           }
        }, 
          _normalizeSongs(list){
            let ret =  []
           list.forEach((item)=>{
                    let {musicData} = item
                    if(musicData.songid && musicData.albummid){
                         ret.push(createSong(musicData))
                    }
                 })
              return  ret 
        }
      },
      components:{
        MusicList
      }
  }
</script>
<style lang="stylus" scoped rel="stylesheet/stylus">
 @import "~common/stylus/variable"
// .singer-detail
//     position:fixed 
//     z-index : 100
//     top:0 
//     left:0 
//     right:0 
//     bottom :0 
//     background : $color-background
.slide-enter-active, .slide-leave-active
    transition:all 0.3s 
.silde-enter, .slide-leave-to
    transform:translate3d(100%,0,0)

</style>