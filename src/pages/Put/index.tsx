import dayjs from 'dayjs';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { v4 } from 'uuid';
import { Mistake, Pill, setList } from '../../type';
import './index.css';


const Put=()=>{
  const nav = useNavigate()
  const [form,setForm]= useState<Pill>({
    key:"",
    name:"",
    email:"",
    open_time:0,
    content:"",
    tip:"",
    open_str:dayjs().format('YYYY-MM-DD HH:mm:ss')
  })
  const [mistake,setMistake] = useState<Mistake>({
    name_null:false,
    email_null:false,
    email_mis:false,
    open_time_null:false,
    content_null:false,
    open_time_mis:false
  })

  const submit = (e:React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault()/*阻止刷新的表单默认行为*/
    let key = v4()
    let date_reg:RegExp = /^(\d{4})-(\d{2})-(\d{2}) (([0-2][0-3])|([0-1][0-9])):[0-5][0-9]:[0-5][0-9]$/
    let email_reg:RegExp = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6})*$/
    let name_null = (form.name==='')
    let email_null = (form.email==='')
    let email_mis = (!email_reg.test(form.email))
    let content_null = (form.content === '')
    let open_time_null= (form.open_str==='')
    let open_time_mis = (!date_reg.test(form.open_str))
    setMistake((old)=>{
      return {
        ...old,
        name_null:name_null,
        email_null:email_null,
        email_mis:email_mis&&!email_null,
        content_null:content_null,
        open_time_mis:open_time_mis&&!open_time_null,
        open_time_null:open_time_null
      }
    })
    if(!name_null&&!email_null&&!mistake.open_time_null&&!content_null&&!open_time_mis){
      setList(key,form)
      nav(`/action/success/${key}`)
    }
    
  }
  const change = (e:React.ChangeEvent<HTMLInputElement|HTMLTextAreaElement>)=>{
    setForm((old)=>{
      return {
        ...old,
        [e.target.name]:e.target.value
      }
    })
  }
  return (
    <div className="form_box">
      <form onSubmit={submit}>
        <div className='small_title'>添加胶囊</div>
        <div className='input_box'>
          <label>你的名字</label>
          {mistake.name_null?<label className="mistake">名字 必须填写</label>:null}
          <input type="text" name='name' onChange={change} />
        </div>
        <div className='input_box'>
          <label>你的邮箱</label>
          {mistake.email_null?<label className="mistake">邮箱 必须填写</label>:null}
          {mistake.email_mis?<label className="mistake">邮箱 格式不正确</label>:null}
          <input type="text" name='email' onChange={change}/>
        </div>
        <div className='input_box'>
          <label>打开时间</label>
          {mistake.open_time_null?<label className="mistake">打开时间 必须填写</label>:null}
          {mistake.open_time_mis?<label className="mistake">打开时间 格式不正确</label>:null}
          <div className="open_box">
            <input type="text" name='open_str' defaultValue={dayjs().format('YYYY-MM-DD HH:mm:ss')} onChange={change}/>
            <div className='tips'>打开时间之前，胶囊内容是看不到的</div>
          </div>
          
        </div>
        <div className='input_box'>
          <label>胶囊内容</label>
          {mistake.content_null?<label className="mistake">内容 必须填写</label>:null}
          <textarea name='content' rows={8} cols={50} onChange={change}></textarea>
          <div className='tips'>胶囊内容不能超过5000字。</div>
          </div>
        <div className='input_box'>
          <label>未到期提示信息</label>
          <textarea  name='tip' rows={3} cols={50} onChange={change}/>
          <div className='tips'>在打开时间之前打开胶囊，会看到提示信息。</div>
        </div>
        <input type="submit" value="添加胶囊" className='submit_btn'/>
      </form>
    </div>
  )
}

export default Put;
