import { Field, Form, Formik, useFormik } from "formik";
import * as Yup from "yup";
import React from "react";
import "./styles.scss";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signInByEmail, signInByGoogle } from "../../redux/User/user.action";
const SignInSchema = Yup.object().shape({
  email: Yup.string("Vui lòng nhập email !")
    .email("Vui lòng nhập lại email hợp lệ !")
    .required("Vui lòng điền email !"),
  password: Yup.string("Vui lòng nhập mật khẩu !")
    .min(6, "Mật khẩu phải tối thiểu 6 ký tự !")
    .required("Vui lòng điền mật khẩu !"),
});
function SignIn(props) {
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const currentUser = useSelector((state) => state.user.currentUser);
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: SignInSchema,
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: async (values, { resetForm }) => {
      dispatch(signInByEmail(values.email, values.password));
      resetForm();
      // navigate("/");
    },
  });
  const signInGoogle = () => {
    dispatch(signInByGoogle());
  };
  return (
    <div className="signIn">
      <div className="signInForm">
        <form onSubmit={formik.handleSubmit} className="form">
          <h2 className="form__title">Đăng nhập</h2>
          <input
            id="email"
            name="email"
            className="form__email"
            onChange={formik.handleChange}
            value={formik.values.email}
            placeholder="Email đăng nhập"
          />
          {formik.errors.email && (
            <div className="form__error">{formik.errors.email}</div>
          )}

          <input
            id="password"
            name="password"
            type="password"
            className="form__password"
            onChange={formik.handleChange}
            value={formik.values.password}
            placeholder="Mật khẩu"
          />
          {formik.errors.password && (
            <div className="form__error">{formik.errors.password}</div>
          )}

          <button
            type="submit"
            disabled={formik.isSubmitting}
            className="form__button"
          >
            Đăng nhập
          </button>
          <button
            disabled={formik.isSubmitting}
            className="form__button2"
            onClick={signInGoogle}
          >
            Đăng nhập với google
          </button>
        </form>
      </div>

      <div className="signUpNav">
        <h2 className="title">Đăng kí</h2>
        <span className="desc">
          Registering for this site allows you to access your order status and
          history. Just fill in the fields below, and we'll get a new account
          set up for you in no time. We will only ask you for information
          necessary to make the purchase process faster and easier.
        </span>
        <Link to="/registration" className="button">
          Đăng kí
        </Link>
      </div>
    </div>
  );
}

export default SignIn;
