"use client";

/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import "reactflow/dist/style.css";
import ELK from "elkjs/lib/elk.bundled.js";

import { useCallback } from "react";
import ReactFlow, {
  Controls,
  Background,
  MiniMap,
  NodeToolbar,
  NodeResizer,
  type GetMiniMapNodeAttribute,
  BackgroundVariant,
  useNodesState,
  useEdgesState,
  useReactFlow,
  Panel,
  ReactFlowProvider
} from "reactflow";

const elk = new ELK();

/* The `initialNodes` constant is an array of objects that represents the nodes in a graph. Each object
in the array represents a node and has properties such as `id`, `type`, `data`, `position`, and
`style`. The `id` property is a unique identifier for the node. The `type` property specifies the
type of the node, such as "input" or "output". The `data` property contains additional data for the
node, such as a label. The `position` property specifies the initial position of the node on the
graph. The `style` property specifies the visual style of the node, such as the background color and
text color. */
const initialNodes = [
  {
    id: "1",
    type: "input",
    data: { label: "input" },
    position: { x: 0, y: 0 },
    style: { backgroundColor: "#6ede87", color: "white" }
  },
  {
    id: "2",
    data: { label: "node 2" },
    position: { x: 0, y: 100 },
    style: { backgroundColor: "#ff0072", color: "white" }
  },
  {
    id: "2a",
    data: { label: "node 2a" },
    position: { x: 0, y: 200 },
    style: { backgroundColor: "#ff0072", color: "white" }
  },
  {
    id: "2b",
    data: { label: "node 2b" },
    position: { x: 0, y: 300 },
    style: { backgroundColor: "#ff0072", color: "white" }
  },
  {
    id: "2c",
    data: { label: "node 2c" },
    position: { x: 0, y: 400 },
    style: { backgroundColor: "#ff0072", color: "white" }
  },
  {
    id: "2d",
    data: { label: "node 2d" },
    position: { x: 0, y: 500 },
    style: { backgroundColor: "#ff0072", color: "white" }
  },
  {
    id: "3",
    type: "output",
    data: { label: "node 3" },
    position: { x: 200, y: 100 },
    style: { backgroundColor: "#ff0072", color: "white" }
  }
];

/* The `initialEdges` constant is an array of objects that represents the edges (connections) between
nodes in a graph. Each object in the array has the following properties: */
const initialEdges = [
  { id: "e12", source: "1", target: "2", animated: true },
  { id: "e13", source: "1", target: "3", animated: true },
  { id: "e22a", source: "2", target: "2a", animated: true },
  { id: "e22b", source: "2", target: "2b", animated: true },
  { id: "e22c", source: "2", target: "2c", animated: true },
  { id: "e2c2d", source: "2c", target: "2d", animated: true }
];

/**
 * The function `nodeColor` returns a color based on the type of the node, with different colors for
 * "input", "output", and other types.
 * @returns The function `nodeColor` returns a string representing the color code for a given node
 * type. If the node type is "input", it returns "#6ede87". If the node type is "output", it returns
 * "#6865A5". For any other node type, it returns "#ff0072".
 */
const nodeColor:
  | string
  | GetMiniMapNodeAttribute<"input" | "output" | "">
  | undefined = node => {
  switch (node.type) {
    case "input":
      return "#6ede87";
    case "output":
      return "#6865A5";
    default:
      return "#ff0072";
  }
};

/**
 * The `useLayoutedElements` function is a custom hook in TypeScript React that uses the `useReactFlow`
 * hook to get and set nodes and edges, and applies an ELK layout algorithm to layout the elements on a
 * graph.
 * @returns The function `useLayoutedElements` returns an object with a single property
 * `getLayoutedElements`, which is a function.
 */
const useLayoutedElements = () => {
  const { getNodes, setNodes, getEdges, fitView } = useReactFlow();
  const defaultOptions = {
    "elk.algorithm": "layered",
    "elk.layered.spacing.nodeNodeBetweenLayers": 100,
    "elk.spacing.nodeNode": 80
  };

  const getLayoutedElements = useCallback((options: any) => {
    const layoutOptions = { ...defaultOptions, ...options };
    const graph = {
      id: "root",
      layoutOptions: layoutOptions,
      children: getNodes(),
      edges: getEdges()
    };

    elk.layout(graph as never).then(({ children }) => {
      // By mutating the children in-place we saves ourselves from creating a
      // needless copy of the nodes array.
      children?.forEach((node: any) => {
        node.position = { x: node.x, y: node.y };
      });

      setNodes(children as never);
      window.requestAnimationFrame(() => {
        fitView();
      });
    });
  }, []);

  return { getLayoutedElements };
};

/**
 * The `Workflow` function returns a JSX element that represents a ReactFlow component with various
 * layout options and additional features.
 * @returns The function `Workflow` returns a JSX element, specifically a `ReactFlow` component with
 * various props and child components.
 */
function Workflow(): JSX.Element {
  const [nodes, , onNodesChange] = useNodesState(initialNodes);
  const [edges, , onEdgesChange] = useEdgesState(initialEdges);
  const { getLayoutedElements } = useLayoutedElements();
  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      fitView>
      <Controls className="bg-yellow-500" />
      <Background className="" variant={BackgroundVariant.Dots} />
      <MiniMap nodeColor={nodeColor} nodeStrokeWidth={3} zoomable pannable />
      <Panel position="top-right">
        <button
          className="bg-primary rounded-md px-4 py-2 mr-2 text-white font-sans capitalize"
          onClick={() =>
            getLayoutedElements({
              "elk.algorithm": "layered",
              "elk.direction": "DOWN"
            })
          }>
          vertical layout
        </button>
        <button
          className="bg-primary rounded-md px-4 py-2 mr-2 text-white font-sans capitalize"
          onClick={() =>
            getLayoutedElements({
              "elk.algorithm": "layered",
              "elk.direction": "RIGHT"
            })
          }>
          horizontal layout
        </button>
        <button
          className="bg-primary rounded-md px-4 py-2 mr-2 text-white font-sans capitalize"
          onClick={() =>
            getLayoutedElements({
              "elk.algorithm": "org.eclipse.elk.radial"
            })
          }>
          radial layout
        </button>
        <button
          className="bg-primary rounded-sm px-4 py-2 text-white font-sans capitalize"
          onClick={() =>
            getLayoutedElements({
              "elk.algorithm": "org.eclipse.elk.force"
            })
          }>
          force layout
        </button>
      </Panel>
      <NodeToolbar />
      <NodeResizer />
    </ReactFlow>
  );
}

/**
 * The `WorkflowEditor` function returns a component that provides a ReactFlow context and renders a
 * `Workflow` component.
 * @returns The `WorkflowEditor` function is returning a JSX element. It is wrapping the `Workflow`
 * component with the `ReactFlowProvider` component.
 */
export function WorkflowEditor() {
  return (
    <ReactFlowProvider>
      <Workflow></Workflow>
    </ReactFlowProvider>
  );
}
