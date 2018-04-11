/**
 * 订单管理菜单目录 -- 所有接口请求
 */
import request from '../utils/request';

// 获取订单状态
export async function queryStatusNav(){  
  return request('/modules/manage/biz/orderEnum.htm')
}

//订单管理 - 借款订单
export async function queryBorrowOrder(params) {
  let { pageSize, currentPage, searchParams} = params;
  let  paramsStr = `pageSize=${pageSize}&currentPage=${currentPage}&searchParams=${encodeURIComponent(searchParams)}`;
  return request('/modules/manage/biz/orderList.htm', {
    method:'POST',
    body:paramsStr
  })
}
//借款

//订单管理 - 借款订单 - 订单详情 - 合同金额
export async function queryBorrowOrderDetail(params){
  return request(`/modules/manage/biz/order/contractInfo.htm?orderId=${params}`);
}

//订单管理 - 借款订单 - 订单的还款计划
export async function queryBorrowOrderRepaymentplan(params){
  return request(`/modules/manage/biz/order/scheduleInfo.htm?orderId=${params}`);
}
// 订单管理借款订单  导出订单
export async function queryBorrowOrderRepaymentplanexport(params){
  return request(`/modules/manage/biz/exportLoanOrder`);
}
// 订单管理放款订单  导出订单
export async function queryLoanOrderRepaymentplanexport(params){
  return request(`/modules/manage/biz/exportLoanOrderList.htm`);
}
// 订单管理还款订单  导出订单
export async function queryRepaymentOrderRepaymentplanexport(params){
  return request(`/modules/manage/repay/orderListExport.htm`);
}
//订单管理 - 放款订单
export async function queryLoanOrder(params){
  let { pageSize, currentPage, searchParams} = params;
  let paramsStr = `pageSize=${pageSize}&currentPage=${currentPage}&searchParams=${encodeURIComponent(searchParams)}`;
  return request('/modules/manage/biz/loanOrderList.htm',{
    method: 'POST',
    body: paramsStr
  })
}

//订单管理 -  放款订单 - 放款记录详情
export async function queryLoanDetail(params){
  return request(`/modules/manage/biz/order/loanDetail.htm?orderId=${params}`)
}

//订单管理 -  放款订单 - 再次放款
export async function actionLoanOrder(params){
  let  paramsStr = `orderId=${params}`;
  return request('/modules/manage/biz/order/loanAgain.htm',{
    method:'POST',
    body: paramsStr
  })
}

/**订单管理 -  放款订单 - 批量放款  - TODO: 请求报文待定**/
export async function actionLoanOrderList(params){
  return request('/modules/manage/biz/order/batchLoanAgain.htm',{
    method:'POST',
    body:params
  })
}

/** 订单管理  - 还款订单 -- 订单列表**/
export async function queryRepaymentOrder(params){
  let { pageSize, currentPage, searchParams} = params;
  let paramsStr = `pageSize=${pageSize}&currentPage=${currentPage}&searchParams=${encodeURIComponent(searchParams)}`;
  return request('/modules/manage/repay/orderList.htm',{
    method: 'POST',
    body: paramsStr
  })
}

/** 订单管理  - 还款订单 -- 订单详情 - 流水记录**/
export async function seriesRepaymentOrder(params){
  let paramsStr = `orderId=${params}`;
  return request('/modules/manage/repay/serial.htm',{
    method: 'POST',
    body: paramsStr
  })
}

/** 订单管理  - 还款订单 -- 订单详情 - 逾期记录**/
export async function dueRepaymentOrder(params){
  let paramsStr = `orderId=${params}`;
  return request('/modules/manage/repay/dueInfo.htm', {
    method: 'POST',
    body: paramsStr
  })
}

/* 订单管理 - 其他应付款 - 查询条件 */
export async function queryOverflowOrder(params) {
  let paramsStr = `orderNo=${params.orderNo}`;
  console.log(paramsStr, 'paramsStr');
  return request('http://192.168.12.85:8083/modules/manage/account/selectOnAccountList.htm', {
    method: 'POST',
    body: paramsStr
  })
}
// 订单管理 - 其他应付款 - 退账记录
export async function queryOtherDetail(params) {
  let { searchParams } = params;
  let  paramsStr = `searchParams=${encodeURIComponent(searchParams)}`;
  return request('/modules/manage/account/selectOnAccountDetail.htm', {
    method:'POST',
    body:paramsStr
  })
}
