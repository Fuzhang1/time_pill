import React from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import './index.css';
const Action = ()=>{
    const location = useLocation()
    const nav = useNavigate()
    const to =(s:string)=>{
        if(s==='put'){
            if(location.pathname!=='/action/put') nav('/action/put')
            else    window.location.reload()
        }
        else if(s==='open'){
            nav('/action/open')
        }
        else if(s==='main'){
            nav('/')
        }
    }
    return (
    <div className="action_box">
        <div className="navi">
            <div className="navi-small-box">
                <img src="./logo.gif" alt="" />
                <div style={{fontSize:'18px',color:'rgb(102,102,102)',padding:'0 10px 0 5px',cursor:'pointer'}} onClick={()=>{to('main')}}>时间胶囊</div>
                <div className='myfont' onClick={()=>{to('main')}}>首页</div>
                <div 
                className={(location.pathname==='/action/put'||location.pathname.indexOf('/action/success')>=0)?'active_box myfont':'myfont'}
                onClick={()=>{to('put')}}>
                    添加
                </div>
                <div className={location.pathname==='/action/open'?'active_box myfont':'myfont'} onClick={()=>{to('open')}}>打开</div>
                <div className='diary myfont'>回胶囊日记</div>  
            </div>
            
        </div>
        <Outlet ></Outlet>
    </div>
    )
}

export default Action;