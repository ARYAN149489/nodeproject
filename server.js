var express = require("express");
var fileuploader=require("express-fileupload")
let app=express();
var mysql2=require("mysql2");
var nodemailer = require("nodemailer");
let transporter = nodemailer.createTransport({
    service: 'gmail', // Use your email provider
    auth: {
      user: 'aryankansal113@gmail.com',
      pass: 'tnwr clxn owxx bsed' //(for Gmail App Password or an App-Specific Password)
    }
});

app.listen(7485,function()
{
    console.log("Server Started ....... at this host");
})

app.use(fileuploader());
app.use(express.static("public"));
app.use(express.urlencoded("true"));
app.use(express.urlencoded({ extended: true }));
// This is for local host without hosting
// let config = {
//      host :"127.0.0.1",
//      user:"root",
//      password:"Aryan@113",
//      database:"project",
//      dateStrings:true
//  }
let config = {
     host :"bd8axpqcfloislqnb7lt-mysql.services.clever-cloud.com",
     user:"umgkq7nq0vn64qyk",
     password:"BLlXPv5lv6ZWibaxYrEL",
     database:"bd8axpqcfloislqnb7lt",
     dateStrings:true,
     //next two are imporatnt for live hosting
     keepAliveInitialDelay: 10000,
     enableKeepAlive: true
 }
 var mysql = mysql2.createConnection(config);

 mysql.connect(function(err)
 {
     if(err==null)
         console.log("Connected to Database Successfully");
     else
     console.log(err.message+"  ########");
 })

/////////////////////////////////////////////////////
app.get("/",function(req,resp)
{
    let path = __dirname+"/public/index.html";
    resp.sendFile(path);
})

app.post("/signup-details",function(req,resp)
 {
    var status=1;
    mysql.query("insert into users values(?,?,?,?)",[req.body.txtEmail,req.body.txtPwd,req.body.type,status],function(err)
    {
         if(err==null)
             resp.redirect("redirect.html");
         else
             resp.send(err.message);
    })
 })

app.get("/check-login-details",function(req,resp)
{
    let email= req.query.txtemail;
    let pwd = req.query.txtpwd;
    // console.log(email+"  "+pwd);
    mysql.query("select * from users where email=? and pwd=?",[email,pwd],function(err,result){

        if(err!=null)
        {
            resp.send(err.message);
            // console.log(err.message);
            return;
        }
        if(result.length==0)
        {
            resp.send("Invalid credentials... Please try again");
            //console.log("Invalid credentials... Please try again");
            return;
        }
        if(result[0].status==0){
            resp.send("u R blocked");
        }
        else{
            resp.send(result[0].utype);
            // console.log(resultJsonAry[0].utype);
            return;
        }
        // console.log(resultJsonAry);
        // resp.send(resultJsonAry); 
    })

})


app.get("/infl-dashboard",function(req,resp){
    resp.sendFile(__dirname+"/public/infl-dash.html");
})

app.get("/infl-profile",function(req,resp){
    resp.sendFile(__dirname+"/public/inf-profile.html");
})

app.post("/idata-save",function(req,resp){
    // console.log("Hello");
    let fileName="";
    if(req.files!=null)
        {
            fileName=req.files.ppic.name;
            let path=__dirname+"/public/upload/"+fileName;
            req.files.ppic.mv(path);
        }
        else
        {
            fileName=req.body.hdn;
        }
    mysql.query("insert into infprofile values(?,?,?,?,?,?,?,?,?,?,?,?)",[req.body.iemail,req.body.txtName,req.body.txtGender,req.body.txtDob,req.body.txtAdd,req.body.txtCity,req.body.txtContact,req.body.txtField.toString(),req.body.txtInsta,req.body.txtYt,req.body.txtOther,fileName],function(err,result){
        // .trim() can be used with email or something else to make sure that there are no spaces before and after the email or anything 
        if(err==null){
            resp.redirect("redirect.html");
        }
        else{
            resp.send(err.message);
        }
    })
})
app.post("/idata-savee",function(req,resp){
    // console.log("Hello");
    let fileName="";
    if(req.files!=null)
        {
            fileName=req.files.ppic.name;
            let path=__dirname+"/public/upload/"+fileName;
            req.files.ppic.mv(path);
        }
        else
        {
            fileName=req.body.hdn;
        }
    mysql.query("insert into coprofile values(?,?,?,?,?,?,?,?,?)",[req.body.iemail,req.body.txtName,req.body.txtGender,req.body.txtDob,req.body.txtAdd,req.body.txtCity,req.body.txtContact,req.body.txtInsta,fileName],function(err,result){
        // .trim() can be used with email or something else to make sure that there are no spaces before and after the email or anything 
        if(err==null){
            resp.redirect("redirect.html");
        }
        else{
            resp.send(err.message);
        }
    })
})
app.post("/idata-update",function(req,resp){
    // console.log("hello");
    let fileName="";
    if(req.files!=null)
        {
             fileName=req.files.ppic.name;
            let path=__dirname+"/public/upload/"+fileName;
            req.files.ppic.mv(path);
        }
        else
        {
            fileName=req.body.hdn;
        }
        
    //mysql.query("update inprofile values(?,?,?,?,?,?,?,?,?,?,?,?)",[req.body.txtEmail,req.body.txtName,req.body.txtGender,req.body.txtDob,req.body.txtAdd,req.body.txtCity,req.body.txtContact,req.body.txtField.toString(),req.body.txtInsta,req.body.txtYt,req.body.txtOther,fileName],function(err,result){
    mysql.query("update infprofile set address=?, city=?, contact=?, field=?, insta=?, yt=?, other=?, fileName=? where email=? ",[req.body.txtAdd,req.body.txtCity,req.body.txtContact,req.body.txtField.toString(),req.body.txtInsta,req.body.txtYt,req.body.txtOther,fileName,req.body.iemail],function(err,result){
        if(err==null){
            resp.redirect("redirect.html");
        }
        else{
            resp.send(err.message);
        }
    })
})
app.post("/idata-updatee",function(req,resp){
    // console.log("hello");
    let fileName="";
    if(req.files!=null)
        {
            fileName=req.files.ppic.name;
            let path=__dirname+"/public/upload/"+fileName;
            req.files.ppic.mv(path);
        }
        else
        {
            fileName=req.body.hdn;
        }
    //mysql.query("update inprofile values(?,?,?,?,?,?,?,?,?,?,?,?)",[req.body.txtEmail,req.body.txtName,req.body.txtGender,req.body.txtDob,req.body.txtAdd,req.body.txtCity,req.body.txtContact,req.body.txtField.toString(),req.body.txtInsta,req.body.txtYt,req.body.txtOther,fileName],function(err,result){
    mysql.query("update coprofile set address=?, city=?, contact=?, insta=?, fileName=? where email=? ",[req.body.txtAdd,req.body.txtCity,req.body.txtContact,req.body.txtInsta,fileName,req.body.iemail],function(err,result){
        if(err==null){
            resp.redirect("redirect.html");
        }
        else{
            resp.send(err.message);
        }
    })
})
app.get("/find-user-details",function(req,resp){
     
    let iemail=req.query.iemail;
    mysql.query("select * from infprofile where email=?",[iemail],function(err,resultjsonary){

        if(err!=null){
            resp.send(err.message);
            return;
        }
        //console.log(resultjsonary);
     resp.send(resultjsonary);
    })
})
app.get("/find-user-detailss",function(req,resp){
     
    let iemail=req.query.iemail;
    mysql.query("select * from coprofile where email=?",[iemail],function(err,resultjsonary){

        if(err!=null){
            resp.send(err.message);
            return;
        }
        // console.log(resultjsonary);
     resp.send(resultjsonary);
    })
})
app.get("/event-posting-process",function(req,resp){
    let pemail=req.query.btxtemail;
    let name=req.query.btxtname;
    let date=req.query.btxtdate;
    let city=req.query.btxtcity;
    let time=req.query.btime;
    let venue=req.query.btxtvenue;
    //console.log(city);
    mysql.query("insert into event values(null,?,?,?,?,?,?)",[pemail,name,date,time,city,venue],function(err,result){

        if(err!=null){
            resp.send(err.message);
            return;
        }
        if(result.affectedRows>=1){
            resp.send("succesfull");
        }
        else{
            resp.send("not sent");
        }
    })
})

app.get("/pass-change-process",function(req,resp){
    let chemail=req.query.chemail;
    let opwd=req.query.opwd;
    let npwd=req.query.npwd;
    let nPwd=req.query.nPwd;

    if(npwd!=nPwd){
        resp.send("Passwords do not match");
        return;
    }
    mysql.query("select * from users where email=? and pwd=?",[chemail,opwd],function(err,resultJsonAry){
        if(err!=null){
            resp.send(err.message);return;
        }
        if(resultJsonAry.length==0){
            resp.send("Incorrect credentials...");return;
        }
        mysql.query("update users set pwd=? where email=?",[npwd,chemail]);
        resp.send("Changed Successfully..");return;
        
    })
})

app.get("/forget-password",function(req,resp){
    let femail=req.query.femail;
    //########################### Send email using nodemailer to femail
    mysql.query("select pwd from users where email=?",[femail],function(err,result){
        if(err){
            resp.send(err.message);
            return;
        }
        if(result.length==0){
            resp.send("Email does not exist.");return;
        }
        //let passwordd=result[0];
        let mailOptions = {
            from: 'aryankansal113@gmail.com', // Sender email
            to: femail, // List of recipients
            subject: 'Password Change', // Subject line
            text: 'You have forgotton your password! Here is your new password:- "'+result[0].pwd+'" Please do not forget it.', // Plain text body
            //html: '<p>Hello from <b>Node.js</b>!</p>' // HTML body (optional)
          };
          transporter.sendMail(mailOptions,function(err){
            if (err) {
              console.log('Error occurred:', err.message);
              resp.send(err.message);
              return;
            }
            // console.log('Email sent successfully!');
            resp.send("Email sent successfully!");
          });
    })
    
})
app.get("/admin",function(req,resp){
    resp.redirect("adminpage.html");
})
app.post("/admin-dashboard",function(req,resp){
    resp.sendFile(__dirname+"/public/admin-dash.html");
})
app.get("/admin-users",function(req,resp){
    resp.sendFile(__dirname+"/public//admin-users.html");
})
app.get("/fetch-all-user",function(req,resp){
    mysql.query("select * from users",function(err,result){
        if(err){
            resp.send(err.message);
            return;
        }
        resp.send(result);
    })
})
app.get("/delete-one",function(req,resp){
    // console.log("Hello");
    mysql.query("delete from users where email=?",[req.query.email],function(err,resultJsonAry){
        if(err){
            resp.send(err.message);
            return;
        }
        resp.send("Deleted");
    })
    // mysql.query("delete from inprofile where email=?"[req.query.email],function(err){
    //     if(err){
    //         resp.send(err.message);
    //         return;
    //     }
    // })
})
app.get("/block-one",function(req,resp){
    mysql.query("update users set status=0 where email=?",[req.query.email],function(err,result){
        if(err){
            resp.send(err.message);
            return;
        }
        resp.send("Blocked");
    })
})
app.get("/resume-one",function(req,resp){
    mysql.query("update users set status=1 where email=?",[req.query.email],function(err,result){
        if(err){
            resp.send(err.message);
            return;
        }
        resp.send("Resumed");
    })
})
app.get("/all-inf-console",function(req,resp){
    resp.sendFile(__dirname+"/public/admin-all-influ.html");
})
app.get("/fetch-all-profile",function(req,resp){
    mysql.query("select * from inprofile",function(err,result){
        if(err){
            resp.send(err.message);
            return;
        }
        resp.send(result);
    })
})
app.get("/infl-events",function(req,resp){
    resp.sendFile(__dirname+"/public/infl-events-page.html");
})
app.get("/fetch-all-events",function(req,resp){
    //console.log("Hello");
    mysql.query("select * from event",function(err,result){
        if(err){
            resp.send(err.message);
            return;
        }
        //console.log("fegu");
        resp.send(result);
    })
})
app.get("/delete-event",function(req,resp){
    mysql.query("delete from event where rid=?",[req.query.rid],function(err,resultJsonAry){
        if(err){
            resp.send(err.message);
            return;
        }
        resp.send("Deleted");
    })
})
app.get("/infl-finder",function(req,resp){
    resp.sendFile(__dirname+"/public/infl-finder.html");
})
app.get("/find-influ",function(req,resp){
    // console.log("Hello");
    mysql.query("select distinct city from infprofile where field like ?",["%"+req.query.fields+"%"],function(err,result){
        if(err!=null)
            {
                resp.send(err.message);
                return;
            }
       resp.send(result);
    })
})
// app.get("/do-find-influe", function(req, resp) {
    
//     let fields = req.query.fields || "";
//     let city = req.query.city || "";
//     let pname = req.query.pname || "";
//     console.log(fields+" "+city+" "+pname);

//     // Check for different combinations of query parameters
//     if(fields!=="" && city!=="" && pname!=="") {
//         mysql.query("SELECT * FROM infprofile WHERE field LIKE ? AND city = ? AND iname LIKE ?", ["%" + fields + "%", city, "%" + pname + "%"], function(err, resultJsonAry) {
//             if (err) {
//                 resp.send(err.message);
//             } else {
//                 resp.send(resultJsonAry);
//             }
//         });
//         return;
//     }
//     if (city !== "" && fields!=="") {
//         mysql.query("SELECT * FROM infprofile WHERE field LIKE ? AND city = ?", ["%" + fields + "%", city], function(err, resultJsonAry) {
//             if (err) {
//                 resp.send(err.message);
//             } else {
//                 resp.send(resultJsonAry);
//             }
//         });
//         return;
//     } 
//     if(pname !=="" && fields !==""){
//         mysql.query("SELECT * FROM infprofile WHERE field LIKE ? AND iname like = ?", ["%" + fields + "%", "%" + pname + "%"], function(err, resultJsonAry) {
//             if (err) {
//                 resp.send(err.message);
//             } else {
//                 resp.send(resultJsonAry);
//             }
//         });
//         return;
//     }
//     if (pname!=="") {
//         // If only pname provided, search by pname
//         mysql.query("SELECT * FROM infprofile WHERE iname LIKE ?", ["%" + pname + "%"], function(err, resultJsonAry) {
//             if (err) {
//                 resp.send(err.message);
//             } else {
//                 resp.send(resultJsonAry);
//             }
//         });
//         return;
//     }
//     if (fields!=="") {
//         // If only fields provided, search by fields
//         mysql.query("SELECT * FROM infprofile WHERE field LIKE ?", ["%" + fields + "%"], function(err, resultJsonAry) {
//             if (err) {
//                 resp.send(err.message);
//             } else {
//                 resp.send(resultJsonAry);
//             }
//         });
//         return;
//     } 
//     else {
//         console.log("Reached");
//         mysql.query("SELECT * FROM infprofile", function(err, resultJsonAry) {
//             console.log("Hello");
//             if (err) {
//                 resp.send(err.message);
                
//             } else {
//                 resp.send(resultJsonAry);
//             }
//             return;
//         });
//     } 
// });
app.get("/do-find-influe", function(req, resp) {
    // Extract query parameters with default values as empty strings
    let fields = req.query.fields || "";
    let city = req.query.city || "";
    let pname = req.query.pname || "";

    // Prepare SQL query parts
    let sql = "SELECT * FROM infprofile";
    let conditions = [];
    let params = [];

    // Build WHERE clause conditions based on provided parameters
    if (fields !== "") {
        conditions.push("field LIKE ?");
        params.push("%" + fields + "%");
    }
    if (city !== "") {
        conditions.push("city = ?");
        params.push(city);
    }
    if (pname !== "") {
        conditions.push("iname LIKE ?");
        params.push("%" + pname + "%");
    }

    // Append WHERE clause if conditions are present
    if (conditions.length > 0) {
        sql += " WHERE " + conditions.join(" AND ");
    }

    // Execute the SQL query with parameters
    mysql.query(sql, params, function(err, resultJsonAry) {
        if (err) {
            resp.status(500).send(err.message);
        } else {
            resp.json(resultJsonAry);
        }
    });
});

app.get("/check-for-save-update",function(req,resp){
    mysql.query("select * from infprofile where email=?",[req.query.iemail],function(err,result){
        if(err!=null)
            {
                resp.send(err.message);
                return;
            }
       resp.send(result);
    })
})
app.get("/check-for-save-updatee",function(req,resp){
    mysql.query("select * from coprofile where email=?",[req.query.iemail],function(err,result){
        if(err!=null)
            {
                resp.send(err.message);
                return;
            }
       resp.send(result);
    })
})
app.get("/send-email-to-contact",function(req,resp){
    let email=req.query.email;
    let mailOptions = {
        from: 'aryankansal113@gmail.com', // Sender email
        to: email, // List of recipients
        subject: 'Collaborator wants to contact you', // Subject line
        text: email+' wants to contact you please reply to him as soon as possible. Regards ', // Plain text body
        //html: '<p>Hello from <b>Node.js</b>!</p>' // HTML body (optional)
      };
      transporter.sendMail(mailOptions,function(err){
        if (err) {
          console.log('Error occurred:', err.message);
          resp.send(err.message);
          return;
        }
        // console.log('Email sent successfully!');
        resp.send("Email sent successfully!");
      });
})