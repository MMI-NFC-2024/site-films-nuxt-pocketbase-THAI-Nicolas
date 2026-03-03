// plugins/pocketbase.js
import PocketBase from "pocketbase";
import type { AuthRecord } from "pocketbase";
import type { TypedPocketBase } from "~/utils/types";

type PbAuthCookie = {
  token: string;
  record: AuthRecord | null;
};

export default defineNuxtPlugin(async () => {
  const pb = new PocketBase("http://127.0.0.1:8090") as TypedPocketBase;

  const cookie = useCookie<PbAuthCookie | null>("pb_auth", {
    path: "/",
    secure: true,
    sameSite: "strict",
    httpOnly: false, // change to "true" if you want only server-side access
    maxAge: 604800,
  });

  // load the store data from the cookie value
  pb.authStore.save(cookie.value?.token ?? "", cookie.value?.record ?? null);

  // send back the default 'pb_auth' cookie to the client with the latest store state
  pb.authStore.onChange(() => {
    cookie.value = {
      token: pb.authStore.token,
      record: pb.authStore.record,
    };
  });

  try {
    // get an up-to-date auth store state by verifying and refreshing the loaded auth model (if any)
    pb.authStore.isValid && (await pb.collection("users").authRefresh());
  } catch (_) {
    // clear the auth store on failed refresh
    pb.authStore.clear();
  }

  return {
    provide: { pb },
  };
});
