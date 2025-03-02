import { NextApiRequest, NextApiResponse } from "next";
import getClient from "../../../../../lib/mongo";
import { WithId } from "mongodb";

type CountDocument = {
  count: number;
};

export const createUser = async (req: any, res: NextApiResponse) => {
  try {
    const bodyData: any = await req.json();

    delete bodyData.passwordConfirmation;
    delete bodyData.changedFirst;
    delete bodyData.country;

    const client = await getClient();
    const usersCollection = client
      .db("usersmanagement_prod")
      .collection("users");

    const commonCounter = client
      .db("usersmanagement_prod")
      .collection("commonCounter");

    const userIdCount: any = await commonCounter.findOne();

    if (!userIdCount) {
      throw new Error("Counter document not found");
    }

    const userId = `CCUI${userIdCount.count}`;

    bodyData.userId = userId;

    const [user, countUpdate] = await Promise.all([
      usersCollection.insertOne(bodyData),
      commonCounter.updateOne({ _id: userIdCount._id }, { $inc: { count: 1 } }),
    ]);

    if (user) {
      return Response.json("Success Brother");
    } else {
      return Response.json("Error While Inserting User", { status: 400 });
    }
  } catch (error: any) {
    console.log({ error });
    return Response.json(
      error?.message ? error?.message : "Error While Inserting User",
      { status: 500 }
    );
  }
};
