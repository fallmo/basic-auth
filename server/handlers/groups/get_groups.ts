import { handler } from "../../types/index.ts";
import { getGroup, getGroups } from "../../utils/openshift.ts";

export const getGroupsHandler: handler = async (req, res) => {
  const groups = await getGroups();

  res.json(groups);
};

export const getGroupHandler: handler = async (req, res) => {
  const group = await getGroup(req.params.name);

  res.setStatus(group ? 200 : 404).json(group || {});
};
