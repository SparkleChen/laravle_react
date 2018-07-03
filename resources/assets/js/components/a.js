import React from 'react'

export class A extends React.Component {
    constructor(props) {
        super(props)
        this.asyncChain = this.asyncChain.bind(this)
        this.promisChain = this.promisChain.bind(this)
    }
    sleep(ms){
        //发送请求返回promise对象
        return new Promise(function(resolve,reject){
            setTimeout(()=>{
               resolve(123)
             },ms)
        })
    }
    async asyncChain() {
        let ret = null
        let aa = [1,2,3,4]
        try {
            for(let v of aa){    
            //等待返回promise的resolve值            
            ret = await this.sleep(5000)
            console.log(v)
            console.log(ret)
            }
        } catch(e) {
          console.log("err")
        }
    }
    promisChain(){
        let p = this.sleep(5000)
        let aa = [1,2,3,4]    
        for(let v of aa){
        p = p.then((res)=>{
          //处理返回回来的promise对象的res结果
          console.log(v)
          console.log(res)
          //链式调用promise
          return this.sleep(5000)         
        })
        }
    }
    render() {
        return (
            <div onClick={this.promisChain}>
                <h1>A.</h1>           
            </div>
        )
    }
}