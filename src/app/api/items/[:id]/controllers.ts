export const getItem = async () => {
  return Response.json({ id: 1, name: "Item 1" }, { status: 200 });
};
