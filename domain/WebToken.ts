import jsonwebtoken from 'jsonwebtoken';

const DEFAULT_JWT_SECRET = new Date().getTime().toString();

export default class WebToken {
  static createJwt(email): string {
    const secret = process.env.JWT_SECRET || DEFAULT_JWT_SECRET;
    return jsonwebtoken.sign({ email }, secret, {
      algorithm: 'HS256',
      expiresIn: '7 days'
    });
  }
}
