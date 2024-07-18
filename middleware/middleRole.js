


const middleCheckRole = (req, res, next) => {
  try {
    const user = req.user;
    const { role } = user;
    if (role !== "ADMIN") {
      return res.redirect("/");
    }
    next();
  } catch (err) {
    res.status(500).json({
      status: "error",
      code: 500,
      data: [],
      message: "Internal Server Error",
    })
  }
}

module.exports = middleCheckRole

