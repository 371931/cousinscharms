import { NextApiRequest, NextApiResponse } from "next";
import { getItems } from "./controllers";

export const GET = async (req: NextApiRequest, res: NextApiResponse) =>
  getItems();
