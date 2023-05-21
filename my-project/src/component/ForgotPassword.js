import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
function ForgotPassword () {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [showError,setShowError]=useState(false);
    const handleLogin = async () => {
        const response = await fetch('http://localhost:3000/forgot', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email }),
          
        })
        .then(res => {
         // console.log(res.status);
          if (res.status === 200) {
            setEmail('');
            setShowError(false);
            setMessage('Message sent successfully.');
            return res.json();
           
          }
          setShowError(true);
          setEmail('');
          setMessage('User not found on the database');
          throw new Error('Validation failed.');
        })
  
        .then(resData => {
          //console.log('resData',resData);
          setMessage('Message sent successfully.');
  
        })
        //console.log("Send request Successfully to backend ");
      
        .catch(err => {
          console.log(err);
          setMessage('Something went wrong. Please try again later.');
        });
    };



    return ( 
        <div class="container" style={{height:'80vh',paddingLeft:'30vw',paddingTop:'15vh'}}>
    <div class="row">
        <div class="row">
            <div class="col-md-4 col-md-offset-4">
                <div class="panel panel-default">
                    <div class="panel-body">
                        <div class="text-center">
                          <h3><i class="fa fa-lock fa-4x"></i></h3>
                          <h2 class="text-center">Forgot Password?</h2>
                          <p>You can reset your password here.</p>
                            <div class="panel-body">
                              
                              <form class="form" onSubmit={handleLogin}>
                                <fieldset>
                                  <div class="form-group">
                                    <div class="input-group">
                                      <span class="input-group-addon"><i class="glyphicon glyphicon-envelope color-blue"></i></span>
                                      
                                      <input id="emailInput" placeholder="email address" class="form-control" type="email" style={{borderRadius:'10px',border:'2px solid black'}} oninvalid="setCustomValidity('Please enter a valid email address!')" value={email} onChange={(e) => setEmail(e.target.value)}  required=""/>
                                    </div>
                                  </div>
                                 
                                  <div class="form-group" style={{paddingTop:'2vh'}}>
                                  <button className="btn btn-dark btn-lg btn-block" type="button" onClick={handleLogin}>Get the Password</button>
                                  </div>  
                                </fieldset>
                              </form>
                              
                            </div>

                            {message && !showError && <p style={{color:'green'}}>Message Sent Successfully!</p>}
                            {message && showError && <p style={{color:'red'}}>Not find the User!</p>}
                            <Link to="/login">
                             <p className="small text-muted" style={{paddingTop:'2.5vh'}}>Go to Login Page</p>
                          </Link>
                        </div>
                       
                    </div>
                </div>
            </div>
        </div>
    </div>
   </div>
 );
}

export default ForgotPassword;