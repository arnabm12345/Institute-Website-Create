import React, { useState, useEffect } from 'react';
import { useNavigate  } from 'react-router-dom';
import { Link } from 'react-router-dom';
const Login = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showError,setShowError]=useState(false);
  const [session,setSession]=useState('2022-2023');
  const [login,setLogin]=useState(false);
  

  const navigate = useNavigate();
const setAutoLogout = milliseconds => {
    setTimeout(() => {
     logoutHandler();
    }, milliseconds);
  };
const  logoutHandler = () => {
    
    localStorage.removeItem('token');
    localStorage.removeItem('expiryDate');
    localStorage.removeItem('userId');
  };

  useEffect(() => {
    
    const token = localStorage.getItem('token');

    if (token ) {
      navigate('/authenticated',
      { state: { session } }); // Redirect to authenticated page if user is already logged in
    }
  }, []);

  const handleLogin = async () => {
      const response = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
        
      })
      .then(res => {
        console.log(res.status);
        if (res.status === 200) {
          setLogin(true);
          return res.json();
          
        }
        setShowError(true);
        setEmail('');
        setPassword('');
        setLogin(false);
        throw new Error('Validation failed.');
      })

      .then(resData => {
        localStorage.setItem('token', resData.token);
        localStorage.setItem('userId', resData.id);
       // console.log('Logged in successfully');
        const remainingMilliseconds = 60 * 60 * 1000;
        const expiryDate = new Date(
          new Date().getTime() + remainingMilliseconds
        );
        localStorage.setItem('expiryDate', expiryDate.toISOString());
        setAutoLogout(remainingMilliseconds);
        navigate('/authenticated', { state: { session } }); // Redirect to authenticated page after successful login

      })
      //console.log("Send request Successfully to backend ");
    
      .catch(err => {
        //console.log(err);
      });
  };

  return (
    <section className="vh-100" style={{backgroundColor: "#9A616D"}}>
  <div className="container py-5 h-100">
    <div className="row d-flex justify-content-center align-items-center h-100">
      <div className="col col-xl-10">
        <div className="card" style={{ borderRadius: '1rem'}}>
          <div className="row g-0">
            <div className="col-md-6 col-lg-5 d-none d-md-block">
              <img src="http://www.nihilium.io/static/media/undraw_unlock_24mb.3896558a.svg"
                alt="login form" className="img-fluid"   style={{ borderRadius: '1rem 0 0 1rem'}}/>
            </div>
            <div className="col-md-6 col-lg-7 d-flex align-items-center">
              <div className="card-body p-4 p-lg-5 text-black">

                <form >

                

                  <h5 className="fw-normal mb-3 pb-3" style={{ letterSpacing:'1px'}} >Sign into your account</h5>

                  
         <label for="session" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select Your Session</label>
            <select id="sessions" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white
             dark:focus:ring-blue-500 dark:focus:border-blue-500" value={session} onChange={(e) => setSession(e.target.value)}>
             
             <option>Session</option>
             <option>2023-2024</option>
             <option>2022-2023</option>
             <option>2021-2022</option>
             </select>

                  <div className="form-outline mb-4" style={{paddingTop:'1.0rem'}}>
                    <input type="email" id="form2Example17" className="form-control form-control-lg" value={email} onChange={(e) => setEmail(e.target.value)}  />
                    <label className="form-label" htmlFor="form2Example17">Username</label>
                  </div>

                  <div className="form-outline mb-4">
                    <input type="password" id="form2Example27" className="form-control form-control-lg" value={password} onChange={(e) => setPassword(e.target.value)} />
                    <label className="form-label" htmlFor="form2Example27">Password</label>
                  </div>
             { showError && <p style={{color:'red'}}>Invalid Username or Password!</p>}
                  <div className="pt-1 mb-4">
                    <button className="btn btn-dark btn-lg btn-block" type="button" onClick={handleLogin}>Login</button>
                  </div>
                  <Link to="/forgot-password">
                  <p className="small text-muted" href="#!">Forgot password?</p>
                  </Link>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
  );
};

export default Login;
