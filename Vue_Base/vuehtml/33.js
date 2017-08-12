/**
 * Created by tiedan on 2017/6/23.
 */
new Vue({
    el:'.container',
    data:{
        username:'',
        age:'',
        msgList:[{user:'abc',age:10},{user:'add',age:20}],
        pageCount:0,//总共页数
        nowPage:1
    },
    mounted(){ //Vue挂载完毕 自己去执行
        this.getPagaData(this.nowPage);
        this.getPageCount();
    },
    methods:{
        getPageCount(){
            $.ajax({
                url:'/getPageCount',
            }).then(res=>{
                this.pageCount=res.count;
            })
        },
        getPagaData(n){
            this.nowPage=n;
            $.ajax({
                url:'/getPageData',
                data:{
                    page:n
                }
            }).then((res)=>{
                this.msgList=res;
            })
        },
        addMsg(){
            $.ajax({
                url:'/add',
                data:{
                    name:this.username,
                    age:this.age
                },
                dataType:'json'
            }).then((res)=>{
                if(res.err){
                    alert(res.msg)
                }else{
                    this.msgList.push({
                        name:this.username,
                        age:this.age
                    });
                    this.username='';
                    this.age='';
                }
            },(res)=>{
                console.log(res)
            })

        },
        delMag(n){
            this.msgList.splice(n,1);
        },
        fnPrevPage(){
            this.nowPage=this.nowPage-1;
            if(this.nowPage==0){
                this.nowPage=1;
            }
            this.getPagaData(this.nowPage);
        },
        fnNextPage(){
            this.nowPage=this.nowPage+1;
            if(this.nowPage>this.pageCount){
                this.nowPage=1;
            }
            this.getPagaData(this.nowPage);
        }
    }
});