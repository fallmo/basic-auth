export async function getGroups() {
  const url = Deno.env.get("OCP_URL")! + "/apis/user.openshift.io/v1/groups";
  const sa_token = Deno.env.get("SA_TOKEN")!;

  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${sa_token}`,
    },
  });

  if (res.status !== 200) {
    console.log("result getting groups: ", await res.json(), "\n");
    return [];
  }

  const data: { items: { metadata: { name: string }; users: string[] }[] } = await res.json();
  return data.items.map(group => ({ name: group.metadata.name, users: group.users }));
}

export async function getGroup(name: string) {
  const url = Deno.env.get("OCP_URL")! + "/apis/user.openshift.io/v1/groups/" + name;
  const sa_token = Deno.env.get("SA_TOKEN")!;

  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${sa_token}`,
    },
  });

  const data = await res.json();
  console.log("result getting group: ", data, "\n");
  if (res.status !== 200) return null;

  return { name: data.metadata.name, users: data.users };
}

export async function createGroup(name: string) {
  const url = Deno.env.get("OCP_URL")! + "/apis/user.openshift.io/v1/groups";
  const sa_token = Deno.env.get("SA_TOKEN")!;

  const group = { kind: "Group", apiVersion: "user.openshift.io/v1", metadata: { name }, users: [] };

  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${sa_token}`,
    },
    body: JSON.stringify(group),
  });

  console.log("result creating group: ", await res.json(), "\n");

  return res.status === 201;
}

export async function deleteGroup(name: string) {
  const url = Deno.env.get("OCP_URL")! + "/apis/user.openshift.io/v1/groups/" + name;
  const sa_token = Deno.env.get("SA_TOKEN")!;

  const res = await fetch(url, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${sa_token}`,
    },
  });

  console.log("result deleting group: ", await res.json(), "\n");

  return res.status === 200;
}

// deno-lint-ignore no-explicit-any
export async function editGroup(name: string, data: any) {
  const url = Deno.env.get("OCP_URL")! + "/apis/user.openshift.io/v1/groups/" + name;
  const sa_token = Deno.env.get("SA_TOKEN")!;

  const res = await fetch(url, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${sa_token}`,
      "Content-Type": "application/merge-patch+json",
    },
    body: JSON.stringify(data),
  });

  console.log("result updating group: ", await res.json(), "\n");

  return res.status === 200;
}
