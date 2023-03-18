import dayjs from "dayjs"

export interface Pill{
    key:string,
    name:string,
    email:string,
    open_time:number
    content:string
    tip:string,
    open_str:string
}

export interface Mistake{
    name_null:boolean,
    email_null:boolean,
    email_mis:boolean,
    open_time_null:boolean,
    open_time_mis:boolean,
    content_null:boolean,
}


export interface Msg{
    exist:boolean,
    pill:Pill|null
}

export function getList(){
    let temp = localStorage.getItem('pill_list')
    if(temp===null) return []
    else return JSON.parse(temp)
}

export function setList(r_key:string,pill:Pill){
    let time = pill.open_str
    pill = {
        ...pill,
        key:r_key,
        open_time:dayjs(time).unix(),
    }
    let list = getList()
    list = [
        ...list,
        pill
    ]
    localStorage.setItem('pill_list',JSON.stringify(list))
}

export function getPill(key:string){
    let list:Array<Pill> = getList()
    for(let i=0;i<list.length;i++){
        if(list[i].key===key)   return {exist:true,pill:list[i]}
    }
    return {exist:false,pill:null}
}