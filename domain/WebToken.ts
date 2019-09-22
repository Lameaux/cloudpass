import jsonwebtoken from 'jsonwebtoken';

const SECRET = '123456'; // TODO

export default class WebToken {
  static createJwt(email): string {
    return jsonwebtoken.sign({ email }, SECRET, {
      algorithm: 'HS256',
      expiresIn: '1h'
    });
  }
}
