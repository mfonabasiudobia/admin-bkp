import React, { Component, useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import Swal from "sweetalert2";
import { Form } from "react-bootstrap";
import axios from "axios";

const Login = () => {
  const history = useHistory();

  // const [Password, setPassword] = useState();
  // const [otp, setOtp] = useState(false)
  const [Phone, setPhone] = useState();
  const [twofactor_code, settwofactor_code] = useState();
  const [otp, setOtp] = useState(false);
  const [secretCode, setSecretCode] = useState();

  // console.log(FirstName);
  const beckendLocalApiUrl = process.env.REACT_APP_BACKEND_LOCAL_API;
  const beckendLiveApiUrl = process.env.REACT_APP_BACKEND_LIVE_API;
  const nodeMode = process.env.NODE_ENV;
  if (nodeMode === "development") {
    var baseUrl = beckendLocalApiUrl;
  } else {
    var baseUrl = beckendLiveApiUrl;
  }

  // const handleClick = async (e) => {
  //   e.preventDefault();
  //   if (!Phone) {
  //     alert("Enter Phone and Password")
  //   } else {
  //     const { data } = await axios.post(baseUrl+"login/admin", {
  //       Phone,
  //       Password
  //     }).then((res) => {
  //       const token = res.data.data[0];
  //       console.log(token);
  //       localStorage.setItem('token', token);

  //       // history.push("/dashboard")
  //       history.push("/dashboard")
  //       window.location.reload()

  //     });
  //   }
  // }
  const handleClick = async (e) => {
    e.preventDefault();

    if (!Phone) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please enter your phone number",
      });
    } else {
      await axios
        .post(baseUrl + `login/admin`, {
          Phone,
        })
        .then((respone) => {
          if (respone.data.status == 101) {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: respone.data.msg,
            });
          } else if (respone.data.status == 200) {
            setOtp(true);
            //console.log(respone.data);
            setSecretCode(respone.data.secret);
            if (respone.data.myToken) {
              Swal.fire({
                icon: "success",
                title: "OTP",
                text: "OTP For Test Login: " + respone.data.myToken,
              });
            }
          }
        })
        .catch((e) => {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Something went wrong",
            // width: '20%',
            // height:'20%',
          });
        });
    }
  };

  const varifyOtp = async (e) => {
    e.preventDefault();
    console.log("verify otp sumbut req");
    if (!Phone) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please enter your phone number",
      });
    } else {
      await axios
        .post(baseUrl + `login/admin/finish`, {
          Phone,
          twofactor_code,
          secretCode,
        })
        .then((respone) => {
          if (respone.data.status == 101) {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: respone.data.msg,
            });
          } else if (respone.data.status == 200) {
            const token = respone.data.token;
            localStorage.setItem("token", token);
            history.push("/dashboard")
            window.location.reload(true);
          } else {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Something went wrong!",
            });
          }
        })
        .catch((e) => {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Something went wrong!",
          });
        });
    }
  };

  const setError = () => {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Invalid Number",
      confirmation: true,
    });
  };

  const [WebSitesettings, setWebsiteSettings] = useState("");

  const fetchData = () => {
    return fetch(baseUrl + "settings/data")
      .then((response) => response.json())
      .then((data) => setWebsiteSettings(data));
  };
  //console.log(WebSitesettings);
  useEffect(() => {
    fetchData();
  }, []);

  return (
      <div>
        <div className="d-flex align-items-center auth px-0">
          <div className="row w-100 mx-0">
            <div className="col-lg-4 mx-auto">
              <div className="card text-left py-5 px-4 px-sm-5">
                <div className="brand-logo">
                  <img src={baseUrl + WebSitesettings.Logo} alt="" />
                </div>
                <h4>Login {WebSitesettings.WebsiteName} Admin</h4>
                {/* <h6 className="font-weight-light">Sign in to continue.</h6> */}
                <Form className="pt-7">
                  <Form.Group className="d-flex search-field ">
                    <Form.Control
                      type="text"
                      placeholder="Username"
                      size="lg"
                      maxLength={'10'}
                      className="h-auto"
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </Form.Group>
                  {otp && (
                    <Form.Group className="d-flex search-field mt-3">
                      <div className="input-group">
                        <div className="input-group-prepend">
                          <span className="input-group-text" style={{ 
                            background: '#2A3038', 
                            border: '1px solid #434A54',
                            color: '#6C757D',
                            height: '100%',
                            borderTopLeftRadius: '8px',
                            borderBottomLeftRadius: '8px'
                          }}>OTP</span>
                        </div>
                        <Form.Control
                          type="tel"
                          placeholder="Enter OTP"
                          size="lg"
                          className="h-auto"
                          onChange={(e) => settwofactor_code(e.target.value)}
                          style={{
                            borderTopLeftRadius: '0px',
                            borderBottomLeftRadius: '0px',
                            borderTopRightRadius: '8px',
                            borderBottomRightRadius: '8px'
                          }}
                        />
                      </div>
                    </Form.Group>
                  )}
                  {!otp && (
                    <button
                      className="btn btn-primary btn-block btn-lg font-weight-medium auth-form-btn mt-3"
                      onClick={(e) => handleClick(e)}
                    >
                      Next
                    </button>
                  )}
                  {otp && (
                    <button
                      className="btn btn-primary btn-block btn-lg font-weight-medium auth-form-btn mt-3"
                      onClick={(e) => varifyOtp(e)}
                    >
                      Verify
                    </button>
                  )}
                </Form>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
};

export default Login;