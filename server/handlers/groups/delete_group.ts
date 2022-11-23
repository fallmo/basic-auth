import { handler } from "../../types/index.ts";
import { deleteGroup } from "../../utils/openshift.ts";

export const deleteGroupHandler: handler = async (req, res) => {
  const name = req.params.name;
  const success = await deleteGroup(name);

  res.setStatus(success ? 200 : 400).json({ name });
};
