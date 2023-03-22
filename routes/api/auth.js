const express = require("express");
const { users: ctrl } = require("../../controllers");
const { schemas } = require("../../models/user");
const {
  validation,
  ctrlWrapper,
  authenticate,
  upload,
} = require("../../middlewares");

const router = express.Router();

router.post(
  "/signup",
  validation(schemas.registerSchema),
  ctrlWrapper(ctrl.signup)
);

router.get("/verify/:verificationToken", ctrlWrapper(ctrl.verifyEmail));

router.post("/verify", validation(schemas.emailSchema), ctrl.resendVerifyEmail);

router.post("/login", validation(schemas.loginSchema), ctrlWrapper(ctrl.login));

router.get("/current", authenticate, ctrlWrapper(ctrl.getCurrent));

router.post("/logout", authenticate, ctrlWrapper(ctrl.logout));

router.patch(
  "/",
  authenticate,
  validation(schemas.subscriptionJoiSchema),
  ctrlWrapper(ctrl.updateSubscription)
);

router.patch(
  "/avatars",
  authenticate,
  upload.single("avatar"),
  ctrlWrapper(ctrl.updateAvatar)
);

module.exports = router;
