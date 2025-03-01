import getClient from "../../../../lib/mongo";

export const getItems = async () => {
  const items = [
    { id: 1, name: "Item 1" },
    { id: 2, name: "Item 2" },
    { id: 3, name: "Item 3" },
  ];
  const client = await getClient();

  const usersData = await client
    .db("usersmanagement_prod")
    .collection("users")
    .find()
    .toArray();

  return Response.json(items, { status: 200 });
};
