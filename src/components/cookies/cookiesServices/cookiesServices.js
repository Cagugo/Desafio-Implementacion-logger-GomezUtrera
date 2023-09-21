class CookiesServices {
  setSignedCookies = async (req, res) => {
    try {
      await res.cookie('SignedCookie', 'cookie hard', { maxAge: 10000, signed: true });
      res.sendSuccess('SignedCookie signed');
    } catch (error) {
      res.sendServerError('Error setSignedCokies');
    }
  };
  getSignedCookies = async (req, res, next) => {
    try {
      const signedCookie = req.signedCookies.SignedCookie;

      if (signedCookie) {
        res.sendSuccess(signedCookie);
      } else {
        res.sendNotFound('Signed cookie not found');
      }
    } catch (error) {
      res.sendServerError('getSignedCookies error when getting cookie');
    }
  };
  deleteSignedCookies = async (req, res) => {
    try {
      await res.clearCookie('SignedCookie');
      res.sendSuccess('SignedCookie removed');
    } catch (error) {
      res.sendServerError('deleteSignedCookies error when deleting signed cookiea');
    }
  };
}
module.exports = new CookiesServices();
