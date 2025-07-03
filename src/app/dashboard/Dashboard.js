import React, { Component, useEffect, useState } from 'react';
// import { Doughnut } from 'react-chartjs-2';
import CountUp from 'react-countup';
import axios from 'axios';
// import Atropos from 'atropos';
// import 'atropos/css'
import "./Dashboard.css";
import { Link, useHistory } from 'react-router-dom';
import Conflictgame from './Conflictgame';

const $ = require("jquery")
$.Datatable = require("datatables.net");


const Dashboard = () => {

  const beckendLocalApiUrl = process.env.REACT_APP_BACKEND_LOCAL_API;
  const beckendLiveApiUrl = process.env.REACT_APP_BACKEND_LIVE_API;
  const nodeMode = process.env.NODE_ENV;
  if (nodeMode === "development") {
    var baseUrl = beckendLocalApiUrl;
  } else {
    baseUrl = beckendLiveApiUrl;
  }


  const history = useHistory()

  const [Admin, setAdmin] = useState()
  const [today, setToday] = useState(false)
  const admin = () => {
    const access_token = localStorage.getItem("token")
    const headers = {
      Authorization: `Bearer ${access_token}`
    }
    axios.get(baseUrl+`total/admin`, { headers })
      .then((res) => {
        setAdmin(res.data)
      })
  }


  const [User, setUser] = useState()
  const user123 = () => {
    const access_token = localStorage.getItem("token")
    const headers = {
      Authorization: `Bearer ${access_token}`
    }
    axios.get(baseUrl+`total/user`, { headers })
      .then((res) => {
        setUser(res.data)
      })
  }

  const [ACTIVE, setACTIVE] = useState()
  const actives = () => {
    const access_token = localStorage.getItem("token")
    const headers = {
      Authorization: `Bearer ${access_token}`
    }
    axios.get(baseUrl+`total/active`, { headers })
      .then((res) => {
        setACTIVE(res.data)
      }).catch((e) => {
        if (e.response.status === 401) {

          localStorage.removeItem("token")
          history.push("/adminlogin")
          //place your reentry code
        }
      })
  }
  const [BLOCKED, setBLOCKED] = useState()
  useEffect(() => {
    const access_token = localStorage.getItem("token")
    const headers = {
      Authorization: `Bearer ${access_token}`
    }
    axios.get(baseUrl+`total/block`, { headers })
      .then((res) => {
        setBLOCKED(res.data)
      })
  }, [])



  // CHALLANGE OVERVIEW

  const [COMPLETED, setCOMPLETED] = useState()
  const comp = () => {
    const access_token = localStorage.getItem("token")
    const headers = {
      Authorization: `Bearer ${access_token}`
    }
    axios.get(baseUrl+`challange/completed`, { headers })
      .then((res) => {
        setCOMPLETED(res.data)
      })
  }

  const [ACTIVE1, setACTIVE1] = useState()
  const active = () => {
    const access_token = localStorage.getItem("token")
    const headers = {
      Authorization: `Bearer ${access_token}`
    }
    axios.get(baseUrl+`challange/active`, { headers })
      .then((res) => {
        setACTIVE1(res.data)
      })
  }

  const [ONGOING, setONGOING] = useState()
  const ongoings = () => {
    const access_token = localStorage.getItem("token")
    const headers = {
      Authorization: `Bearer ${access_token}`
    }
    axios.get(baseUrl+`challange/running`, { headers })
      .then((res) => {
        setONGOING(res.data)
      })
  }

  const [CANCELLED, setCANCELLED] = useState()
  const cancelled = () => {
    const access_token = localStorage.getItem("token")
    const headers = {
      Authorization: `Bearer ${access_token}`
    }
    axios.get(baseUrl+`challange/cancelled`, { headers })
      .then((res) => {
        setCANCELLED(res.data)
      })
  }

  // deposite api start


  const [totalDeposit, setTotalDeposit] = useState(0)
  const totalDepositfunc = () => {
    const access_token = localStorage.getItem("token")
    const headers = {
      Authorization: `Bearer ${access_token}`
    }
    axios.get(baseUrl+`total/deposit`, { headers })
      .then((res) => {
        setTotalDeposit(res.data)
      })
  }
  const [totalPending, setTotalPending] = useState(0)
  const totalPendingfunc = () => {
    const access_token = localStorage.getItem("token")
    const headers = {
      Authorization: `Bearer ${access_token}`
    }
    axios.get(baseUrl+`count/new/deposit`, { headers })
      .then((res) => {
        setTotalPending(res.data)
      })
  }
  const [totalRejected, setTotalRejected] = useState(0)
  const totalRejectedfunc = () => {
    const access_token = localStorage.getItem("token")
    const headers = {
      Authorization: `Bearer ${access_token}`
    }
    axios.get(baseUrl+`count/rejected/deposit`, { headers })
      .then((res) => {
        setTotalRejected(res.data)
      })
  }


  // deposite api end

  // withdrawl api start


  const [totalWithdrawl, setTotalWithdrawl] = useState(0)
  const totalWithdrawlfunc = () => {
    const access_token = localStorage.getItem("token")
    const headers = {
      Authorization: `Bearer ${access_token}`
    }
    axios.get(baseUrl+`total/withdraw`, { headers })
      .then((res) => {
        setTotalWithdrawl(res.data)
      })
  }
  const [totalPendingWithdrawl, setTotalPendingWithdrawl] = useState(0)
  const totalPendingWithdrawlfunc = () => {
    const access_token = localStorage.getItem("token")
    const headers = {
      Authorization: `Bearer ${access_token}`
    }
    axios.get(baseUrl+`count/new/withdrawl`, { headers })
      .then((res) => {
        setTotalPendingWithdrawl(res.data)
      })
  }
  const [totalRejectedWithdrawl, setTotalRejectedWithdrawl] = useState(0)
  const totalRejectedWithdrawlfunc = () => {
    const access_token = localStorage.getItem("token")
    const headers = {
      Authorization: `Bearer ${access_token}`
    }
    axios.get(baseUrl+`count/rejected/withdrawl`, { headers })
      .then((res) => {
        setTotalRejectedWithdrawl(res.data)
      })
  }


  // witdrawl api end

  const [Some, setSome] = useState()
  const Some1 = () => {
    const access_token = localStorage.getItem("token")
    const headers = {
      Authorization: `Bearer ${access_token}`
    }
    axios.get(baseUrl+`challange/some`, { headers })
      .then((res) => {
        setSome(res.data)
        $('table').dataTable();
      })
  }
  const [todayData, setTodayData] = useState();
  const todayApi= ()=>{
    const access_token = localStorage.getItem("token")
    const headers = {
      Authorization: `Bearer ${access_token}`
    }
    axios.get(baseUrl+`all/user/data/get`, { headers })
      .then((res) => {
        setTodayData(res.data);
        //console.log(res.data);   
      })
      .catch((error)=>{
        console.log(error);
      })
  }

  useEffect(() => {
    comp()
    actives()
    user123()
    admin()
    active()
    ongoings()
    cancelled()
    totalDepositfunc();
    totalPendingfunc();
    totalWithdrawlfunc();
    totalPendingWithdrawlfunc();
    totalRejectedWithdrawlfunc();
    todayApi();
    // Some1()
  }, [])





  // CHALLANGE OVERVIEW

  return (
    <div className="">
      <Conflictgame />
      {/* <Deposits />
       <Conflictgame/> */}
       <div className="custom-control custom-switch float-right" >
        <input type="checkbox" className="custom-control-input" id="customSwitch1" onClick={()=>setToday(value => !value)} />
        <label className="custom-control-label" htmlFor="customSwitch1">{today==false?'OVERVIEW':'TODAY'}</label>
      </div>
      {!today&&<div>
        <h3 className='mt-3'>
          ALL USER OVERVIEW
        </h3>
        <div className="row mt-5">
          <div className="col-xl-3 col-sm-6 grid-margin stretch-card my-atropos" style={{ height: '11rem' }}>
            <div className="card">
              <div className="card-body text-light" style={{backgroundColor:"rgba(0, 27, 11, 0.734)"}}>
                <h4 className="text-muted font-weight-normal">TOTAL ADMIN</h4>
                <div className="d-flex align-items-center align-self-start">
                  <h3 className="pt-4 display-3">
                    <CountUp start={0} delay={0.1} duration={0.2} end={Admin && Admin}>
                      {({ countUpRef }) => <span ref={countUpRef} />}
                    </CountUp>
                  </h3>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-3 col-sm-6 grid-margin stretch-card">
            <div className="card">
              <div className="card-body text-light" style={{backgroundColor:"rgba(0, 27, 11, 0.734)"}}>
                <h4 className="text-muted font-weight-normal">TOTAL USER</h4>
                <div className="d-flex align-items-center align-self-start">
                  <h3 className="pt-4 display-3">
                    <CountUp start={0} delay={0.1} duration={0.2} end={User && User}>
                      {({ countUpRef }) => <span ref={countUpRef} />}
                    </CountUp>
                  </h3>

                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-3 col-sm-6 grid-margin stretch-card">
            <div className="card">
              <div className="card-body text-light" style={{backgroundColor:"rgba(0, 27, 11, 0.734)"}}>
                <h4 className="text-muted font-weight-normal">ACTIVE USER</h4>
                <div className="d-flex align-items-center align-self-start">
                  <h3 className="pt-4 display-3">
                    <CountUp start={0} delay={0.1} duration={0.2} end={ACTIVE && ACTIVE}>
                      {({ countUpRef }) => <span ref={countUpRef} />}
                    </CountUp>
                  </h3>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-3 col-sm-6 grid-margin stretch-card">
            <div className="card">
              <div className="card-body text-light" style={{backgroundColor:"rgba(0, 27, 11, 0.734)"}}>
                <h4 className="text-muted font-weight-normal">BLOCKED USER</h4>
                <div className="d-flex align-items-center align-self-start">
                  <h3 className="pt-4 display-3">
                    <CountUp start={0} delay={0.1} duration={0.2} end={BLOCKED && BLOCKED}>
                      {({ countUpRef }) => <span ref={countUpRef} />}
                    </CountUp>
                  </h3>

                </div>
              </div>
            </div>
          </div>
        </div>

        <h3 className='mt-3'>
          CHALLANGE OVERVIEW
        </h3>
        <div className="row mt-5">
          <div className="col-xl-3 col-sm-6 grid-margin stretch-card" style={{ height: '11rem' }}>
            <div className="card">
              <div className="card-body text-light" style={{backgroundColor:"rgba(0, 27, 11, 0.734)"}}>
                <h4 className="text-muted font-weight-normal">COMPLETED CHALLANGE</h4>
                <div className="d-flex align-items-center align-self-start">
                  <h3 className="pt-4 display-3">
                    <CountUp start={0} delay={0.1} duration={0.2} end={COMPLETED && COMPLETED}>
                      {({ countUpRef }) => <span ref={countUpRef} />}
                    </CountUp>
                  </h3>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-3 col-sm-6 grid-margin stretch-card">
            <div className="card">
              <div className="card-body text-light" style={{backgroundColor:"rgba(0, 27, 11, 0.734)"}}>
                <h4 className="text-muted font-weight-normal">ACTIVE CHALLANGE</h4>
                <div className="d-flex align-items-center align-self-start">
                  <h3 className="pt-4 display-3">
                    <CountUp start={0} delay={0.1} duration={0.2} end={ACTIVE1 && ACTIVE1}>
                      {({ countUpRef }) => <span ref={countUpRef} />}
                    </CountUp>
                  </h3>

                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-3 col-sm-6 grid-margin stretch-card">
            <div className="card">
              <div className="card-body text-light" style={{backgroundColor:"rgba(0, 27, 11, 0.734)"}}>
                <h4 className="text-muted font-weight-normal">ONGOING CHALLANGE</h4>
                <div className="d-flex align-items-center align-self-start">
                  <h3 className="pt-4 display-3">
                    <CountUp start={0} delay={0.1} duration={0.2} end={ONGOING && ONGOING}>
                      {({ countUpRef }) => <span ref={countUpRef} />}
                    </CountUp>
                  </h3>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-3 col-sm-6 grid-margin stretch-card">
            <div className="card">
              <div className="card-body text-light" style={{backgroundColor:"rgba(0, 27, 11, 0.734)"}}>
                <h4 className="text-muted font-weight-normal">CANCELLED CHALLANGE</h4>
                <div className="d-flex align-items-center align-self-start">
                  <h3 className="pt-4 display-3">
                    <CountUp start={0} delay={0.1} duration={0.2} end={CANCELLED && CANCELLED}>
                      {({ countUpRef }) => <span ref={countUpRef} />}
                    </CountUp>
                  </h3>

                </div>
              </div>
            </div>
          </div>
        </div>

        <h3 className='mt-3'>
          DEPOSITE OVERVIEW
        </h3>
        <div className="row mt-5">
          <div className="col-xl-3 col-sm-6 grid-margin stretch-card" style={{ height: '11rem' }}>
            <div className="card">
              <div className="card-body text-light" style={{backgroundColor:"rgba(0, 27, 11, 0.734)"}}>
                <h4 className="text-muted font-weight-normal">TOTAL REQUEST</h4>
                <div className="d-flex align-items-center align-self-start">
                  <h3 className="pt-4 display-3">
                    <CountUp start={0} delay={0.1} duration={0.2} end={totalDeposit && totalDeposit.count}>
                      {({ countUpRef }) => <span ref={countUpRef} />}
                    </CountUp>
                  </h3>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-3 col-sm-6 grid-margin stretch-card">
            <div className="card">
              <div className="card-body text-light" style={{backgroundColor:"rgba(0, 27, 11, 0.734)"}}>
                <h4 className="text-muted font-weight-normal">TOTAL DEPOSIT</h4>
                <div className="d-flex align-items-center align-self-start">
                  <h3 className="pt-4 display-3">₹
                    <CountUp start={0} delay={0.1} duration={0.2} end={totalDeposit && totalDeposit.data}>
                      {({ countUpRef }) => <span ref={countUpRef} />}
                    </CountUp>
                  </h3>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-3 col-sm-6 grid-margin stretch-card">
            <div className="card">
              <div className="card-body text-light" style={{backgroundColor:"rgba(0, 27, 11, 0.734)"}}>
                <h6 className="text-muted font-weight-normal">PENDING REQUEST</h6>
                <div className="d-flex align-items-center align-self-start">
                  <h3 className="pt-4 display-3">
                    <CountUp start={0} delay={0.1} duration={0.2} end={totalPending && totalPending.count}>
                      {({ countUpRef }) => <span ref={countUpRef} />}
                    </CountUp>
                  </h3>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-3 col-sm-6 grid-margin stretch-card">
            <div className="card">
              <div className="card-body text-light" style={{backgroundColor:"rgba(0, 27, 11, 0.734)"}}>
                <h6 className="text-muted font-weight-normal">REJECTED REQUEST</h6>
                <div className="d-flex align-items-center align-self-start">
                  <h3 className="pt-4 display-3">
                    <CountUp start={0} delay={0.1} duration={0.2} end={totalRejected && totalRejected.count}>
                      {({ countUpRef }) => <span ref={countUpRef} />}
                    </CountUp>
                  </h3>
                </div>
              </div>
            </div>
          </div>
        </div>

        <h3 className='mt-3'>
          WITHDRAWL REQUEST OVERVIEW
        </h3>
        <div className="row mt-5">
          <div className="col-xl-3 col-sm-6 grid-margin stretch-card" style={{ height: '11rem' }}>
            <div className="card">
              <div className="card-body text-light" style={{backgroundColor:"rgba(0, 27, 11, 0.734)"}}>
                <h4 className="text-muted font-weight-normal">TOTAL REQUEST</h4>
                <div className="d-flex align-items-center align-self-start">
                  <h3 className="pt-4 display-3">
                    <CountUp start={0} delay={0.1} duration={0.2} end={totalWithdrawl && totalWithdrawl.count}>
                      {({ countUpRef }) => <span ref={countUpRef} />}
                    </CountUp>
                  </h3>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-3 col-sm-6 grid-margin stretch-card">
            <div className="card">
              <div className="card-body text-light" style={{backgroundColor:"rgba(0, 27, 11, 0.734)"}}>
                <h4 className="text-muted font-weight-normal">TOTAL WITHDRAWAL</h4>
                <div className="d-flex align-items-center align-self-start">
                  <h3 className="pt-4 display-3">₹
                    <CountUp start={0} delay={0.1} duration={0.2} end={totalWithdrawl && totalWithdrawl.data}>
                      {({ countUpRef }) => <span ref={countUpRef} />}
                    </CountUp>
                  </h3>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-3 col-sm-6 grid-margin stretch-card">
            <div className="card">
              <div className="card-body text-light" style={{backgroundColor:"rgba(0, 27, 11, 0.734)"}}>
                <h4 className="text-muted font-weight-normal">PENDING REQUEST</h4>
                <div className="d-flex align-items-center align-self-start">
                  <h3 className="pt-4 display-3">
                    <CountUp start={0} delay={0.1} duration={0.2} end={totalPendingWithdrawl && totalPendingWithdrawl.count}>
                      {({ countUpRef }) => <span ref={countUpRef} />}
                    </CountUp>
                  </h3>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-3 col-sm-6 grid-margin stretch-card">
            <div className="card">
              <div className="card-body text-light" style={{backgroundColor:"rgba(0, 27, 11, 0.734)"}}>
                <h4 className="text-muted font-weight-normal">CANCELLED REQUEST</h4>
                <div className="d-flex align-items-center align-self-start">
                  <h3 className="pt-4 display-3">
                    <CountUp start={0} delay={0.1} duration={0.2} end={totalRejectedWithdrawl && totalRejectedWithdrawl.count}>
                      {({ countUpRef }) => <span ref={countUpRef} />}
                    </CountUp>
                  </h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>}
      {today&&<div>
        <div className="row mt-5">
          <div className="col-xl-3 col-sm-6 grid-margin stretch-card" style={{ height: '11rem' }}>
            <div className="card">
              <div className="card-body text-light" style={{backgroundColor:"rgba(0, 27, 11, 0.734)"}}>
                <h4 className="text-muted font-weight-normal">TOTAL USER</h4>
                <div className="d-flex align-items-center align-self-start">
                  <h3 className="pt-4 display-3">
                    <CountUp start={0} delay={0.1} duration={0.2} end={todayData && todayData.totalUser}>
                      {({ countUpRef }) => <span ref={countUpRef} />}
                    </CountUp>
                  </h3>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-3 col-sm-6 grid-margin stretch-card" style={{ height: '11rem' }}>
            <div className="card">
              <div className="card-body text-light" style={{backgroundColor:"rgba(0, 27, 11, 0.734)"}}>
                <h4 className="text-muted font-weight-normal">TOTAL USER WALLET BALANCE</h4>
                <div className="d-flex align-items-center align-self-start">
                  <h3 className="pt-4 display-3">
                    <CountUp start={0} delay={0.1} duration={0.2} end={todayData && todayData.totalWalletbalance}>
                      {({ countUpRef }) => <span ref={countUpRef} />}
                    </CountUp>
                  </h3>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-3 col-sm-6 grid-margin stretch-card" style={{ height: '11rem' }}>
            <div className="card">
              <div className="card-body text-light" style={{backgroundColor:"rgba(0, 27, 11, 0.734)"}}>
                <h4 className="text-muted font-weight-normal">TODAY USER</h4>
                <div className="d-flex align-items-center align-self-start">
                  <h3 className="pt-4 display-3">
                    <CountUp start={0} delay={0.1} duration={0.2} end={todayData && todayData.todayUser}>
                      {({ countUpRef }) => <span ref={countUpRef} />}
                    </CountUp>
                  </h3>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-3 col-sm-6 grid-margin stretch-card" style={{ height: '11rem' }}>
            <div className="card">
              <div className="card-body text-light" style={{backgroundColor:"rgba(0, 27, 11, 0.734)"}}>
                <h4 className="text-muted font-weight-normal">TODAY GAME</h4>
                <div className="d-flex align-items-center align-self-start">
                  <h3 className="pt-4 display-3">
                    <CountUp start={0} delay={0.1} duration={0.2} end={todayData && todayData.totalGame}>
                      {({ countUpRef }) => <span ref={countUpRef} />}
                    </CountUp>
                  </h3>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-3 col-sm-6 grid-margin stretch-card" style={{ height: '11rem' }}>
            <div className="card">
              <div className="card-body text-light" style={{backgroundColor:"rgba(0, 27, 11, 0.734)"}}>
                <h4 className="text-muted font-weight-normal">TODAY ALL GAME</h4>
                <div className="d-flex align-items-center align-self-start">
                  <h3 className="pt-4 display-3">
                    <CountUp start={0} delay={0.1} duration={0.2} end={todayData && todayData.todayAllGame}>
                      {({ countUpRef }) => <span ref={countUpRef} />}
                    </CountUp>
                  </h3>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-3 col-sm-6 grid-margin stretch-card" style={{ height: '11rem' }}>
            <div className="card">
              <div className="card-body text-light" style={{backgroundColor:"rgba(0, 27, 11, 0.734)"}}>
                <h4 className="text-muted font-weight-normal">TODAY SUCCESS GAME</h4>
                <div className="d-flex align-items-center align-self-start">
                  <h3 className="pt-4 display-3">
                    <CountUp start={0} delay={0.1} duration={0.2} end={todayData && todayData.todaySuccessGame}>
                      {({ countUpRef }) => <span ref={countUpRef} />}
                    </CountUp>
                  </h3>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-3 col-sm-6 grid-margin stretch-card" style={{ height: '11rem' }}>
            <div className="card">
              <div className="card-body text-light" style={{backgroundColor:"rgba(0, 27, 11, 0.734)"}}>
                <h4 className="text-muted font-weight-normal">TODAY CANCEL GAME</h4>
                <div className="d-flex align-items-center align-self-start">
                  <h3 className="pt-4 display-3">
                    <CountUp start={0} delay={0.1} duration={0.2} end={todayData && todayData.todayCancelGame}>
                      {({ countUpRef }) => <span ref={countUpRef} />}
                    </CountUp>
                  </h3>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-3 col-sm-6 grid-margin stretch-card" style={{ height: '11rem' }}>
            <div className="card">
              <div className="card-body text-light" style={{backgroundColor:"rgba(0, 27, 11, 0.734)"}}>
                <h4 className="text-muted font-weight-normal">TODAY COMMISSION</h4>
                <div className="d-flex align-items-center align-self-start">
                  <h3 className="pt-4 display-3">
                    <CountUp start={0} delay={0.1} duration={0.2} end={todayData && todayData.todayCommission}>
                      {({ countUpRef }) => <span ref={countUpRef} />}
                    </CountUp>
                  </h3>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-3 col-sm-6 grid-margin stretch-card" style={{ height: '11rem' }}>
            <div className="card">
              <div className="card-body text-light" style={{backgroundColor:"rgba(0, 27, 11, 0.734)"}}>
                <h4 className="text-muted font-weight-normal">TODAY TOTAL DEPOSIT</h4>
                <div className="d-flex align-items-center align-self-start">
                  <h3 className="pt-4 display-3">
                    <CountUp start={0} delay={0.1} duration={0.2} end={todayData && todayData.todayTotalDeposit}>
                      {({ countUpRef }) => <span ref={countUpRef} />}
                    </CountUp>
                  </h3>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-3 col-sm-6 grid-margin stretch-card" style={{ height: '11rem' }}>
            <div className="card">
              <div className="card-body text-light" style={{backgroundColor:"rgba(0, 27, 11, 0.734)"}}>
                <h4 className="text-muted font-weight-normal">TODAY TOTAL WITHDRAWAL</h4>
                <div className="d-flex align-items-center align-self-start">
                  <h3 className="pt-4 display-3">
                    <CountUp start={0} delay={0.1} duration={0.2} end={todayData && todayData.todayTotalWithdraw}>
                      {({ countUpRef }) => <span ref={countUpRef} />}
                    </CountUp>
                  </h3>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-3 col-sm-6 grid-margin stretch-card" style={{ height: '11rem' }}>
            <div className="card">
              <div className="card-body text-light" style={{backgroundColor:"rgba(0, 27, 11, 0.734)"}}>
                <h4 className="text-muted font-weight-normal">TOTAL WON AMOUNT</h4>
                <div className="d-flex align-items-center align-self-start">
                  <h3 className="pt-4 display-3">
                    <CountUp start={0} delay={0.1} duration={0.2} end={todayData && todayData.totolWonAmount}>
                      {({ countUpRef }) => <span ref={countUpRef} />}
                    </CountUp>
                  </h3>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-3 col-sm-6 grid-margin stretch-card" style={{ height: '11rem' }}>
            <div className="card">
              <div className="card-body text-light" style={{backgroundColor:"rgba(0, 27, 11, 0.734)"}}>
                <h4 className="text-muted font-weight-normal">TOTAL LOSE AMOUNT</h4>
                <div className="d-flex align-items-center align-self-start">
                  <h3 className="pt-4 display-3">
                    <CountUp start={0} delay={0.1} duration={0.2} end={todayData && todayData.totalLoseAmount}>
                      {({ countUpRef }) => <span ref={countUpRef} />}
                    </CountUp>
                  </h3>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-3 col-sm-6 grid-margin stretch-card" style={{ height: '11rem' }}>
            <div className="card">
              <div className="card-body text-light" style={{backgroundColor:"rgba(0, 27, 11, 0.734)"}}>
                <h4 className="text-muted font-weight-normal">TOTAL HOLD BALANCE</h4>
                <div className="d-flex align-items-center align-self-start">
                  <h3 className="pt-4 display-3">
                    <CountUp start={0} delay={0.1} duration={0.2} end={todayData && todayData.totalHoldBalance}>
                      {({ countUpRef }) => <span ref={countUpRef} />}
                    </CountUp>
                  </h3>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-3 col-sm-6 grid-margin stretch-card" style={{ height: '11rem' }}>
            <div className="card">
              <div className="card-body text-light" style={{backgroundColor:"rgba(0, 27, 11, 0.734)"}}>
                <h4 className="text-muted font-weight-normal">TOTAL WITHDRAWAL HOLD BALANCE</h4>
                <div className="d-flex align-items-center align-self-start">
                  <h3 className="pt-4 display-3">
                    <CountUp start={0} delay={0.1} duration={0.2} end={todayData && todayData.totalWithdrawHold}>
                      {({ countUpRef }) => <span ref={countUpRef} />}
                    </CountUp>
                  </h3>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-3 col-sm-6 grid-margin stretch-card" style={{ height: '11rem' }}>
            <div className="card">
              <div className="card-body text-light" style={{backgroundColor:"rgba(0, 27, 11, 0.734)"}}>
                <h4 className="text-muted font-weight-normal">TOTAL DEPOSIT</h4>
                <div className="d-flex align-items-center align-self-start">
                  <h3 className="pt-4 display-3">
                    <CountUp start={0} delay={0.1} duration={0.2} end={todayData && todayData.totalDeposit}>
                      {({ countUpRef }) => <span ref={countUpRef} />}
                    </CountUp>
                  </h3>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-3 col-sm-6 grid-margin stretch-card" style={{ height: '11rem' }}>
            <div className="card">
              <div className="card-body text-light" style={{backgroundColor:"rgba(0, 27, 11, 0.734)"}}>
                <h4 className="text-muted font-weight-normal">TOTAL WITHDRAWAL</h4>
                <div className="d-flex align-items-center align-self-start">
                  <h3 className="pt-4 display-3">
                    <CountUp start={0} delay={0.1} duration={0.2} end={todayData && todayData.totalWithdrawl}>
                      {({ countUpRef }) => <span ref={countUpRef} />}
                    </CountUp>
                  </h3>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-3 col-sm-6 grid-margin stretch-card" style={{ height: '11rem' }}>
            <div className="card">
              <div className="card-body text-light" style={{backgroundColor:"rgba(0, 27, 11, 0.734)"}}>
                <h4 className="text-muted font-weight-normal">TOTAL REFERRAL EARNING</h4>
                <div className="d-flex align-items-center align-self-start">
                  <h3 className="pt-4 display-3">
                    <CountUp start={0} delay={0.1} duration={0.2} end={todayData && todayData.totalReferralEarning}>
                      {({ countUpRef }) => <span ref={countUpRef} />}
                    </CountUp>
                  </h3>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-3 col-sm-6 grid-margin stretch-card" style={{ height: '11rem' }}>
            <div className="card">
              <div className="card-body text-light" style={{backgroundColor:"rgba(0, 27, 11, 0.734)"}}>
                <h4 className="text-muted font-weight-normal">TOTAL REFERRAL WALLET</h4>
                <div className="d-flex align-items-center align-self-start">
                  <h3 className="pt-4 display-3">
                    <CountUp start={0} delay={0.1} duration={0.2} end={todayData && todayData.totalReferralWallet}>
                      {({ countUpRef }) => <span ref={countUpRef} />}
                    </CountUp>
                  </h3>
                </div>
              </div>
            </div>
          </div>
        </div>
        </div>}




      <div className="row">
        <div className="col-md-4 grid-margin stretch-card">
         
        </div>
       
      </div>
    </div>
  );
}


export default Dashboard;