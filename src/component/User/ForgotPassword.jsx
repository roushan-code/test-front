import React, { Fragment,  useState, useEffect } from "react";
import "./ForgotPassword.css";
import Loader from "../layout/Loader/loader";
import { clearErrors, forgotPassword } from "../../actions/userAction";
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import { useDispatch, useSelector } from "react-redux";
import { toast } from 'react-toastify';
import Metadata from "../layout/Metadata";


const ForgotPassword = () => {
    const dispatch = useDispatch();
  
    const { error, message, loading } = useSelector(
      (state) => state.forgotPassword
    );
  
    const [email, setEmail] = useState("");
  
    const forgotPasswordSubmit = (e) => {
      e.preventDefault();
  
      const myForm = new FormData();
  
      myForm.set("email", email);
      dispatch(forgotPassword(myForm));
    };
  
    useEffect(() => {
      if (error) {
        toast.error(error);
        dispatch(clearErrors());
      }
  
      if (message) {
        toast.success(message);
      }
    }, [dispatch, error, toast, message]);
  
    return (
      <Fragment>
        {loading ? (
          <Loader />
        ) : (
          <Fragment>
            <Metadata title="Forgot Password" />
            <div className="forgotPasswordContainer">
              <div className="forgotPasswordBox">
                <h2 className="forgotPasswordHeading">Forgot Password</h2>
  
                <form
                  className="forgotPasswordForm"
                  onSubmit={forgotPasswordSubmit}
                >
                  <div className="forgotPasswordEmail">
                    <MailOutlineIcon />
                    <input
                      type="email"
                      placeholder="Email"
                      required
                      name="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
  
                  <input
                    type="submit"
                    value="Send"
                    className="forgotPasswordBtn"
                  />
                </form>
              </div>
            </div>
          </Fragment>
        )}
      </Fragment>
    );
  };
  
  export default ForgotPassword;
  