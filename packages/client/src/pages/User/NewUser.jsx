import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button, Form } from 'react-bootstrap';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { popupSnack } from '../../utils/sharedComponents.js';
import { RoleService } from '../../services/RoleService';
import '../../scss/formStyles.scss';
import { UserService } from '../../services/UserService';

export const NewUser = () => {
  const formSchema = Yup.object().shape({
    account_type: Yup.string()
      .required(`This field is mandatory`),
    confirmPwd: Yup.string()
      .required(`This field is mandatory`)
      .oneOf([ Yup.ref(`password`) ], `Passwords must match`),
    email: Yup.string()
      .required(`This field is mandatory`)
      .email(`Must be valid email address`),
    password: Yup.string()
      .required(`This field is mandatory`)
      .min(3, `Must be at least 3 char long`),
    username: Yup.string()
      .required(`This field is mandatory`)
      .min(5, `Must be at least 5 characters long`)
      .max(50, `Must not be longer than 50 characters`),
  });
  const formOptions = { resolver: yupResolver(formSchema) };
  const { formState, handleSubmit, register, reset, trigger, watch } = useForm(formOptions);
  const { errors } = formState;
  const onSubmit = async (data) => {
    await UserService.createUser(data);
    reset();
    popupSnack();
  };

  const [ roleList, setRoleList ] = useState([]);

  const watch_user = watch(`username`);
  const watch_email = watch(`email`);
  const watch_pwd = watch(`password`);
  const watch_cfPwd = watch(`confirmPwd`);

  useEffect(() => {
    if (watch_user) {
      trigger(`username`);
    }
  }, [ watch_user ]);

  useEffect(() => {
    if (watch_email) {
      trigger(`email`);
    }
  }, [ watch_email ]);

  useEffect(() => {
    if (watch_pwd) {
      trigger(`password`);
    }
    if (watch_cfPwd) {
      trigger(`confirmPwd`);
    }
  }, [ watch_pwd ]);

  useEffect(() => {
    if (watch_cfPwd) {
      trigger(`confirmPwd`);
    }
  }, [ watch_cfPwd ]);

  useEffect(() => {
    const fetchRoles = async () => {
      setRoleList(await RoleService.getList());
    };
    fetchRoles();
  }, []);

  return <Form onSubmit={handleSubmit(onSubmit)}>
    <div id="snackbar">Successfully submitted!</div>
    <div className="formTitle">
      <h1>Create New User</h1>
      <hr />

      <div className="formSection" style={{ flexDirection: `column` }}>
        <h4 style={{ textDecorationLine: `underline` }}>User Info</h4>

        <div className="response" style={{ width: `100%` }}>
          <label htmlFor="username">Username</label>
          <input
            name="username"
            type="text"
            {...register(`username`)}
            className={`form-control ${errors.username ? `is-invalid` : ``}`}
          />
          <div className="invalid-feedback">{errors.username?.message}</div>

          <label htmlFor="email">Email</label>
          <input
            name="email"
            type="text"
            {...register(`email`)}
            className={`form-control ${errors.email ? `is-invalid` : ``}`}
          />
          <div className="invalid-feedback">{errors.email?.message}</div>
          <label htmlFor="account_type">Account Role:</label>
          <select name="account_type" defaultValue={0} {...register(`account_type`)}
            className={`form-control ${errors.account_type ? `is-invalid` : ``}`}>
            <option value="" hidden>Select Role. . .</option>
            {roleList.map((value) =>
              <option value={value.id} key={value.id}>
                {value.account_title}
              </option>)}
          </select>
          <div className="invalid-feedback">{errors.confirmPwd?.message}</div>
        </div>
      </div>

      <div className="formSection" style={{ flexDirection: `column` }}>
        <h4 style={{ textDecorationLine: `underline` }}>Password</h4>

        <div className="response" style={{ width: `100%` }}>
          <label htmlFor="password">Password</label>
          <input
            name="password"
            type="password"
            {...register(`password`)}
            className={`form-control ${errors.password ? `is-invalid` : ``}`}
          />
          <div className="invalid-feedback">{errors.password?.message}</div>

          <label htmlFor="confirmPwd">Confirm Password</label>
          <input
            name="confirmPwd"
            type="password"
            {...register(`confirmPwd`)}
            className={`form-control ${errors.confirmPwd ? `is-invalid` : ``}`}
          />
          <div className="invalid-feedback">{errors.confirmPwd?.message}</div>
        </div>
      </div>

      <div className="formSection" />
      <div className="mt-3">
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </div>
    </div>
  </Form>;

};
