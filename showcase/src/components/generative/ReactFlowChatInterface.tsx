import {
  TamboReactFlow,
  tamboReactFlowSchema,
} from "@/components/tambo/react-flow";
import { MessageThreadFull } from "@/components/tambo/message-thread-full";
import { useTambo } from "@tambo-ai/react";
import { useEffect } from "react";

export const ReactFlowChatInterface = () => {
  const { registerComponent, thread } = useTambo();

  useEffect(() => {
    registerComponent({
      name: "TamboReactFlow",
      description: `An interactive flow diagram component for visualizing workflows, processes, and relationships.
      It renders nodes connected by edges in a flowchart-style layout.

      IMPORTANT: Node and edge structure requirements:
      - nodes: An array of node objects, each with:
        - id: Unique string identifier (e.g., "1", "start", "step-a")
        - label: Display text for the node
        - position: Object with x and y coordinates (e.g., { x: 100, y: 50 })
        - type: Optional - "input" for start nodes (green), "output" for end nodes (pink), "default" for middle nodes (gray)
      - edges: An array of edge objects, each with:
        - id: Unique string identifier (e.g., "e1-2")
        - source: ID of the source node
        - target: ID of the target node
        - label: Optional text label on the edge
        - animated: Optional boolean for animated dash effect
        - type: Optional edge style - "bezier" (curved), "straight", "step", "smoothstep"

      Layout Tips:
      - Space nodes vertically by ~100px for a vertical flow
      - Space nodes horizontally by ~200px for a horizontal flow
      - Use consistent x coordinates for vertical alignment
      - Use consistent y coordinates for horizontal alignment

      Features:
      - Automatic viewport fitting to show all nodes
      - Color-coded node types (green for input, pink for output, gray for default)
      - Multiple edge styles (curved, straight, step)
      - Edge labels for describing relationships
      - Animated edges for highlighting active paths
      - Custom node styling support

      Example use cases:
      - User registration/onboarding flows
      - CI/CD pipeline visualization
      - Decision trees and approval workflows
      - State machine diagrams
      - Org charts and hierarchies
      - Data flow diagrams
      - Process documentation
      - API request/response flows`,
      component: TamboReactFlow,
      propsSchema: tamboReactFlowSchema,
    });
  }, [registerComponent, thread.id]);

  return (
    <div className="flex flex-col" style={{ height: "700px" }}>
      <MessageThreadFull className="rounded-lg" />
    </div>
  );
};
