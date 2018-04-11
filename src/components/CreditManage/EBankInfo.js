/**
 * Created by Administrator on 2018/1/3 0003. -— liuy
 * 页面 - 网银信息
 * props: 待定
 */

import React, {Component} from 'react'
import {Row, Col} from 'antd'

class NetSilverInformation extends Component {
  state = {
    onlineBankingInformation: {},
  }

  componentDidMount() {
    const {userId, dispatch, detailUrl} = this.props;
   
    dispatch({
      type: detailUrl,
      payload: userId,
      callback: (result) => {
        if (result.resultCode === 1000) {
          this.setState({
            onlineBankingInformation: result.resultData || {}
          })
        }
      }
    })
  }


  ListSerise(data, classStyle, titleStr) {      
    if (!(JSON.stringify(data) === "{}")) {
      var {activeCardNum, bankNum, pvcuCustomerGroupTag, pvcuCashoutsTag,
        creditcardLimit, creditcardBalance, creditcardCashLimit, creditcardCashBalance, singleBankMaxLimit, singleBankMinLimit
      } = data;
      var str = '-';
      switch (Number(pvcuCashoutsTag)) {
        case 0: str='近12月套现月数<3';
        break;
        case 1: str='近12月套现月数<6';
        break;
        case 2: str='近12月套现月数>=6';
        break;
      }
    } else {
      var activeCardNum, bankNum, pvcuCustomerGroupTag, pvcuCashoutsTag, creditcardLimit, creditcardBalance, creditcardCashLimit, creditcardCashBalance, singleBankMaxLimit, singleBankMinLimit
    }
    return <div className={classStyle.listSerise}>
      <Row>
        <Col span={24}>{titleStr}</Col>
      </Row>
      <Row>
        <Col span={6}>活跃银行卡数:</Col>
        <Col span={6}>{activeCardNum || '-'}</Col>
        <Col span={6}>活跃银行数:</Col>
        <Col span={6}>{bankNum || '-'}</Col>
      </Row>
      <Row>
        <Col span={6}>总额度:</Col>
        <Col span={6}>{creditcardLimit || '-'}</Col>
        <Col span={6}>总可用额度:</Col>
        <Col span={6} style={{marginLeft:'-16px' ,whiteSpace:'nowrap' }} >{creditcardBalance || <div >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;-</div>}</Col>
      </Row>
      <Row>
        <Col span={6}>提现额度:</Col>
        <Col span={6}>{creditcardCashLimit || '-'}</Col>
        <Col span={6}>可用提现额度:</Col>
        <Col span={6} style={{marginLeft:'-16px' ,whiteSpace:'nowrap'}} >{creditcardCashBalance || <div >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;-</div>}</Col>
      </Row>
      <Row>
        <Col span={6}>单一银行最高授信额度:</Col>
        <Col span={6}>{singleBankMaxLimit || '-'}</Col>
        <Col span={6}>单一银行最低授信额度:</Col> 
        <Col span={6}>{singleBankMinLimit || '-'}</Col>
      </Row>
      <Row>
        <Col span={6}>客户族群标志:</Col>
        <Col span={6}>{pvcuCustomerGroupTag || '-'}</Col>
        <Col span={6}>客户套现标志(0,1,2):</Col>

      </Row>
    </div>
  }

  ListFourSerise(data, classStyle, titleStr) {
    if (!(JSON.stringify(data) === "{}")) {
      var {
          beyondQuotaMonthNum3m, beyondQuotaMonthNum6m, beyondQuotaMonthNum12m,  delayedPeriodsNum3, delayedPeriodsNum6, delayedPeriodsNum12 , delayedBankNum3 , delayedBankNum6 ,
          delayedBankNum12 ,highestDelayed3 ,highestDelayed6 ,highestDelayed12 ,delayedCardNum3 ,delayedCardNum6 ,delayedCardNum12 ,caseDelayedPeriodEqualsOneMonNum3 ,caseDelayedPeriodEqualsOneMonNum6 ,
          caseDelayedPeriodEqualsOneMonNum12 , haveBillMonthNumNearly3 , haveBillMonthNumNearly6 , haveBillMonthNumNearly12 ,
          avgConsumeAmount3, avgConsumeAmount6, avgConsumeAmount12, withdrawNumCc3 ,withdrawNumCc6, withdrawNumCc12 ,withdrawAmount3 ,withdrawAmount6 ,withdrawAmount12 ,
          hasWithdrawalPercentage3m, hasWithdrawalPercentage6m ,hasWithdrawalPercentage12m ,avgCashAmount3, avgCashAmount6, avgCashAmount12,   
          repayRatioAvg3, repayRatioAvg6, repayRatioAvg12, avgQuota3, avgQuota6, avgQuota12, maxQuota3, maxQuota6, maxQuota12, 
          averageUseageRateOfQuotaNearly3m, averageUseageRateOfQuotaNearly6m, averageUseageRateOfQuotaNearly12m
      } = data;
    } else {
      var  beyondQuotaMonthNum3m, beyondQuotaMonthNum6m, beyondQuotaMonthNum12m,  delayedPeriodsNum3, delayedPeriodsNum6, delayedPeriodsNum12 , delayedBankNum3 , delayedBankNum6 ,
      delayedBankNum12 ,highestDelayed3 ,highestDelayed6 ,highestDelayed12 ,delayedCardNum3 ,delayedCardNum6 ,delayedCardNum12 ,caseDelayedPeriodEqualsOneMonNum3 ,caseDelayedPeriodEqualsOneMonNum6 ,
      caseDelayedPeriodEqualsOneMonNum12 , haveBillMonthNumNearly3 , haveBillMonthNumNearly6 , haveBillMonthNumNearly12 ,
      avgConsumeAmount3, avgConsumeAmount6, avgConsumeAmount12, withdrawNumCc3 ,withdrawNumCc6, withdrawNumCc12 ,withdrawAmount3 ,withdrawAmount6 ,withdrawAmount12 ,
          hasWithdrawalPercentage3m, hasWithdrawalPercentage6m ,hasWithdrawalPercentage12m ,avgCashAmount3, avgCashAmount6, avgCashAmount12,  
          repayRatioAvg3, repayRatioAvg6, repayRatioAvg12, avgQuota3, avgQuota6, avgQuota12, maxQuota3, maxQuota6, maxQuota12, 
          averageUseageRateOfQuotaNearly3m, averageUseageRateOfQuotaNearly6m, averageUseageRateOfQuotaNearly12m
    }
    return <div className={classStyle.listSerise}>
      <Row>
        <Col span={24}>{titleStr}</Col>
      </Row>
    
      <Row>
        <Col span={6}>类型</Col>
        <Col span={6}>近3月</Col>
        <Col span={6}>近6月</Col>
        <Col span={6}> 近12月</Col>
      </Row>
      <Row>
        <Col span={6}>月均消费金额: </Col>
        <Col span={6}>{avgConsumeAmount3 || '-'}</Col>
        <Col span={6}>{avgConsumeAmount6 || '-'}</Col>
        <Col span={6}>{avgConsumeAmount12 || '-'}</Col>
      </Row>
      <Row>
        <Col span={6}>提现次数 :</Col>
        <Col span={6}>{withdrawNumCc3 || '-'}</Col>
        <Col span={6}>{withdrawNumCc6 || '-'}</Col>
        <Col span={6}>{withdrawNumCc12 || '-'}</Col>
      </Row>
      <Row>
        <Col span={6}>提现金额: </Col>
        <Col span={6}>{withdrawAmount3 || '-'}</Col>
        <Col span={6}>{withdrawAmount6 || '-'}</Col>
        <Col span={6}>{withdrawAmount12 || '-'}</Col>
      </Row>
      <Row>
        <Col span={6}>有提现月数占比: </Col>
        <Col span={6}>{hasWithdrawalPercentage3m || '-'}</Col>
        <Col span={6}>{hasWithdrawalPercentage6m || '-'}</Col>
        <Col span={6}>{hasWithdrawalPercentage12m || '-'}</Col>
      </Row>
  
      <Row>
        <Col span={6}>月均提现金额:</Col>
        <Col span={6}>{avgCashAmount3 || '-'}</Col>
        <Col span={6}>{avgCashAmount6 || '-'}</Col>
        <Col span={6}>{avgCashAmount12 || '-'}</Col>
      </Row>
      <Row>
        <Col span={6}>平均还款率: </Col>
        <Col span={6}>{repayRatioAvg3 || '-'}</Col>
        <Col span={6}>{repayRatioAvg6 || '-'}</Col>
        <Col span={6}>{repayRatioAvg12 || '-'}</Col>
      </Row>
      <Row>
        <Col span={6}> 平均额度: </Col>
        <Col span={6}>{avgQuota3 || '-'}</Col>
        <Col span={6}>{avgQuota6 || '-'}</Col>
        <Col span={6}>{avgQuota12 || '-'}</Col>
      </Row>
      <Row>
        <Col span={6}>最高额度: </Col>
        <Col span={6}>{maxQuota3 || '-'}</Col>
        <Col span={6}>{maxQuota6 || '-'}</Col>
        <Col span={6}>{maxQuota12 || '-'}</Col>
      </Row>
      <Row>
        <Col span={6}>平均额度使用率: </Col>
        <Col span={6}>{averageUseageRateOfQuotaNearly3m || '-'}</Col>
        <Col span={6}>{averageUseageRateOfQuotaNearly6m || '-'}</Col>
        <Col span={6}>{averageUseageRateOfQuotaNearly12m || '-'}</Col>
      </Row>
      <Row>
        <Col span={6}> 超额的月份: </Col>
        <Col span={6}>{beyondQuotaMonthNum3m || '-'}</Col>
        <Col span={6}>{beyondQuotaMonthNum6m || '-'}</Col>
        <Col span={6}>{beyondQuotaMonthNum12m || '-'}</Col>
      </Row>
      <Row>
        <Col span={6}> 延滞期数: </Col>
        <Col span={6}>{delayedPeriodsNum3 || '-'}</Col>
        <Col span={6}>{delayedPeriodsNum6 || '-'}</Col>
        <Col span={6}>{delayedPeriodsNum12 || '-'}</Col>
      </Row>
      <Row>
        <Col span={6}>延滞金银行机构数: </Col>
        <Col span={6}>{delayedBankNum3 || '-'}</Col>
        <Col span={6}>{delayedBankNum6 || '-'}</Col>
        <Col span={6}>{delayedBankNum12 || '-'}</Col>
      </Row>
      <Row>
        <Col span={6}>延滞金片卡数: </Col>
        <Col span={6}>{delayedCardNum3 || '-'}</Col>
        <Col span={6}>{delayedCardNum6 || '-'}</Col>
        <Col span={6}>{delayedCardNum12 || '-'}</Col>
      </Row>
      <Row>
        <Col span={6}>最高延滞状态(0,1,2,3): </Col>
        <Col span={6}>{highestDelayed3 || '-'}</Col>
        <Col span={6}>{highestDelayed6 || '-'}</Col>
        <Col span={6}>{highestDelayed12 || '-'}</Col>
      </Row>
      <Row>
        <Col span={6}>有账单的月份数: </Col>
        <Col span={6}>{haveBillMonthNumNearly3 || '-'}</Col>
        <Col span={6}>{haveBillMonthNumNearly6 || '-'}</Col>
        <Col span={6}>{haveBillMonthNumNearly12 || '-'}</Col>
      </Row>
      <Row>
        <Col span={6}>逾期期数为1的月份数(0,1,2,3): </Col>
        <Col span={6}>{caseDelayedPeriodEqualsOneMonNum3 || '-'}</Col>
        <Col span={6}>{caseDelayedPeriodEqualsOneMonNum6 || '-'}</Col>
        <Col span={6}>{caseDelayedPeriodEqualsOneMonNum12 || '-'}</Col>
      </Row>
    </div>
  }
  ListOneSerise(data, classStyle, titleStr) {
    if (!(JSON.stringify(data) === "{}")) {
      var {
          repayAmount1, repayNum1, repayRatio1, delayTag1, delayStatus1, overdueAmount1, overduePay1, incomeAmt1,
          totalLastBalance1, lastUnrepayAmount, totalMinPayment1, totalNewBalance1, curConsumeAvgAmount, curCashAmount,
          curCashNum, curCashAvgAmount, totalConsumeAmount1, totalConsumeNum1
      } = data;
      var str = '-';
      switch (Number(delayTag1)) {
        case 0: str='银行逾期账单数为0';
        break;
        case 1: str='银行逾期账单数为1';
        break;
        case 2: str='银行逾期账单数>1';
        break;
      }
      var str1 = '-';
      switch (Number(delayStatus1)) {
        case 0: str1 = '上期应还总额为0';
        break;
        case 1: str1 = '上期应还总额<=当期还款总额';
        break;
        case 2: str1 = '上期应还总额>当期还款总额&&当期还款总额>=上期最低还款金额';
        break;
        case 3: str1 = '当期还款总额<上期最低还款金额';
        break;
      }
    } else {
      var repayAmount1, repayNum1, repayRatio1, delayTag1, str1, overdueAmount1, overduePay1, incomeAmt1,
      totalLastBalance1, lastUnrepayAmount, totalMinPayment1, totalNewBalance1, curConsumeAvgAmount, curCashAmount,
      curCashNum, curCashAvgAmount, totalConsumeAmount1, totalConsumeNum1

    }
    return <div className={classStyle.listSerise}>
      <Row>
        <Col span={24}>{titleStr}</Col>
      </Row>
    
      <Row>
        <Col span={6}>上期应还总额</Col>
        <Col span={6}> {totalLastBalance1}</Col>
        <Col span={6}>上期未还总额</Col>
        <Col span={6}> { lastUnrepayAmount}</Col>
      </Row>
      <Row>
        <Col span={6}>当期总透支余额 </Col>
        <Col span={6}>{totalNewBalance1 || '-'}</Col>
        <Col span={6}>当期最低还款总额</Col>
        <Col span={6}>{totalMinPayment1 || '-'}</Col>
      </Row>
      <Row>
        <Col span={6}>当期新发生消费总金额:</Col>
        <Col span={6}>{totalConsumeAmount1 || '-'}</Col>
        <Col span={6}>当期新发生消费总笔数</Col>
        <Col span={6}>{totalConsumeNum1 || '-'}</Col>
      </Row>
      <Row>
        <Col span={6}>当期新发生消费平均金额 </Col>
        <Col span={6}>{curConsumeAvgAmount || '-'}</Col>
        <Col span={6}>当期新发生提现总金额</Col>
        <Col span={6}>{curCashAmount || '-'}</Col>
      </Row>
      <Row>
        <Col span={6}>当期新发生提现总笔数 </Col>
        <Col span={6}>{curCashNum || '-'}</Col>
        <Col span={6}>当期新发生提现平均金额</Col>
        <Col span={6}>{curCashAvgAmount || '-'}</Col>
      </Row>
  
      <Row>
        <Col span={6}>还款金额</Col>
        <Col span={6}>{repayAmount1 || '-'}</Col>
        <Col span={6}>还款笔数</Col>
        <Col span={6}>{repayNum1 || '-'}</Col>
      </Row>
      <Row>
        <Col span={6}>还款率</Col>
        <Col span={6}>{repayRatio1 || '-'}</Col>
        <Col span={6}>逾期标志(0,1,2)</Col>

        <Col span={6}>{delayTag1 || '-'}</Col>
      </Row>
      <Row>
        <Col span={6}> 逾期状态(0,1,2,3) </Col>
        <Col span={6}>{delayStatus1 || '-'}</Col>

        <Col span={6}>延滞金</Col>
        <Col span={6}>{overdueAmount1 || '-'}</Col>
      </Row>
      <Row>
        <Col span={6}>超额金 </Col>
        <Col span={6}>{overduePay1 || '-'}</Col>
        <Col span={6}>收入</Col>
        <Col span={6}>{incomeAmt1 || '-'}</Col>
      </Row> 
    </div>
  }


  render() {
    const {classStyle, userId, listUrl, dispatch} = this.props;
    const {onlineBankingInformation} = this.state;        

    return (<div>
      <div className={classStyle.listDiv}>
        {
          this.ListSerise(onlineBankingInformation, classStyle, '基本信息')
        }
      </div>
      <div className={classStyle.listDiv}>
        {
          this.ListOneSerise(onlineBankingInformation, classStyle, '近1月信息')
        }
      </div>
      <div className={classStyle.listDiv}>
        {
          this.ListFourSerise(onlineBankingInformation, classStyle, '近12月使用信息')
        }
      </div>
    </div>)
  }
};


export default NetSilverInformation;
