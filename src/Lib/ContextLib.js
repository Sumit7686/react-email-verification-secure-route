import { useContext, createContext } from "react";
import { Subject } from "rxjs";

export const AppContext = createContext(null);

export function useAppContext() {
  return useContext(AppContext);
}

// share data between components
const subject = new Subject();
const subjectUser = new Subject();

export const roleService = {
  setRole: (data) => subject.next(data),
  clearRole: () => subject.next(),
  getRole: () => subject.asObservable(),
};

export const userService = {
  setUsername: (data) => subjectUser.next(data),
  clearUsername: () => subjectUser.next(),
  getUsername: () => subjectUser.asObservable(),
};
