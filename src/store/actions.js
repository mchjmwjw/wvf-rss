import * as types from './mutation-types'

export default {
  // 订阅
  subscribeMp({ commit }, mp){
    commit(types.SUBSCRIBE_MP, mp)
  },
  // 取消订阅
  unsubscribeMp({ commit }, weixinhao){
    commit(types.UNSUBSCRIBE_MP, weixinhao)
  },
  // 搜索列表
  addSearchResultList({ commit }, mp){
    commit(types.ADD_SEARCHRESULT_LIST, mp)
  },
  // 未订阅结果
  unsubSearchResult({ commit }, weixinhao){
    commit(types.UNSUBSCRIBE_SEARCHRESULT, weixinhao)
  },
  clearSearchResult({ commit }, info){
    commit(types.CLEAR_SEARCHRESULT, info)
  }
}