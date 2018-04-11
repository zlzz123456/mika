/**
 * Created by Administrator on 2018/1/24 0024.
 */
import {  queryRepaymentOrder, seriesRepaymentOrder, dueRepaymentOrder, queryRepaymentOrderRepaymentplanexport} from '../services/ordermanage';

export default {
  namespace:'repaymentorder',
  state:{
    data:{
      list:[],
      pagination: {}
    },
    loading:false,
  },
  effects:{
    *fetch({ payload }, { call, put }){
      yield put({
        type:'changeLoading',
        payload:true
      })
      let result = yield call(queryRepaymentOrder, payload);
      yield put({
        type:'changeData',
        payload:result
      });
      yield put({
        type: 'changeLoading',
        payload: false
      })
    },
    *sericesFetch({payload, callback}, { call }){
      let result = yield call(seriesRepaymentOrder, payload);
      if(callback) callback(result);
    },
    *dueFetch({payload,callback},{ call }){
      let result = yield call(dueRepaymentOrder, payload);
      if(callback) callback(result);
    },
    *dueExport({payload,callback},{ call }){
      let result = yield call(queryRepaymentOrderRepaymentplanexport, payload);
      if(callback) callback(result);
    },
  },
  reducers:{
    changeLoading(state, action){
      return {
        ...state,
        loading:action.payload
      }
    },
    changeData(state, action){
      return {
        ...state,
        data:{
          list: action.payload.resultData,
          pagination: action.payload.page,
        }
      }
    }
  }
}
