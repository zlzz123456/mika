/**
 * Created by Administrator on 2018/1/25 0025.
 */
import {queryConfirmlist, queryConfirmOrderDetail, queryConfirmStatusStr, actionConfirmorderStatus} from '../services/audit';
import { routerRedux } from 'dva/router';
export default {
  namespace:'auditconfirm',
  state:{
    data:{
      list:[],
      pagination:{}
    },
    loading:false,
    confirmStatusList:[],
    repayWayList:[],
    applyTypeList:[],
  },
  effects:{
    *fetch({ payload } ,{ call, put}){
      yield put({
        type:'changeLoading',
        payload: true
      });
      let result = yield call(queryConfirmlist,payload);
      if(result.resultCode === 1000){
        yield put({
          type:'getDatalist',
          payload: result
        })
        yield put({
          type:'changeLoading',
          payload:false,
        })
      }
      // else{
      //   yield put(routerRedux.push('/user/login'));
      //   window.location.reload();
      //   return false
      // }
    },
    *searchlistfetch({},{call, put}){
      let result = yield call(queryConfirmStatusStr);
      yield put({
        type:'changeConfirmStatus',
        payload:result.resultData.status
      });
      yield put({
        type:'changeRepayWayList',
        payload:result.resultData.repayWay
      });
      yield put({
        type:'changeApplyTypeLis',
        payload:result.resultData.applyType
      })
    },
    *orderDetail({payload, callback},{call}){
      let result = yield call(queryConfirmOrderDetail, payload);
      if(callback) callback(result)
    },
    *actionOrderstatus({payload, callback}, { call}){
      let result = yield call(actionConfirmorderStatus,payload);
      if(callback) callback(result);
    }
  },
  reducers:{
    changeLoading(state,action){
      return {
        ...state,
        loading:action.payload
      }
    },
    changeConfirmStatus(state,action){
      return {
        ...state,
        confirmStatusList:action.payload
      }
    },
    changeRepayWayList(state,action){
      return {
        ...state,
        repayWayList:action.payload
      }
    },
    changeApplyTypeLis(state,action){
      return {
        ...state,
        applyTypeList:action.payload
      }
    },
    getDatalist(state, action){
      return {
        ...state,
        data:{
          list: action.payload.resultData,
          pagination:action.payload.page
        }
      }
    }

  }
}
