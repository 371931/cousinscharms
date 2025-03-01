import { NextApiRequest, NextApiResponse } from "next";
import { getItem } from "./controllers";

export const GET = async (req: NextApiRequest, res: NextApiResponse) =>
  getItem();
