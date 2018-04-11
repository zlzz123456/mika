/**
 * 其他应付款的状态管理
 */

import { queryOverflowOrder, queryOtherDetail } from '../services/ordermanage';
import { routerRedux } from 'dva/router';

export default {
  namespace: 'otherOrder',
  state: {
    data: {
      list: [],
      pagination: {},
    },
    loading: false,
    otherorderdetail: [],
    againresult: 0,
  },
  effects: {
    *fetch({ payload }, { call, put }) {
      yield put({
        type: 'changeLoading',
        payload: true,
      });
      const response = yield call(queryOverflowOrder, payload);
      if (response.resultCode === 800) {
        yield put(routerRedux.push('/user/login'));
        window.location.reload();
        return false;
      }
      yield put({
        type: 'getListData',
        payload: response,
      });
      yield put({
        type: 'changeLoading',
        payload: false,
      });
    },
    *detailfetch({ payload }, { call, put }) {
      console.log(payload, 'payload')
      yield put({
        type: 'changeModal',
        payload: true,
      });
      const response = yield call(queryOtherDetail, payload);
      yield put({
        type: 'getOtherOrderDetail',
        payload: response.resultData,
      });
    },
  },
  reducers: {
    changeLoading(state, action) {
      return {
        ...state,
        loading: action.payload,
      };
    },
    getListData(state, action) {
      return {
        ...state,
        data: {
          list: action.payload.resultData,
        },
      };
    },
    changeModal(state, action) {
      return {
        ...state,
        modal: action.payload,
      };
    },
    getOtherOrderDetail(state, action) {
      return {
        ...state,
        otherorderdetail: action.payload,
      };
    },
  },
};
