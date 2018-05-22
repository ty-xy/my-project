import jsonp from 'common/js/jsonp'
import {commonParams, options} from './config'

export function getSingerList () {
  const url = 'https:///c.y.qq.com/v8/fcg-bin/v8.fcg'

  const data = Object.assign({}, commonParams, {
    channel: 'singer',
    page: 'list',
    key: 'all_all_all',
    pagesize: 100,
    pagenum: 1,
    hostUin: 0,
    needNewCode: 0,
    platform: 'yqq',
    g_tk: 1664029744
  })
  return jsonp(url, data, options)
}

export function getSingerDetail (singerId) {
  const url = 'https://c.y.qq.com/v8/fcg-bin/fcg_v8_singer_track_cp.fcg'

  const data = Object.assign({}, commonParams, {
    hostUin: 0,
    needNewCode: 0,
    platform: 'yqq',
    order: 'listen',
    loginUin: 0,
    begin: 0,
    num: 100,
    songstatus: 1,
    singermid: singerId,
    g_tk: 5381
  })
  return jsonp(url, data, options)
}

export function getVkey (singerId) {
  const url = 'http://c.y.qq.com/base/fcgi-bin/fcg_musicexpress.fcg'
  const data = Object.assign({}, commonParams, {
    json: 3,
    guid: 8969145368,
    g_tk: 938407465,
    loginUin: 0,
    hostUin: 0,
    notice: 0,
    platform: 'yqq',
    needNewCode: 0
  })
  return jsonp(url, data, options)
}
