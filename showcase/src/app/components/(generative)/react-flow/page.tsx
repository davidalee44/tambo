"use client";

import { ComponentCodePreview } from "@/components/component-code-preview";
import { InstallationSection } from "@/components/installation-section";
import { ReactFlowChatInterface } from "@/components/generative/ReactFlowChatInterface";
import { TamboProvider } from "@tambo-ai/react";

export default function ReactFlowPage() {
  return (
    <div className="prose max-w-8xl space-y-12">
      {/* Title & Description */}
      <header className="space-y-4">
        <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">
          React Flow
        </h1>
        <p className="text-lg text-muted-foreground">
          An interactive flow diagram component for visualizing workflows,
          processes, decision trees, and node-based relationships. Perfect for
          displaying pipelines, state machines, and organizational structures.
        </p>
      </header>

      {/* Examples Section */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold">Examples</h2>

        <div className="space-y-6">
          <ComponentCodePreview
            title="Interactive Flow Diagram"
            component={
              <TamboProvider
                apiKey={process.env.NEXT_PUBLIC_TAMBO_API_KEY ?? ""}
                tamboUrl={process.env.NEXT_PUBLIC_TAMBO_API_URL ?? ""}
              >
                <ReactFlowChatInterface />
              </TamboProvider>
            }
            code={`import { TamboReactFlow } from "@/components/tambo/react-flow";

export function UserRegistrationFlow() {
  return (
    <TamboReactFlow
      title="User Registration Flow"
      nodes={[
        { id: "1", label: "Start", position: { x: 250, y: 0 }, type: "input" },
        { id: "2", label: "Enter Email", position: { x: 250, y: 100 } },
        { id: "3", label: "Verify Email", position: { x: 250, y: 200 } },
        { id: "4", label: "Create Password", position: { x: 250, y: 300 } },
        { id: "5", label: "Complete", position: { x: 250, y: 400 }, type: "output" },
      ]}
      edges={[
        { id: "e1-2", source: "1", target: "2" },
        { id: "e2-3", source: "2", target: "3", label: "Send code" },
        { id: "e3-4", source: "3", target: "4", label: "Verified" },
        { id: "e4-5", source: "4", target: "5" },
      ]}
      variant="bordered"
      size="lg"
    />
  );
}`}
            previewClassName="p-0"
            minHeight={700}
          />
        </div>
      </section>

      {/* Installation */}
      <section>
        <InstallationSection cliCommand="npx tambo add react-flow" />
      </section>

      {/* Component API */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold">Component API</h2>

        <div className="space-y-6">
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">TamboReactFlow</h3>

            <table>
              <thead>
                <tr>
                  <th>Prop</th>
                  <th>Type</th>
                  <th>Default</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>nodes</td>
                  <td>FlowNode[]</td>
                  <td>[]</td>
                  <td>Array of nodes in the flow diagram</td>
                </tr>
                <tr>
                  <td>edges</td>
                  <td>FlowEdge[]</td>
                  <td>[]</td>
                  <td>Array of edges connecting nodes</td>
                </tr>
                <tr>
                  <td>title</td>
                  <td>string</td>
                  <td>-</td>
                  <td>Title displayed above the flow diagram</td>
                </tr>
                <tr>
                  <td>variant</td>
                  <td>
                    &quot;default&quot; | &quot;solid&quot; |
                    &quot;bordered&quot;
                  </td>
                  <td>&quot;default&quot;</td>
                  <td>Visual style of the container</td>
                </tr>
                <tr>
                  <td>size</td>
                  <td>
                    &quot;sm&quot; | &quot;default&quot; | &quot;lg&quot; |
                    &quot;full&quot;
                  </td>
                  <td>&quot;default&quot;</td>
                  <td>Height of the flow container</td>
                </tr>
                <tr>
                  <td>fitView</td>
                  <td>boolean</td>
                  <td>true</td>
                  <td>Automatically fit viewport to show all nodes</td>
                </tr>
                <tr>
                  <td>interactive</td>
                  <td>boolean</td>
                  <td>false</td>
                  <td>Enable node dragging and selection</td>
                </tr>
                <tr>
                  <td>className</td>
                  <td>string</td>
                  <td>-</td>
                  <td>Additional CSS classes for customization</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-semibold">FlowNode</h3>

            <table>
              <thead>
                <tr>
                  <th>Prop</th>
                  <th>Type</th>
                  <th>Default</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>id</td>
                  <td>string</td>
                  <td>-</td>
                  <td>Unique identifier for the node</td>
                </tr>
                <tr>
                  <td>label</td>
                  <td>string</td>
                  <td>-</td>
                  <td>Display text inside the node</td>
                </tr>
                <tr>
                  <td>position</td>
                  <td>{`{ x: number, y: number }`}</td>
                  <td>-</td>
                  <td>Position coordinates on the canvas</td>
                </tr>
                <tr>
                  <td>type</td>
                  <td>
                    &quot;input&quot; | &quot;output&quot; | &quot;default&quot;
                    | &quot;custom&quot;
                  </td>
                  <td>&quot;default&quot;</td>
                  <td>Node type affecting visual style</td>
                </tr>
                <tr>
                  <td>style</td>
                  <td>NodeStyle</td>
                  <td>-</td>
                  <td>Custom styling for the node</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-semibold">FlowEdge</h3>

            <table>
              <thead>
                <tr>
                  <th>Prop</th>
                  <th>Type</th>
                  <th>Default</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>id</td>
                  <td>string</td>
                  <td>-</td>
                  <td>Unique identifier for the edge</td>
                </tr>
                <tr>
                  <td>source</td>
                  <td>string</td>
                  <td>-</td>
                  <td>ID of the source node</td>
                </tr>
                <tr>
                  <td>target</td>
                  <td>string</td>
                  <td>-</td>
                  <td>ID of the target node</td>
                </tr>
                <tr>
                  <td>label</td>
                  <td>string</td>
                  <td>-</td>
                  <td>Optional text label on the edge</td>
                </tr>
                <tr>
                  <td>type</td>
                  <td>
                    &quot;default&quot; | &quot;straight&quot; |
                    &quot;step&quot; | &quot;smoothstep&quot; |
                    &quot;bezier&quot;
                  </td>
                  <td>&quot;default&quot;</td>
                  <td>Style of the edge connection line</td>
                </tr>
                <tr>
                  <td>animated</td>
                  <td>boolean</td>
                  <td>false</td>
                  <td>Enable animated dash pattern on edge</td>
                </tr>
                <tr>
                  <td>style</td>
                  <td>EdgeStyle</td>
                  <td>-</td>
                  <td>Custom styling for the edge</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
}
