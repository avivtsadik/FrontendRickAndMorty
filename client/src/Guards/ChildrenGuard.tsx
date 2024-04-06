import { ReactNode } from "react";
interface IChildrenGuard {
  children: ReactNode;
  showChildren: boolean;
}

const ChildrenGuard = ({ showChildren, children }: IChildrenGuard) => {
  if (!showChildren) return;
  return <>{children}</>;
};
export default ChildrenGuard;
