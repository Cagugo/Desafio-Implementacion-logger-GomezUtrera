class RolesServices {
  getAdmin = async (req, res) => {
    try {
      return res.status(200).json({ success: true, message: 'If you are seeing this it is because you are a registered Admin' });
    } catch (error) {
      return res.status(500).json({
        success: false,
        error: 'Error getAdmin',
        message: 'An error occurred while processing the request.',
      });
    }
  };

  getUser = async (req, res) => {
    try {
      return res.status(200).json({ success: true, message: 'If you are seeing this it is because you are a registered User' });
    } catch (error) {
      return res.status(500).json({
        success: false,
        error: 'Error getUser',
        message: 'An error occurred while processing the request.',
      });
    }
  };
}
module.exports = new RolesServices();

