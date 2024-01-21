import { WorkflowEditor } from "snowbeam-workflow-builder-editor";

/**
 * Snowbeam Admin page
 * @returns A div element is being returned.
 */
export default function SnowbeamAdminHomePage() {
  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <WorkflowEditor />
    </div>
  );
}
