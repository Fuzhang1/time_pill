import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';
import { getPill, Msg, Pill } from '../../type';
import './index.css'
function Open(){
    const [key,setKey] = useState<string>('')
    const [seconds, setSeconds] = useState(0);
    const [mode,setMode] = useState(dayjs().unix())
    const [pill,setPill] = useState<Pill|null>()
    const key_change = (e:React.ChangeEvent<HTMLInputElement>)=>{
        setKey(e.target.value)
    }
    const open_pill = ()=>{
        let msg:Msg = getPill(key)
        if(msg.exist===false)   setMode(2)
        else{
            if((msg.pill?msg.pill.open_time:0)<=dayjs().unix()){   
                setMode(3)
            }else{
                setMode(4)
            }
            setPill(msg.pill)
            setSeconds((msg.pill?msg.pill.open_time:0)-dayjs().unix())
        }
    }
    useEffect(() => {
        //pill刷新启动定时器
        setInterval(()=>{
            if(pill){
                setSeconds((pill?pill.open_time:0)-dayjs().unix())
            }
        },1000)
    }, [pill])
    

    return(
        <div className="form_box">
            <div className='small_title'>打开胶囊</div>
            <div className='openpill_box'>
                <div>胶囊Key:</div>
                <input type="text" className='open_input' onChange={key_change}/>
                <input type="submit" className='submit_btn' value={'打开胶囊'} onClick={open_pill}/>
            </div>
            <div className={mode===3?"exist":"hide"}>
                {pill?.name} 在 {dayjs.unix(pill?pill.open_time:0).format('YYYY-MM-DD HH:mm:ss')} 对你说:
            </div>
            <div className={mode===3?"pill_content":"hide"}>{pill?.content}</div>
            <div className={mode===2?"not_exist":"hide"}>没有这个胶囊Key</div>
            <div className={mode===4?"":"hide"}>
            <div className='exist'>这颗胶囊未到提取时间,不能打开。</div>
            <label>打开时间在 {dayjs.unix(pill?pill.open_time:0).format('YYYY-MM-DD HH:mm:ss')}，距离现在 {seconds} 秒。</label>
            <div className='pill_tip'>
                {pill?.name}{ ` 给你留的提示信息:\n`}{pill?.tip}
            </div>
            </div>
        </div>
    )
}

export default Open;