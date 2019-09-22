import React, { FunctionComponent, useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginUser } from '../domain/store';

import validator from 'validator';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormHelperText from '@material-ui/core/FormHelperText';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import { SERVER } from '../config';

import RegisterApiError from '../types/RegisterApiError';

type DialogProps = {
  open: boolean;
  handleClose: VoidFunction;
};

type RegisterForm = {
  email: string;
  password: string;
  confirmPassword: string;
};

const useUser = () => {
  const dispatch = useDispatch();
  const login = (email, jwt) => {
    dispatch(loginUser(email, jwt));
  };

  return { login };
};

const RegisterDialog: FunctionComponent<DialogProps> = ({
  open,
  handleClose
}) => {
  const { login } = useUser();

  const [errors, setErrors] = useState<RegisterApiError>({});

  const initialForm: RegisterForm = {
    email: '',
    password: '',
    confirmPassword: ''
  };
  const [form, setForm] = useState<RegisterForm>(initialForm);

  const handleChange = event => {
    const { name, value } = event.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async event => {
    event.preventDefault();

    const res = await fetch(`${SERVER}/api/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(form)
    });

    if (res.status === 400) {
      setErrors(await res.json());
      return;
    }

    if (res.status !== 201) {
      const serverError = await res.text();
      console.log('Server Error', serverError);
      setErrors({
        message: `Unexpected error. Please try again later.`
      });
      return;
    }

    const user = await res.json();
    login(user.email, user.jwt);

    setForm(initialForm);
    handleClose();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
    >
      <form onSubmit={handleSubmit}>
        <DialogTitle id="form-dialog-title">Create Account</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To create a new account in CloudPass, please enter your email
            address and password.
          </DialogContentText>
          {errors.message && (
            <FormHelperText error>{errors.message}</FormHelperText>
          )}

          <TextField
            autoFocus
            margin="dense"
            name="email"
            label="Email Address"
            type="email"
            value={form.email}
            onChange={handleChange}
            fullWidth
            required
            error={!!errors.email}
          />
          {errors.email && (
            <FormHelperText error>{errors.email}</FormHelperText>
          )}

          <TextField
            margin="dense"
            name="password"
            label="Password"
            type="password"
            value={form.password}
            onChange={handleChange}
            fullWidth
            required
            error={!!errors.password}
          />
          {errors.password && (
            <FormHelperText error>{errors.password}</FormHelperText>
          )}

          <TextField
            margin="dense"
            name="confirmPassword"
            label="Confirm Password"
            type="password"
            value={form.confirmPassword}
            onChange={handleChange}
            fullWidth
            required
            error={!!errors.confirmPassword}
          />
          {errors.confirmPassword && (
            <FormHelperText error>{errors.confirmPassword}</FormHelperText>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>
          <Button type="submit" variant="contained" color="secondary">
            Create Account
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default RegisterDialog;
