import { atom, DefaultValue } from "recoil";

const localStorageEffect =
  (
    //@ts-ignore
    key
  ) =>
  //@ts-ignore
  ({ setSelf, onSet }) => {
    const savedValue = localStorage.getItem(key);
    if (savedValue != null && savedValue != "undefined") {
      setSelf(JSON.parse(savedValue));
    }
    //@ts-ignore
    onSet((newValue) => {
      //@ts-ignore
      if (newValue instanceof DefaultValue) {
        localStorage.removeItem(key);
      } else {
        localStorage.setItem(key, JSON.stringify(newValue));
      }
    });
  };

export const SnackBarState = atom({
  key: "SnackBarState",
  default: false,
});
export const SnackBarSevertyState = atom({
  key: "SnackBarSevertyState",
  default: "info",
});
export const SnackBarMessageState = atom({
  key: "SnackBarMessageState",
  default: "",
});
export const CategoryListState = atom({
  key: "CategoryList",
  default: [],
});

export const ProductListState = atom({
  key: "ProuductList",
  default: [],
});

export const CartItemsState = atom({
  key: "CartItem",
  default: [],
  effects_UNSTABLE: [localStorageEffect("CartItem")],
});

export const TotlalState = atom({
  key: "Total",
  default: "0",
  effects_UNSTABLE: [localStorageEffect("Total")],
});

export const loaderState = atom({
  key: "LoaderState",
  default: false,
});

export const LoginState = atom({
  key: "LoginState",
  default: false,
});

export const EmailState = atom({
  key: "EmailState",
  default: "",
  effects_UNSTABLE: [localStorageEffect("Email")],
});

export const ActivationTokenState = atom({
  key: "ActivationTokenState",
  default: "",
  effects_UNSTABLE: [localStorageEffect("ActivationToken")],
});
export const SelectedBranchState = atom({
  key: "SelectedBranchState",
  default: "105202",
  effects_UNSTABLE: [localStorageEffect("SelectedBranchState")],
});
