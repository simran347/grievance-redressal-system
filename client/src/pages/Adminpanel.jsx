import React, { useState, useEffect } from 'react'
import "./UserRegister.css";

const Adminpanel = () => {
  const [time, setTime] = useState(new Date());
  const [complaintsOpen, setComplaintsOpen] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formattedTime = time.toLocaleTimeString();
  const formattedDate = time.toLocaleDateString(undefined, {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });

  return (
    <>
    <div className="container-fluid">
        <div className="row">
        {/* left side start */}
        <div className="col-md-2 text-light ">
            <h4><i className='bi bi-bank p-2' ></i>LNM University</h4>
            <span>Admin Panel</span>
            
            <hr />
            
            <small>MAIN</small>
            <br />
            <h6><i className="bi bi-speedometer p-2"></i>Dashboard</h6>
            <br />
            <small>MANAGEMENT</small>   
            <br />
            <h6><i className="bi bi-bank p-2"></i>College Management</h6>
            <br />
            <h6><i className="bi bi-calendar-event p-2"></i>Session Management</h6>
            <br />
            <h6><i className="bi bi-tags p-2"></i>Complaint Types</h6>
            <br />
            <div className="sidebar-item">
              <h6 onClick={() => setComplaintsOpen(!complaintsOpen)} style={{cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'space-between'}}>
                <span><i className="bi bi-file-earmark-text p-2"></i>Complaints</span>
                <i className={"bi sidebar-arrow " + (complaintsOpen ? 'bi-chevron-down' : 'bi-chevron-right')}></i>
              </h6>
              <ul className={"submenu " + (complaintsOpen ? 'open' : '')}>
                <li>All Complaints</li>
                <li>New Complaint</li>
                <li>Resolved</li>
              </ul>
            </div>
            <br />
            <small>USERS</small>
            <br />
            <h6><i className="bi bi-people-fill p-2"></i>User Management</h6>
            <br />
            <h6><i className="bi bi-slash-circle p-2"></i>Blocked Users</h6>
            <br />
            <small>COMMUNITY</small>
            <br />
            <h6><i className="bi bi-chat-left-dots p-2"></i>Discussion Forum</h6>
            <br />
            <small>ACCOUNT</small>
            <h6> <i className="bi bi-lock p-2"></i>Change Password</h6>
            <hr />
            <h6><i className="bi bi-box-arrow-right p-2"></i><span style={{color:"red"}}>Logout</span></h6>
            <br />
            <br />
        </div>
        {/* left side end */}

        {/* right side start */}
        <div className="col-md-10">
          <div className="top-row">
            <h6>Admin Panel <small>/dashboard</small></h6>
            <div className="top-right">
              <div className="clock-block">
                <h2 className="text-primary">
                  <i className="bi bi-clock-fill me-2"></i>
                  {formattedTime}
                </h2>
                <small className="clock-date">{formattedDate}</small>
              </div>
            </div>
          </div>
          <div className='rightbottom'>
            <h2 >Dashboard Overview</h2>
            <small className='small'>welcome back, Admin. Here is what is happening today.</small>
                <br /> <br />
                <div className="parent">
            <div className="div1">
                
                <h4> <i className="bi bi-people-fill text-primary"></i> <span style={{ color: 'blue' }}>3</span></h4>
               <small className='small '>TOTAL USERS</small>
            </div>
            <div className="div1">
                <h4> <i class="bi bi-exclamation-circle text-danger"></i> <span style={{ color: 'red' }}>0</span></h4>
                <small className='small'>NOT PROCEED</small>
            </div>
            <div className="div1">
                <h4> <i class="bi bi-clock text-warning"></i> <span style={{ color: 'yellow' }}><b>2</b></span></h4>
                <small className='small'>PENDING</small>
            </div>
            <div className="div1">
                <h4> <span style={{ color: 'green' }}>1</span></h4>
                <small className='small'>CLOSED</small>
            </div>
            <div className="div1">
                <h4> <i className="bi bi-bank  " style={{ color: 'purple' }}></i> <span style={{ color: 'purple' }}>1</span></h4>
                <small className='small'>TOTAL COLLEGES</small>
            </div>
            <div className="div1">
                <h4> <i className="bi bi-slash-circle text-danger"></i> <span style={{ color: 'red' }}>0</span></h4>
                <small className='small'>BLOCKED USERS</small>
            </div>
            </div>
        </div>
        
                
              
        </div>
         {/* right side end */}
    </div>
    </div>
    </>
    
  )
}

export default Adminpanel
