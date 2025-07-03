import React, { Component } from 'react';
import { Dropdown } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import { Trans } from 'react-i18next';
import axios from 'axios';

class Navbar extends Component {

  logout = () => {

    const beckendLocalApiUrl = process.env.REACT_APP_BACKEND_LOCAL_API;
    const beckendLiveApiUrl = process.env.REACT_APP_BACKEND_LIVE_API;
    const nodeMode = process.env.NODE_ENV;
    if(nodeMode==="development"){
      var baseUrl =  beckendLocalApiUrl;
    }else{
       baseUrl = beckendLiveApiUrl
    }
    
    const access_token = localStorage.getItem("token")
    const headers = {
      Authorization: `Bearer ${access_token}`
    }
    axios.post(baseUrl+`logout`, {
      headers: headers
    }, { headers })
      .then((res) => {
        console.log(res);
        // setUser(res.data)
        localStorage.removeItem("token", "user")
        window.location.reload()
        window.location.assign("/adminlogin")

      }).catch((e) => {
        if (e.response.status === 401) {
          localStorage.removeItem('token', "user");
          localStorage.removeItem('token', "user");
          window.location.assign("/adminlogin")
        }
      })

  }

  toggleOffcanvas() {
    document.querySelector('.sidebar-offcanvas').classList.toggle('active');
  }
  toggleRightSidebar() {
    document.querySelector('.right-sidebar').classList.toggle('open');
  }
  render() {
    return (
      <nav className="navbar p-0 fixed-top d-flex flex-row" style={{ 
        background: 'rgba(30, 41, 59, 0.95)', 
        backdropFilter: 'blur(10px)',
        borderBottom: '1px solid #334155',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
      }}>
        {/* <div className="navbar-brand-wrapper d-flex d-lg-none align-items-center justify-content-center">
          <Link className="navbar-brand brand-logo-mini" to="/">
            <img src='https://cdn-icons-png.flaticon.com/512/2206/2206368.png' alt="logo" style={{ 
              height: '40px', 
              width: '40px',
              filter: 'brightness(0) invert(1)'
            }} />
          </Link>
        </div> */}
        <div className="navbar-menu-wrapper flex-grow d-flex align-items-stretch">
          <button className="navbar-toggler align-self-center" type="button" onClick={() => document.body.classList.toggle('sidebar-icon-only')} style={{
            background: 'rgba(99, 102, 241, 0.1)',
            border: '1px solid #334155',
            borderRadius: '8px',
            width: '40px',
            height: '40px',
            padding: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <span className="mdi mdi-menu" style={{ color: '#f8fafc' }}></span>
          </button>
          <ul className="navbar-nav w-100">
            <li className="nav-item w-100">
              <div style={{ 
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                padding: '0.5rem 1rem',
                borderRadius: '8px',
                margin: '0 1rem',
                display: 'inline-block'
              }}>
                <h6 style={{ 
                  margin: 0, 
                  color: 'white', 
                  fontWeight: '600',
                  fontSize: '0.9rem'
                }}>
                  Welcome, {this.props.userAname}
                </h6>
              </div>
            </li>
          </ul>
          <ul className="navbar-nav navbar-nav-right">
            
            <Dropdown alignRight as="li" className="nav-item">
              <Dropdown.Toggle as="a" className="nav-link cursor-pointer no-caret" style={{
                background: 'rgba(99, 102, 241, 0.1)',
                borderRadius: '12px',
                padding: '0.5rem 0.75rem',
                border: '1px solid #334155',
                transition: 'all 0.3s ease'
              }}>
                <div className="navbar-profile d-flex align-items-center">
                  <img className="img-xs rounded-circle" src="https://cdn-icons-png.flaticon.com/512/2206/2206368.png" alt="profile" style={{
                    width: '32px',
                    height: '32px',
                    border: '2px solid #6366f1',
                    marginRight: '0.75rem'
                  }} />
                 
                   <p className="mb-0 d-none d-sm-block navbar-profile-name" style={{
                     color: '#f8fafc',
                     fontWeight: '500',
                     fontSize: '0.875rem',
                     margin: 0
                   }}>
                     <Trans>User: {this.props.usertype}</Trans>
                   </p>
                  <i className="mdi mdi-menu-down d-none d-sm-block" style={{ 
                    color: '#cbd5e1',
                    marginLeft: '0.5rem'
                  }}></i>
                  
                </div>
              </Dropdown.Toggle>

              <Dropdown.Menu className="navbar-dropdown preview-list navbar-profile-dropdown-menu" style={{
                background: '#1e293b',
                border: '1px solid #334155',
                borderRadius: '12px',
                boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
                marginTop: '0.5rem'
              }}>

                <Dropdown.Item onClick={() => this.logout()} className="preview-item" style={{
                  color: '#cbd5e1',
                  padding: '0.75rem 1rem',
                  transition: 'all 0.3s ease'
                }}>
                  <div className="preview-thumbnail">
                    <div className="preview-icon bg-dark rounded-circle" style={{
                      background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
                      width: '32px',
                      height: '32px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      <i className="mdi mdi-logout text-white" style={{ fontSize: '1rem' }}></i>
                    </div>
                  </div>
                  <div className="preview-item-content" >
                    <p className="preview-subject mb-1" style={{ 
                      color: '#f8fafc',
                      fontWeight: '500',
                      margin: 0
                    }}>
                      <Trans>Log Out</Trans>
                    </p>
                  </div>
                </Dropdown.Item>
                <Dropdown.Divider style={{ borderColor: '#334155' }} />
                <Dropdown.Item className="preview-item" style={{
                  color: '#cbd5e1',
                  padding: '0.75rem 1rem',
                  transition: 'all 0.3s ease'
                }}>
                  <Link to={'/admin/update'} className="preview-thumbnail" style={{ textDecoration: 'none' }}>
                    <div className="preview-icon bg-dark rounded-circle" style={{
                      background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
                      width: '32px',
                      height: '32px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      <i className="mdi mdi-update text-white" style={{ fontSize: '1rem' }}></i>
                    </div>
                  </Link>
                  <Link  to={'/admin/update'} className="preview-item-content" style={{ textDecoration: 'none' }}>
                    <p className="preview-subject mb-1" style={{ 
                      color: '#f8fafc',
                      fontWeight: '500',
                      margin: 0
                    }}>
                      <Trans>Update Password</Trans>
                    </p>
                  </Link>
                </Dropdown.Item>
                <Dropdown.Divider style={{ borderColor: '#334155' }} />
                <Dropdown.Item className="preview-item" style={{
                  color: '#cbd5e1',
                  padding: '0.75rem 1rem',
                  transition: 'all 0.3s ease'
                }}>
                  <Link to={'/admin/profile'} className="preview-thumbnail" style={{ textDecoration: 'none' }}>
                    <div className="preview-icon bg-dark rounded-circle" style={{
                      background: 'linear-gradient(135deg, #06b6d4 0%, #0891b2 100%)',
                      width: '32px',
                      height: '32px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      <i className="mdi mdi-account-circle text-white" style={{ fontSize: '1rem' }}></i>
                    </div>
                  </Link>
                  <Link  to={'/admin/profile'} className="preview-item-content" style={{ textDecoration: 'none' }}>
                    <p className="preview-subject mb-1" style={{ 
                      color: '#f8fafc',
                      fontWeight: '500',
                      margin: 0
                    }}>
                      <Trans>Profile</Trans>
                    </p>
                  </Link>
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </ul>
          {/* <button className="navbar-toggler navbar-toggler-right d-lg-none align-self-center" type="button" onClick={this.toggleOffcanvas} style={{
            background: 'rgba(99, 102, 241, 0.1)',
            border: '1px solid #334155',
            borderRadius: '8px',
            width: '40px',
            height: '40px',
            padding: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <span className="mdi mdi-format-line-spacing" style={{ color: '#f8fafc' }}></span>
          </button> */}
        </div>
      </nav>
    );
  }
}

export default Navbar;
