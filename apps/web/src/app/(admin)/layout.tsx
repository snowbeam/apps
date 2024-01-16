import { Fragment } from "react";

export default function SnowbeamAdminLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return <Fragment>{children}</Fragment>;
}
