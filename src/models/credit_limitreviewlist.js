/**
 * Created by Administrator on 2017/12/13 0013.
 */
import { queryCreditLimitStatus, queryCreditLimitList,
  queryCreditTaoBaoInfo, queryCreditTaoBaoList, queryCreditPhone,
  queryCreditCardInfo, queryCreditCardList, queryCreditRules, queryHumanInfo, queryUnionpayInfo, internetBankingInformation } from '../services/creditmanage';
import { routerRedux } from 'dva/router';

export default {
  namespace: 'creditlimitlist',
  state: {
    data: {
      list: [],
      pagination: {},
    },
    creditlimitstatus: [],
    loading: false,
  },
  effects: {
    *fetch({ payload, callback }, { call, put }) {
      yield put({
        type: 'changeLoading',
        payload: true,
      });
      const result = yield call(queryCreditLimitList, payload);
      if (result.resultCode === 800) {
        yield put(routerRedux.push('/user/login'));
        window.location.reload();
        return false;
      }
      yield put({
        type: 'getLimitListData',
        payload: result,
      });
      yield put({
        type: 'changeLoading',
        payload: false,
      });
      if (callback) callback(result);
    },
    *creditlimitstatusfetch({ _ }, { call, put }) {
      // 额度审核状态
      const result = yield call(queryCreditLimitStatus, 1);
      console.log(result, 'result');
      yield put({
        type: 'getLimitStatusData',
        payload: result.resultData,
      });
    },
    *userLimitDetailfetch({ payload, callback }, { call }) {
      const result = yield call(queryUserLimitDetail, payload); // 单个用户的额度查询明细
      if (callback) callback(result);
    },
    *taobaoInfofetch({ payload, callback }, { call }) {
      const result = yield call(queryCreditTaoBaoInfo, payload);
      if (callback) callback(result);
    },
    *taobaolistfetch({ payload, callback }, { call }) {
      const result = yield call(queryCreditTaoBaoList, payload);
      if (callback) callback(result);
    },
    *mobileInfofetch({ payload, callback }, { call }) {
      const result = yield call(queryCreditPhone, payload);
      if (callback) callback(result);
    },
    *ruleInfofetch({ payload, callback }, { call }) {
      const result = yield call(queryCreditRules, payload);
      if (callback) callback(result);
    },
    *cardInfofetch({ payload, callback }, { call }) {
      const result = yield call(queryCreditCardInfo, payload);
      if (callback) callback(result);
    },
    *cardlistfetch({ payload, callback }, { call }) {
      const result = yield call(queryCreditCardList, payload);
      if (callback) callback(result);
    },
    *humanInfofetch({ payload, callback }, { call }) { // 人行征信
      const result = yield call(queryHumanInfo, payload);
      if (callback) callback(result);
    },
    *UnionpayInfofetch({ payload, callback }, { call }) { // 银联信息
      const result = yield call(queryUnionpayInfo, payload);
      if (callback) callback(result);
    },
    *networkInformation({payload, callback},{ call }){                             //网银信息
      let result = yield call(internetBankingInformation,payload);
      if(callback) callback(result);
    }
  },
  reducers: {
    changeLoading(state, action) {
      return {
        ...state,
        loading: action.payload,
      };
    },
    getLimitListData(state, action) {
      return {
        ...state,
        data: {
          list: action.payload.resultData,
          pagination: action.payload.page,
        },
      };
    },
    getLimitStatusData(state, action) {
      return {
        ...state,
        creditlimitstatus: action.payload,
      };
    },
  },
};
