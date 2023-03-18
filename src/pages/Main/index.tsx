import React from 'react';
import { useNavigate } from 'react-router-dom';
import './index.css';

function Main() {
  const nav = useNavigate()
  const toPut = ()=>{
    nav('/action/put')
  }
  const toOpen = ()=>{
    nav('/action/open')
  }
  return (
    <div className="App">
        <img src="./logo_big.png" alt="" />
        <div className="title">时间胶囊</div>
        <div className="action">
          <div className='put' onClick={toPut}>
              <div className="bigbox">Put</div>
              <div className="smallbox">添加</div>
          </div> 
          <div  className='open' onClick={toOpen}>
              <div className="bigbox">Open</div>
              <div className="smallbox">打开</div>
          </div>    
        </div>
        <div className='link'><a href="123" style={{margin:"0 8px"}}>什么是时间胶囊？</a><a href="123">胶囊日记</a></div>
    </div>
  );
}

export default Main;
