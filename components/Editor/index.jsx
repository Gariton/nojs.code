import { useCallback, useEffect, useState } from 'react';
import ReactFlow, { Background, BackgroundVariant, Controls, MiniMap, useNodesState, useEdgesState, addEdge, MarkerType, ConnectionLineType } from 'reactflow';
import 'reactflow/dist/style.css';

import { VariableNode } from '../Nodes/Logic/Variable';
import { ComparisonNode } from '../Nodes/Logic/Comparison';
import { IfNode } from '../Nodes/Logic/If';
import { DebugNode } from '../Nodes/Logic/Debug';
import { StringSplitNode } from '../Nodes/String/Split';
import { ArrayJoinNode } from '../Nodes/Array/Join';
import { ArrayReverseNode } from '../Nodes/Array/Reverse';
import { ArrayLengthNode } from '../Nodes/Array/Length';

const nodeTypes = {
    variableNode: VariableNode,
    comparisonNode: ComparisonNode,
    ifNode: IfNode,
    debugNode: DebugNode,
    stringSplitNode: StringSplitNode,
    arrayJoinNode: ArrayJoinNode,
    arrayReverseNode: ArrayReverseNode,
    arrayLengthNode: ArrayLengthNode,
}

const Editor = () => {
    let id = 0;
    const getId = () => `dndnode_${id++}`;

    const [nodes, setNodes, onNodesChange] = useNodesState([]);
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);
    const [reactFlowInstance, setReactFlowInstance] = useState(null);

    const onConnect = useCallback(
        (params) => setEdges((eds) => addEdge(params, eds)),
        [setEdges],
    );

    const onDragOver = useCallback((e) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
    }, []);

    const onDrop = useCallback(
        (e) => {
            e.preventDefault();

            const type = e.dataTransfer.getData('application/reactflow');

            // check if the dropped element is valid
            if (typeof type === 'undefined' || !type) {
                return;
            }

            // reactFlowInstance.project was renamed to reactFlowInstance.screenToFlowPosition
            // and you don't need to subtract the reactFlowBounds.left/top anymore
            // details: https://reactflow.dev/whats-new/2023-11-10
            const position = reactFlowInstance.screenToFlowPosition({
                x: e.clientX,
                y: e.clientY,
            });
            const newNode = {
                id: getId(),
                type,
                position,
                data: {},
            };

            setNodes((nds) => nds.concat(newNode));
        },
        [reactFlowInstance],
    );

    return (
        <ReactFlow
            nodeTypes={nodeTypes}
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            defaultEdgeOptions={{
                type: 'smoothstep',
                markerEnd: {
                    type: MarkerType.ArrowClosed
                }
            }}
            connectionLineType={ConnectionLineType.SmoothStep}
            onInit={setReactFlowInstance}
            onDrop={onDrop}
            onDragOver={onDragOver}
        >
            <Background
                variant={BackgroundVariant.Dots}
            />
            <Controls />
            <MiniMap />
        </ReactFlow>
    );
}

export default Editor;