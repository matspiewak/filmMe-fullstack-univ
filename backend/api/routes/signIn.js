const express = require("express");
const passport = require("passport");
const jwt = require("jsonwebtoken");

const router = express.Router();

router.post("/", async (req, res, next) => {
  passport.authenticate("login", async (err, user, info) => {
    try {
      if (err) {
        const error = err

        return next(error)
      }
      else if(!user){
        return res.status(404).json({error: "User not found"})
      }

      req.login(user, { session: false }, async (error) => {
        if (error) return next(error);

        const body = { _id: user._id, email: user.email };
        const token = jwt.sign({ user: body }, process.env.JWT_SECRET);

        return res.cookie('jwt',token, {httpOnly: true}).status(200).json('Succesfully signed in');
      });
    } catch (error) {
      return;
    }
  })(req, res, next);
});

module.exports = router;
