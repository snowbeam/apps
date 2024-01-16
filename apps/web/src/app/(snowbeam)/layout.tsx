import { Fragment } from "react";

export default function SnowbeamAppLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return <Fragment>{children}</Fragment>;
}
