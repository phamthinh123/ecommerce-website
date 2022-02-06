import { Field, Form, Formik, useFormik } from "formik";
import * as Yup from "yup";
import React from "react";
import "./styles.scss";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { signUpByEmail } from "../../redux/User/user.action";
const phoneRegExp =
  /(([03+[2-9]|05+[6|8|9]|07+[0|6|7|8|9]|08+[1-9]|09+[1-4|6-9]]){3})+[0-9]{7}\b/g;
const SignInSchema = Yup.object().shape({
  name: Yup.string("Vui lòng nhập tên !")
    .min(3, "Tên phải ít nhất 3 kí tự")
    .required("Vui lòng điền tên"),
  phone: Yup.string("Vui lòng nhập số điện thoại !")
    .required("Vui lòng điền số điện thoại")
    .matches(phoneRegExp, "Số điện thoại không hợp lệ"),
  email: Yup.string("Vui lòng nhập email !")
    .email("Vui lòng nhập lại email hợp lệ !")
    .required("Vui lòng điền email !"),
  password: Yup.string("Vui lòng nhập mật khẩu !")
    .min(6, "Mật khẩu phải tối thiểu 6 ký tự !")
    .required("Vui lòng điền mật khẩu !"),
  confirmPassword: Yup.string("Vui lòng nhập mật khẩu !")
    .min(6, "Mật khẩu phải tối thiểu 6 ký tự !")

    .oneOf([Yup.ref("password"), null], "Mật khẩu không khớp")
    .required("Vui lòng điền mật khẩu !"),
});
function SignUp(props) {
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      confirmPassword: "",
      name: "",
      phone: "",
    },
    validationSchema: SignInSchema,
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: (values) => {
      dispatch(
        signUpByEmail({
          email: values.email,
          password: values.password,
          confirmPassword: values.confirmPassword,
          name: values.name,
          phone: values.phone,
        })
      );
      navigate("/login");
    },
  });
  return (
    <div className="signUp">
      <div className="signUpForm">
        <form onSubmit={formik.handleSubmit} className="form">
          <h2 className="form__title">Đăng kí</h2>
          <input
            id="name"
            name="name"
            className="form__name"
            onChange={formik.handleChange}
            value={formik.values.name}
            placeholder="Họ tên"
          />
          {formik.errors.name && (
            <div className="form__error">{formik.errors.name}</div>
          )}
          <input
            id="phone"
            name="phone"
            className="form__phone"
            onChange={formik.handleChange}
            value={formik.values.phone}
            placeholder="Số điện thoại"
          />
          {formik.errors.phone && (
            <div className="form__error">{formik.errors.phone}</div>
          )}
          <input
            id="email"
            name="email"
            className="form__email"
            onChange={formik.handleChange}
            value={formik.values.email}
            placeholder="Địa chỉ email"
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

          <input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            className="form__confirmPassword"
            onChange={formik.handleChange}
            value={formik.values.confirmPassword}
            placeholder="Nhập lại mật khẩu"
          />
          {formik.errors.confirmPassword && (
            <div className="form__error">{formik.errors.confirmPassword}</div>
          )}
          <span className="form__desc">
            Your personal data will be used to support your experience
            throughout this website, to manage access to your account, and for
            other purposes described in our chính sách riêng tư.
          </span>
          <button
            type="submit"
            disabled={formik.isSubmitting}
            className="form__button"
          >
            Đăng kí
          </button>
        </form>
      </div>
      <div className="signInNav">
        <h2 className="title">Đăng nhập</h2>
        <span className="desc">
          Registering for this site allows you to access your order status and
          history. Just fill in the fields below, and we'll get a new account
          set up for you in no time. We will only ask you for information
          necessary to make the purchase process faster and easier.
        </span>
        <Link to="/login" className="button">
          Đăng nhập
        </Link>
      </div>
    </div>
  );
}

export default SignUp;
