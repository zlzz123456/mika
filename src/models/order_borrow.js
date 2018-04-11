/**
 * model  借款订单状态管理
 */
import { queryStatusNav, queryBorrowOrder, queryBorrowOrderDetail, queryBorrowOrderRepaymentplan,queryBorrowOrderRepaymentplanexport} from '../services/ordermanage';
import { routerRedux } from 'dva/router';

export default {
    namespace:'borroworder',
    state:{
      statusnav:[],
      data:{
        list:[],
        pagination:{}
      },
      loading:false,
      modal:false,
      modalrecord:{},
      modallist:[],
    },
    effects:{
      *navfetch({ payload },{call, put}){
        let navlist = yield call(queryStatusNav);
        yield  put({
          type:'setStatusNav',
          payload: navlist
        })
      },
      *fetch({payload},{call, put}){
          yield put({
            type: 'changeLoading',
            payload: true,
          });
          const result = yield call(queryBorrowOrder,payload);
          if(result.resultCode === 800){
            yield put(routerRedux.push('/user/login'));
            window.location.reload();
            return false
          }
          yield put({
             type: 'setListdata',
              payload: result
          });
          yield  put({
            type:'changeLoading',
            payload: false
          })
      },
      *modalrecordfetch({payload},{call,put}){
          yield put({
            type:'changeModal',
            payload:true,
          })
         const resultmodalrecord = yield  call(queryBorrowOrderDetail,payload);
          yield  put({
             type: 'setModalRecord',
             payload: resultmodalrecord.resultData
          })
      },
      *modallistfetch({payload,callback},{call,put}){
         const resultmodallist = yield  call(queryBorrowOrderRepaymentplan,payload);
         yield  put({
           type: 'setModalList',
           payload: resultmodallist
         })
        if(callback) callback(resultmodallist);
      },
      *modallistExport({payload,callback},{call,put}){
        const resultmodallist = yield  call(queryBorrowOrderRepaymentplanexport,payload);
        yield  put({
          type: 'setModalList',
          payload: resultmodallist
        })
       if(callback) callback(resultmodallist);
     }
     },

     
     reducers:{
       setStatusNav(state,action){
         return {
           ...state,
           statusnav:action.payload.resultData
         }
       },
        changeLoading(state, action){
           return {
             ...state,
             loading:action.payload
           }
        },
       setListdata(state, action){
          return {
            ...state,
            data:{
              list:action.payload.resultData,
              pagination:action.payload.page
            }
          }
       },
       changeModal(state,action) {
          return {
            ...state,
            modal:action.payload
          }
       },
       setModalRecord(state, action){
         return {
           ...state,
           modalrecord:action.payload
         }
       },
       setModalList(state, action){
         return {
           ...state,
           modallist:action.payload.resultData
         }
       },
     }
}
