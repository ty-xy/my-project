<template>
   <transition>
       <music-list :title="title" :bg-image = "bgImage" :songs="songs"></music-list>
   </transition>
</template>
<script type="text/ecmascript-6">
import MusicList from 'components/music-list/music-list'
import {mapGetters} from 'vuex'
import {getMusicList} from 'api/rank'
import {ERR_OK} from 'api/config'
import {createSong} from 'common/js/song'

export default {
    created(){
        this._getTopList()
    },
    data(){
        return {
            songs:[]
        }
    },
    methods:{
        _getTopList(){
            if(!this.topList.id){
                this.$router.push("/rank")
                return
            }
            getMusicList(this.topList.id).then((res)=>{
                if(res.code === ERR_OK){
                   this.songs = this._normalizeSongs(res.songlist)
                }
            })
        },
        _normalizeSongs(list) {
           let ret = []
           list.forEach((item)=>{
               const musicData = item.data
               if(musicData.songid&& musicData.albumid){
                    ret.push(createSong(musicData))
               }
           })
           return ret 
        }
    },
   computed:{
      title(){
            return this.topList.topTitle
        }, 
      bgImage(){
            return this.topList.picUrl
       }, 
        ...mapGetters([
          'topList'
      ])
   },
   components:{
       MusicList
   }
}
</script>
<style lang="stylus" scoped rel="stylesheet/stylus">
   .slide-enter-active, .slide-leave-active
      transition:all 0.3s ease 
    .slide-enter, .slide-leave-to 
      tranform: translated(100%,0,0)
</style>

