import React, { useEffect, useState } from "react";
import "./Header.css";
import logo from "../../assets/logo.svg";
import Button from "@material-ui/core/Button";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import FormControl from '@material-ui/core/FormControl';
import Modal from 'react-modal';

export default function Header(props) {
   const [buttonname, setbuttonname] = useState('Login');
   const [modalIsOpen, setmodalIsOpen] = useState(false);
   const [isshown, setissshown] = useState('bookshowbutton');
   const [value, setValue] = useState(0);

   //Setting buttonname and to show/hide the bookshow button
   useEffect(() => {
      if ((window.location.pathname.indexOf("/movie/")) == 0) {
         setissshown('clickedbookshowbutton');
      }

      if (window.sessionStorage.getItem("access-token") !== null) {
         setbuttonname('Logout');
      }
   }, [props]);

   //To handle login and register tabs
   const handleTabs = (e, val) => {
      setValue(val);
   }

   //To handle login and logout functionalities
   const logout = () => {
      setmodalIsOpen(false);
      window.sessionStorage.setItem("access-token", null);
      setbuttonname('Login');
   }

   const login = () => {
      setmodalIsOpen(true);
   }

   const loginset = () => {
      setmodalIsOpen(false);
      setbuttonname('Logout');
   }

   // To navigate to login or nbookshow page on onclick of bookshow button
   const handelShowBook = () => {
      ((isshown === 'clickedbookshowbutton') ? ((buttonname === 'Login') ? setmodalIsOpen(true) : (window.location.href = "/bookshow/id/" + props.propsdata.match.params.id)) : setissshown('bookshowbutton'))
   }

   return (
      <div className="headerpage">
         <img src={logo} alt="logo-img" className="rotate" />
         <Button
            variant="contained"
            className="loginoroutbutton"
            color="default"
            onClick={() => (buttonname === 'Login') ? login() : logout()}
         >
            {buttonname}
         </Button>

         <Button
            variant="contained"
            className={isshown}
            color="primary"
            onClick={() => handelShowBook()}
         >
            Book Show
         </Button>

         <Modal className="modalcontainer" ariaHideApp={false} isOpen={modalIsOpen} onRequestClose={() => setmodalIsOpen(false)}>
            <Tabs className="tabscontainer" value={value} onChange={handleTabs}>
               <Tab label="Login" />
               <Tab label="Register" />
            </Tabs>
            <Tablepanel value={value} index={0} propsdata={props} loggedinsuccess={loginset}></Tablepanel>
         </Modal>

      </div>
   );
};

function Tablepanel(props) {
   const { value, propsdata, loggedinsuccess } = props;
   const handleChange = () => {
      props.loggedinsuccess();
   }
   if (value === 0) {
      return <Login propsdata={propsdata} onloggedin={handleChange}></Login>
   }
   else {
      return <Register propsdata={propsdata}></Register>
   }
}

function Login(props) {
   const [userName, set_userName] = useState("");
   const [password, set_password] = useState("");
   const [success, setSuccess] = useState("");
   const [visiblecheck, setvisibleCheck] = useState("hidden");
   const onLogin = async (e) => {
      e.preventDefault();
      let param = window.btoa(`${userName}:${password}`);

      try {
         const rawresponse = await fetch(props.propsdata.propsdata.baseUrl + "/auth/login/", {
            method: "POST",
            headers: {
               "Content-Type": "application/json",
               "Cache-Control": "no-cache",
               authorization: `Basic ${param}`
            }
         });

         const result = await rawresponse.json();
         if (rawresponse.ok) {
            setSuccess('Login Successful');
            setvisibleCheck("visible");
            window.sessionStorage.setItem("access-token", rawresponse.headers.get('access-token'));
            props.onloggedin();
         }
         else {
            setSuccess('Login failed. Please check entered details!');
            setvisibleCheck("visible");
            const er = new Error();
            er.message = result.message || 'something went wrong';
         }

      } catch (er) {
         console.log(er.message);
      }
   }

   return (
      <ValidatorForm className='logincontainer' onSubmit={onLogin}>
         <FormControl>
            <TextValidator
               margin="normal"
               id="userName"
               label="User Name*"
               name="userName"
               autoComplete="userName"
               autoFocus
               value={userName}
               onChange={e => {
                  set_userName(e.target.value);
                  setvisibleCheck("hidden");
               }}
               validators={['required']}
               errorMessages={['required']}
            />
         </FormControl>
         <br />
         <FormControl>
            <TextValidator
               margin="normal"
               name="password"
               label="Password*"
               type="password"
               id="password"
               value={password}
               onChange={(e) => {
                  set_password(e.target.value);
                  setvisibleCheck("hidden");
               }}
               validators={['required']}
               errorMessages={['required']}
            />
         </FormControl>
         <br />
         <br />
         <br />
         <span className='msg' style={{ visibility: visiblecheck }}>{success}</span>
         <br /><br />
                   &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
         <Button
            type="submit"
            variant="contained"
            color="primary"
         >
            Login
                    </Button>
         <br /><br />
      </ValidatorForm>

   )
}


function Register(props) {
   const [firstName, setFirstName] = useState("");
   const [lastName, setLastName] = useState("");
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
   const [phoneNumber, setPhoneNumber] = useState("");
   const [success, setSuccess] = useState("");
   const [visiblecheck, setvisibleCheck] = useState("hidden");

   const onFormSubmitted = async (e) => {
      e.preventDefault();
      let data = JSON.stringify({
         "email_address": email,
         "first_name": firstName,
         "last_name": lastName,
         "mobile_number": phoneNumber,
         "password": password
      });

      try {

         const rawresponse = await fetch(props.propsdata.propsdata.baseUrl + "signup/", {
            method: "POST",
            headers: {
               "Content-Type": "application/json",
               "Cache-Control": "no-cache",
            },
            body: data,
         });

         const result = await rawresponse.json();
         if (rawresponse.ok) {
            setSuccess('Registration Successful. Please login!');
            setvisibleCheck("visible");
         }
         else {
            setSuccess('Registration failed. Please check entered details!');
            setvisibleCheck("visible");
            const er = new Error();
            er.message = result.message || 'something went wrong';
         }

      } catch (er) {
         console.log(er.message);
      }
   }

   const onsetFirstName = (e) => {
      setFirstName(e.target.value);
      setvisibleCheck("hidden");
   }

   const onsetLastName = (e) => {
      setLastName(e.target.value);
      setvisibleCheck("hidden");
   }

   const onsetPassword = (e) => {
      setPassword(e.target.value);
      setvisibleCheck("hidden");
   }

   const onsetEmail = (e) => {
      setEmail(e.target.value);
      setvisibleCheck("hidden");
   }

   const onsetPhoneNumber = (e) => {
      setPhoneNumber(e.target.value);
      setvisibleCheck("hidden");
   }

   return (
      <React.Fragment>
         <div>
            <ValidatorForm className='registercontainer' onSubmit={onFormSubmitted}>
               <FormControl>
                  <TextValidator
                     name="firstName"
                     value={firstName}
                     onChange={e => onsetFirstName(e)}
                     id="firstName"
                     label="First Name*"
                     autoFocus
                     validators={['required']}
                     errorMessages={['required']}
                  />
               </FormControl>
               <br />
               <FormControl>
                  <TextValidator
                     value={lastName}
                     onChange={e => onsetLastName(e)}
                     id="lastName"
                     label="Last Name*"
                     name="lastName"
                     autoComplete="lname"
                     validators={['required']}
                     errorMessages={['required']}
                  />
               </FormControl>
               <br />
               <FormControl>
                  <TextValidator
                     value={password}
                     onChange={e => onsetPassword(e)}
                     name="password"
                     label="Password*"
                     type="password"
                     id="password"
                     validators={['required']}
                     errorMessages={['required']}
                  />
               </FormControl>
               <br />
               <FormControl>
                  <TextValidator
                     value={email}
                     onChange={e => onsetEmail(e)}
                     id="email"
                     label="Email*"
                     name="email"
                     autoComplete="email"
                     validators={['required', 'isEmail']}
                     errorMessages={['required', 'Email is not valid']}
                  />
               </FormControl>
               <br />
               <FormControl>
                  <TextValidator
                     value={phoneNumber}
                     onChange={e => onsetPhoneNumber(e)}
                     name="mobile"
                     label="Contact No.*"
                     id="mobile"
                     type="number"
                     validators={['required']}
                     errorMessages={['required']}
                  />
               </FormControl>
               <br />
               <br />
               <span className='msg' style={{ visibility: visiblecheck }}>{success}</span>
               <br /><br />
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                     <Button
                  type="submit"
                  variant="contained"
                  color="primary"
               >
                  Register
                   </Button>
               <br /><br />

            </ValidatorForm>
         </div>
      </React.Fragment>

   )
}

