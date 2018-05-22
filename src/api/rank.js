import jsonp from 'common/js/jsonp'
import {commonParams, options} from './config'
export function getTopList () {
  const url = 'https://c.y.qq.com/v8/fcg-bin/fcg_myqq_toplist.fcg'
  const data = Object.assign({}, commonParams, {
    g_tk: 5381,
    uin: 0,
    notice: 0,
    platform: 'h5',
    needNewCode: 1

  })

  return jsonp(url, data, options)
}
export function getMusicList (topid) {
  const url = 'https://c.y.qq.com/v8/fcg-bin/fcg_v8_toplist_cp.fcg'
  const data = Object.assign({}, commonParams, {
    g_tk: 5381,
    notice: 0,
    page: 'detail',
    tpl: 3,
    platform: 'h5',
    needNewCode: 1,
    topid,
    uin: 0,
    type: 'top'

  })

  return jsonp(url, data, options)
}
