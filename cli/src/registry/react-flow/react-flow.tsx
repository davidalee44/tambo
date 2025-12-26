"use client";

import { cn } from "@/lib/utils";
import { cva } from "class-variance-authority";
import * as React from "react";
import { z } from "zod/v3";

/**
 * Type for flow variant
 */
type FlowVariant = "default" | "solid" | "bordered";

/**
 * Type for flow size
 */
type FlowSize = "default" | "sm" | "lg" | "full";

/**
 * Variants for the TamboReactFlow component
 */
export const flowVariants = cva(
  "w-full rounded-lg overflow-hidden transition-all duration-200",
  {
    variants: {
      variant: {
        default: "bg-background",
        solid: [
          "shadow-lg shadow-zinc-900/10 dark:shadow-zinc-900/20",
          "bg-muted",
        ].join(" "),
        bordered: ["border-2", "border-border"].join(" "),
      },
      size: {
        default: "h-96",
        sm: "h-64",
        lg: "h-[32rem]",
        full: "h-[calc(100vh-8rem)]",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

/**
 * Props for the error boundary
 */
interface FlowErrorBoundaryProps {
  children: React.ReactNode;
  className?: string;
  variant?: FlowVariant;
  size?: FlowSize;
}

/**
 * Error boundary for catching rendering errors in the TamboReactFlow component
 */
class FlowErrorBoundary extends React.Component<
  FlowErrorBoundaryProps,
  { hasError: boolean; error?: Error }
> {
  constructor(props: FlowErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("Error rendering flow:", error, errorInfo);
  }

  render(): React.ReactNode {
    if (this.state.hasError) {
      return (
        <div
          className={cn(
            flowVariants({
              variant: this.props.variant,
              size: this.props.size,
            }),
            this.props.className,
          )}
        >
          <div className="p-4 flex items-center justify-center h-full">
            <div className="text-destructive text-center">
              <p className="font-medium">Error loading flow diagram</p>
              <p className="text-sm mt-1">
                An error occurred while rendering. Please try again.
              </p>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

/**
 * Zod schema for node position
 */
export const nodePositionSchema = z.object({
  x: z.number().describe("X coordinate of the node position"),
  y: z.number().describe("Y coordinate of the node position"),
});

/**
 * Zod schema for node style
 */
export const nodeStyleSchema = z
  .object({
    backgroundColor: z
      .string()
      .optional()
      .describe("Background color of the node (CSS color value)"),
    borderColor: z
      .string()
      .optional()
      .describe("Border color of the node (CSS color value)"),
    borderWidth: z
      .number()
      .optional()
      .describe("Border width of the node in pixels"),
    borderRadius: z
      .number()
      .optional()
      .describe("Border radius of the node in pixels"),
    color: z
      .string()
      .optional()
      .describe("Text color of the node (CSS color value)"),
    width: z.number().optional().describe("Width of the node in pixels"),
    height: z.number().optional().describe("Height of the node in pixels"),
    padding: z
      .number()
      .optional()
      .describe("Padding inside the node in pixels"),
  })
  .optional()
  .describe("Optional custom styling for the node");

/**
 * Zod schema for a flow node
 */
export const flowNodeSchema = z.object({
  id: z.string().describe("Unique identifier for the node"),
  label: z.string().describe("Display text for the node"),
  position: nodePositionSchema.describe("Position of the node on the canvas"),
  type: z
    .enum(["default", "input", "output", "custom"])
    .optional()
    .describe(
      "Type of node: 'input' for start nodes, 'output' for end nodes, 'default' for middle nodes",
    ),
  style: nodeStyleSchema,
});

/**
 * Zod schema for edge style
 */
export const edgeStyleSchema = z
  .object({
    stroke: z.string().optional().describe("Color of the edge line"),
    strokeWidth: z.number().optional().describe("Width of the edge line"),
  })
  .optional()
  .describe("Optional custom styling for the edge");

/**
 * Zod schema for a flow edge
 */
export const flowEdgeSchema = z.object({
  id: z.string().describe("Unique identifier for the edge"),
  source: z.string().describe("ID of the source node"),
  target: z.string().describe("ID of the target node"),
  label: z.string().optional().describe("Optional label text on the edge"),
  type: z
    .enum(["default", "straight", "step", "smoothstep", "bezier"])
    .optional()
    .describe("Type of edge connection line"),
  animated: z
    .boolean()
    .optional()
    .describe("Whether the edge should have an animated dash pattern"),
  style: edgeStyleSchema,
});

/**
 * Zod schema for TamboReactFlow component
 */
export const tamboReactFlowSchema = z.object({
  nodes: z
    .array(flowNodeSchema)
    .describe(
      "Array of nodes in the flow diagram. Each node must have a unique id, a label, and a position with x/y coordinates.",
    ),
  edges: z
    .array(flowEdgeSchema)
    .describe(
      "Array of edges connecting nodes. Each edge must have a unique id, a source node id, and a target node id.",
    ),
  title: z.string().optional().describe("Title for the flow diagram"),
  variant: z
    .enum(["default", "solid", "bordered"])
    .optional()
    .describe("Visual style variant of the flow container"),
  size: z
    .enum(["default", "sm", "lg", "full"])
    .optional()
    .describe("Size of the flow container"),
  className: z
    .string()
    .optional()
    .describe("Additional CSS classes for styling"),
  fitView: z
    .boolean()
    .optional()
    .describe("Whether to fit the view to show all nodes (default: true)"),
  interactive: z
    .boolean()
    .optional()
    .describe(
      "Whether nodes can be dragged and selected (default: false for AI-generated)",
    ),
});

/**
 * TypeScript types inferred from Zod schemas
 */
export type FlowNodeType = z.infer<typeof flowNodeSchema>;
export type FlowEdgeType = z.infer<typeof flowEdgeSchema>;
export type TamboReactFlowProps = z.infer<typeof tamboReactFlowSchema>;

/**
 * Default node colors by type
 */
const nodeTypeColors: Record<string, { bg: string; border: string }> = {
  input: { bg: "#dcfce7", border: "#22c55e" },
  output: { bg: "#fce7f3", border: "#ec4899" },
  default: { bg: "#f1f5f9", border: "#94a3b8" },
  custom: { bg: "#e0f2fe", border: "#0ea5e9" },
};

/**
 * Custom node component for rendering flow nodes
 */
const CustomNode: React.FC<{
  node: FlowNodeType;
  isConnectable?: boolean;
}> = ({ node }) => {
  const typeColors = nodeTypeColors[node.type ?? "default"];
  const style: React.CSSProperties = {
    padding: node.style?.padding ?? 12,
    borderRadius: node.style?.borderRadius ?? 8,
    backgroundColor: node.style?.backgroundColor ?? typeColors.bg,
    border: `${node.style?.borderWidth ?? 2}px solid ${node.style?.borderColor ?? typeColors.border}`,
    color: node.style?.color ?? "#1e293b",
    width: node.style?.width,
    height: node.style?.height,
    minWidth: 120,
    textAlign: "center" as const,
    fontSize: 14,
    fontWeight: 500,
  };

  return (
    <div style={style} className="shadow-sm">
      {node.label}
    </div>
  );
};

/**
 * Simple edge rendering
 */
const renderEdge = (
  edge: FlowEdgeType,
  nodes: FlowNodeType[],
): JSX.Element | null => {
  const sourceNode = nodes.find((n) => n.id === edge.source);
  const targetNode = nodes.find((n) => n.id === edge.target);

  if (!sourceNode || !targetNode) return null;

  const sourceX = sourceNode.position.x + 60;
  const sourceY = sourceNode.position.y + 25;
  const targetX = targetNode.position.x + 60;
  const targetY = targetNode.position.y + 25;

  const midX = (sourceX + targetX) / 2;
  const midY = (sourceY + targetY) / 2;

  const strokeColor = edge.style?.stroke ?? "#94a3b8";
  const strokeWidth = edge.style?.strokeWidth ?? 2;

  let pathD: string;
  switch (edge.type) {
    case "straight":
      pathD = `M ${sourceX} ${sourceY} L ${targetX} ${targetY}`;
      break;
    case "step":
      pathD = `M ${sourceX} ${sourceY} L ${sourceX} ${midY} L ${targetX} ${midY} L ${targetX} ${targetY}`;
      break;
    case "smoothstep":
    case "bezier":
    default:
      pathD = `M ${sourceX} ${sourceY} C ${sourceX} ${midY}, ${targetX} ${midY}, ${targetX} ${targetY}`;
      break;
  }

  return (
    <g key={edge.id}>
      <defs>
        <marker
          id={`arrowhead-${edge.id}`}
          markerWidth="10"
          markerHeight="7"
          refX="9"
          refY="3.5"
          orient="auto"
        >
          <polygon points="0 0, 10 3.5, 0 7" fill={strokeColor} />
        </marker>
      </defs>
      <path
        d={pathD}
        stroke={strokeColor}
        strokeWidth={strokeWidth}
        fill="none"
        markerEnd={`url(#arrowhead-${edge.id})`}
        strokeDasharray={edge.animated ? "5,5" : undefined}
        className={edge.animated ? "animate-dash" : undefined}
      />
      {edge.label && (
        <text
          x={midX}
          y={midY - 10}
          textAnchor="middle"
          fill="#64748b"
          fontSize={12}
        >
          {edge.label}
        </text>
      )}
    </g>
  );
};

/**
 * A component that renders interactive flow diagrams
 *
 * @component
 * @example
 * ```tsx
 * <TamboReactFlow
 *   title="User Registration Flow"
 *   nodes={[
 *     { id: "1", label: "Start", position: { x: 100, y: 50 }, type: "input" },
 *     { id: "2", label: "Enter Email", position: { x: 100, y: 150 } },
 *     { id: "3", label: "Verify Email", position: { x: 100, y: 250 } },
 *     { id: "4", label: "Complete", position: { x: 100, y: 350 }, type: "output" },
 *   ]}
 *   edges={[
 *     { id: "e1-2", source: "1", target: "2" },
 *     { id: "e2-3", source: "2", target: "3" },
 *     { id: "e3-4", source: "3", target: "4" },
 *   ]}
 *   variant="bordered"
 *   size="lg"
 * />
 * ```
 */
export const TamboReactFlow = React.forwardRef<
  HTMLDivElement,
  TamboReactFlowProps
>(
  (
    {
      className,
      variant,
      size,
      nodes,
      edges,
      title,
      fitView = true,
      interactive = false,
      ...props
    },
    ref,
  ) => {
    const containerRef = React.useRef<HTMLDivElement>(null);
    const [viewBox, setViewBox] = React.useState("0 0 800 600");
    const [dragging, setDragging] = React.useState<{
      nodeId: string;
      startX: number;
      startY: number;
      nodeStartX: number;
      nodeStartY: number;
    } | null>(null);
    const [nodePositions, setNodePositions] = React.useState<
      Map<string, { x: number; y: number }>
    >(new Map());

    // Initialize node positions from props
    React.useEffect(() => {
      if (nodes && nodes.length > 0) {
        const posMap = new Map<string, { x: number; y: number }>();
        nodes.forEach((node) => {
          posMap.set(node.id, { x: node.position.x, y: node.position.y });
        });
        setNodePositions(posMap);
      }
    }, [nodes]);

    // Calculate viewBox to fit all nodes
    React.useEffect(() => {
      if (!fitView || !nodes || nodes.length === 0) return;

      const positions =
        nodePositions.size > 0
          ? Array.from(nodePositions.values())
          : nodes.map((n) => n.position);

      const xs = positions.map((p) => p.x);
      const ys = positions.map((p) => p.y);

      const minX = Math.min(...xs) - 50;
      const minY = Math.min(...ys) - 50;
      const maxX = Math.max(...xs) + 200;
      const maxY = Math.max(...ys) + 100;

      const width = Math.max(maxX - minX, 400);
      const height = Math.max(maxY - minY, 300);

      setViewBox(`${minX} ${minY} ${width} ${height}`);
    }, [nodes, nodePositions, fitView]);

    // If no nodes received yet, show loading
    if (!nodes || nodes.length === 0) {
      return (
        <div
          ref={ref}
          className={cn(flowVariants({ variant, size }), className)}
          {...props}
        >
          <div className="p-4 h-full flex items-center justify-center">
            <div className="flex flex-col items-center gap-2 text-muted-foreground">
              <div className="flex items-center gap-1 h-4">
                <span className="w-2 h-2 bg-current rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                <span className="w-2 h-2 bg-current rounded-full animate-bounce [animation-delay:-0.2s]"></span>
                <span className="w-2 h-2 bg-current rounded-full animate-bounce [animation-delay:-0.1s]"></span>
              </div>
              <span className="text-sm">Building flow diagram...</span>
            </div>
          </div>
        </div>
      );
    }

    // Get current positions (from state if dragging, otherwise from props)
    const getCurrentPosition = (nodeId: string) => {
      return nodePositions.get(nodeId) ?? { x: 0, y: 0 };
    };

    // Create nodes with current positions for edge rendering
    const nodesWithCurrentPositions = nodes.map((node) => ({
      ...node,
      position: getCurrentPosition(node.id),
    }));

    const handleMouseDown = (nodeId: string, e: React.MouseEvent) => {
      if (!interactive) return;
      e.preventDefault();
      const pos = getCurrentPosition(nodeId);
      setDragging({
        nodeId,
        startX: e.clientX,
        startY: e.clientY,
        nodeStartX: pos.x,
        nodeStartY: pos.y,
      });
    };

    const handleMouseMove = (e: React.MouseEvent) => {
      if (!dragging || !interactive) return;

      const dx = e.clientX - dragging.startX;
      const dy = e.clientY - dragging.startY;

      setNodePositions((prev) => {
        const newMap = new Map(prev);
        newMap.set(dragging.nodeId, {
          x: dragging.nodeStartX + dx,
          y: dragging.nodeStartY + dy,
        });
        return newMap;
      });
    };

    const handleMouseUp = () => {
      setDragging(null);
    };

    return (
      <FlowErrorBoundary className={className} variant={variant} size={size}>
        <div
          ref={ref}
          className={cn(flowVariants({ variant, size }), className)}
          {...props}
        >
          <div className="p-4 h-full flex flex-col">
            {title && (
              <h3 className="text-lg font-medium mb-4 text-foreground">
                {title}
              </h3>
            )}
            <div
              ref={containerRef}
              className="flex-1 relative"
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
            >
              <svg
                className="w-full h-full"
                viewBox={viewBox}
                preserveAspectRatio="xMidYMid meet"
              >
                <style>
                  {`
                    @keyframes dash {
                      to {
                        stroke-dashoffset: -20;
                      }
                    }
                    .animate-dash {
                      animation: dash 0.5s linear infinite;
                    }
                  `}
                </style>
                {/* Render edges */}
                {edges?.map((edge) =>
                  renderEdge(edge, nodesWithCurrentPositions),
                )}

                {/* Render nodes */}
                {nodesWithCurrentPositions.map((node) => {
                  const pos = getCurrentPosition(node.id);
                  return (
                    <foreignObject
                      key={node.id}
                      x={pos.x}
                      y={pos.y}
                      width={node.style?.width ?? 120}
                      height={node.style?.height ?? 50}
                      style={{ overflow: "visible" }}
                      onMouseDown={(e) => handleMouseDown(node.id, e)}
                      className={interactive ? "cursor-move" : undefined}
                    >
                      <CustomNode node={node} />
                    </foreignObject>
                  );
                })}
              </svg>
            </div>
          </div>
        </div>
      </FlowErrorBoundary>
    );
  },
);
TamboReactFlow.displayName = "TamboReactFlow";
