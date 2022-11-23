import { handler } from "../../types/index.ts";
import Schema, {
  string,
  array,
} from "https://denoporter.sirjosh.workers.dev/v1/deno.land/x/computed_types/src/index.ts";
import { editGroup } from "../../utils/openshift.ts";

//  edit group
export const editGroupHandler: handler = async (req, res) => {
  const [error, fields] = validateBody(req.body);
  const name = req.params.name;

  if (error) {
    return res.setStatus(400).json({ error: error.message });
  }

  const success = await editGroup(name, fields!);

  res.setStatus(success ? 200 : 400).json(success ? { name } : { error: "Failed to edit Group" });
};

// deno-lint-ignore no-explicit-any
function validateBody(body: any) {
  const validator = Schema({
    users: array.of(string),
  }).destruct();

  return validator(body);
}
