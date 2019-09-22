import { NextApiRequest, NextApiResponse } from 'next';
import validator from 'validator';
import bcrypt from 'bcrypt';

import UserModel from '../../domain/UserModel';
import WebToken from '../../domain/WebToken';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    res.status(405).send('Method not allowed');
    return;
  }

  const handleLoginApiError = () => {
    res
      .status(400)
      .json({ message: 'Login failed. Invalid email or password.' });
  };

  const email = req.body.email || '';
  if (!validator.isEmail(email)) {
    return handleLoginApiError();
  }

  const password = req.body.password || '';
  if (!validator.isLength(password, { min: 6 })) {
    return handleLoginApiError();
  }

  const existingUser = await UserModel.findOne({ email });
  if (existingUser === null) {
    return handleLoginApiError();
  }

  const match = await bcrypt.compare(password, existingUser.passwordHash);
  if (!match) {
    return handleLoginApiError();
  }

  const jwt = WebToken.createJwt(email);

  res.status(201).json({
    email,
    jwt
  });
};
