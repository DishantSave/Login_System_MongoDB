var express=require("express")
var mongoose=require("mongoose")
var bodyParser=require("body-parser")
const app=express()
app.use(bodyParser.json())
app.use(express.static('public'))
app.use(bodyParser.urlencoded({
    extended:true
}))
mongoose.connect("mongodb://localhost:27017/testdb",{
    useNewUrlParser:true,
    useUnifiedTopology:true
})

var db=mongoose.connection
db.on('error',()=>console.log('connection error'))
db.once('open',()=>
console.log("connected to db")
)
app.post('/sign_up',(req,res)=>{
    var sn=req.body.sname
    var co=req.body.course
    var age=req.body.age
    var em=req.body.email
    var data={
        "Student name":sn,
        "Course":co,
        "Age":age,
        "Email Address":em,
    }
    db.collection('studentdetails').insertOne(data,(err,collection)=>{
        if(err){
            throw err;
        }
        console.log("Document has been inserted")
    })
    return res.redirect('login.html')
})
app.get('/',(req,res)=>{
    return res.redirect('index.html')
}).listen(3000)
console.log("server started..")