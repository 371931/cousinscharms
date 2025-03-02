import { NextApiRequest, NextApiResponse } from "next";
import { createUser } from "./controllers";

export const POST = async (req: NextApiRequest, res: NextApiResponse) =>
  await createUser(req, res);
