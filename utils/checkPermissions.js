import { request } from "express";
import { UnAuthenticatedError } from "../errors/index.js";

const checkPermissions = (requestUser, resourceUserId) => {
  // later: check if isAdmin here - -
  if (requestUser.userId === resourceUserId.toString()) return;
  throw new UnAuthenticatedError("Not authorized to access this route");
};

export default checkPermissions;
