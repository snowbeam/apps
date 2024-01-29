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

const initialEdges = [
  { id: "e12", source: "1", target: "2", animated: true },
  { id: "e13", source: "1", target: "3", animated: true },
  { id: "e22a", source: "2", target: "2a", animated: true },
  { id: "e22b", source: "2", target: "2b", animated: true },
  { id: "e22c", source: "2", target: "2c", animated: true },
  { id: "e2c2d", source: "2c", target: "2d", animated: true }
];

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

export function WorkflowEditor() {
  return (
    <ReactFlowProvider>
      <Workflow></Workflow>
    </ReactFlowProvider>
  );
}
