import { useParams } from "react-router-dom"
import './index.css'
type Params = {
    key:string
}
  
const Success = ()=>{
    const params = useParams<Params>()
    return (
      <div className="form_box">
        <div className="small_title">胶囊添加成功</div>
        <div style={{fontSize:'13px'}}>胶囊Key</div>
        <div className="open_box">
          <input type="text" className="suc_input" defaultValue={params.key} />
          <div style={{fontSize:'13px',margin:'15px',width:'1000px'}}>你可以复制 key自己保存，也可以发送给你的好友，让他来打开胶囊。</div>
        </div>
      </div>
    )
}

export default Success
