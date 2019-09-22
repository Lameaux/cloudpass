import { NextApiRequest, NextApiResponse } from 'next';
import validator from 'validator';
import bcrypt from 'bcrypt';

import RegisterApiError from '../../types/RegisterApiError';
import UserModel from '../../domain/UserModel';
import WebToken from '../../domain/WebToken';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    res.status(405).send('Method not allowed');
    return;
  }

  const errors: RegisterApiError = {};

  const email = req.body.email || '';
  if (!validator.isEmail(email)) {
    errors['email'] = 'Invalid Email address';
  }

  const password = req.body.password || '';
  if (!validator.isLength(password, { min: 6 })) {
    errors['password'] = 'Password should be at least 6 characters';
  }

  if (password !== req.body.confirmPassword) {
    errors['confirmPassword'] = 'Passwords do not match';
  }

  const existingUser = await UserModel.findOne({ email });
  if (existingUser !== null) {
    errors['email'] = 'Email address already exists';
  }

  if (Object.keys(errors).length > 0) {
    res.status(400).json(errors);
    return;
  }

  const passwordHash = await bcrypt.hash(password, 10);

  const newUser = new UserModel({ email, passwordHash });
  await newUser.save();

  const jwt = WebToken.createJwt(email);

  res.status(201).json({
    email,
    jwt
  });
};
