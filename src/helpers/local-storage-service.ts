import { Admin } from "../types/auth.type";
import { json } from "react-router-dom";
// import { json } from 'react-router-dom'

class LocalStorageService {
  constructor() {}

  get(key: string) {
    return localStorage.getItem(key);
  }

  delete_eaccestoke() {
    localStorage.removeItem("access_token");
  }
  set(key: string, value: any) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  getbranchOwner(): {
    name: string;
    id: string;
  } {
    return JSON.parse(
      //@ts-ignore
      this.get("branch")
    ) as any;
  }
  setbranchOwner(id: string, name: string) {
    localStorage.setItem(
      "branch",
      JSON.stringify({
        name: name,
        id: id,
      })
    );
  }

  get_accesstoken() {
    return this.get("access_token");
  }
  get_role() {
    return this.get("role");
  }
  set_role(role: string) {
    return this.set("role", role);
  }
  set_accesstoken(access_token: string) {
    return this.set("access_token", access_token);
  }
  set_user(admin: any) {
    return this.set("user", admin);
  }

  get_user(): Admin | null {
    let admin = this.get("user");
    let admin_parsed: Admin | null = null;
    if (admin != undefined) {
      admin_parsed = JSON.parse(admin);
    }
    return admin_parsed;
  }
  set_resetpasswordtoken(accessToken: string) {
    this.set("reset_password_token", accessToken);
  }

  get_resetpasswordtoken() {
    return this.get("reset_password_token");
  }
}

export { LocalStorageService };
