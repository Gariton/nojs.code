import { NumberInput, Select, Stack, TagsInput, Text, TextInput } from "@mantine/core";
import BaseNode from "../../Base";
import { IconRouteAltLeft } from "@tabler/icons-react";
import { Handle, Position, useNodes, useReactFlow } from "reactflow";
import { useEffect, useState } from "react";

const IfNode = ({
    id,
    selected
}) => {

    const nodes = useNodes();
    const edges = useEdges();
    const {setNodes} = useReactFlow();

    const [sourceNode, setSourceNode] = useState(null);
    const [sourceEdge, setSourceEdge] = useState(null);
    const [error, setError] = useState(null);

    const updateMyData = (exp) => {
        setNodes(nodes.map(n=>{
            if (n.id==id) {
                return {
                    ...n,
                    data: {
                        ...n.data,
                        export: exp
                    }
                }
            } else {
                return n;
            }
        }));
    }


    useEffect(() => {
        // ソースノードとソースエッジを割り出し
        const se = edges.find(e=>e.target==id) ?? null;
        setSourceEdge(se);
        const sn = nodes.find(n=>n.id==se?.source) ?? null;
        setSourceNode(sn);
    }, [edges, nodes]);

    useEffect(() => {
        let errorMessage = null;

        if (errorMessage == null) {
            try {
                const result = sourceNode.data.export.value.split(splitMarker);
                updateMyData({
                    ...sourceNode.data.export,
                    type: 'array',
                    value: result
                });
            } catch (e) {
                errorMessage = String(e);
            }
        } else {
            updateMyData(null);
        }
        setError(errorMessage);
    }, [sourceNode?.data?.export, splitMarker]);


    return (
        <>
            <BaseNode
                title="条件"
                icon={<IconRouteAltLeft size={20}/>}
                type="logic"
                color="gray"
                error={error}
                selected={selected}
            >
                <Text
                    color="gray"
                    size="xs"
                >
                    渡された変数がtruthyかfalsyかでルートを分けます
                </Text>
            </BaseNode>
            <Handle
                position={Position.Left}
                style={{width: 10, height: 10}}
                type="target"
                id="ifNodeTarget"
            />
            <Handle
                position={Position.Right}
                style={{width: 10, height: 10, top: '25%'}}
                type="source"
                id="ifNodeSourceTrue"
            />
            <Handle
                position={Position.Right}
                style={{width: 10, height: 10, top: '75%'}}
                type="source"
                id="ifNodeSourceFalse"
            />
        </>
    );
}

export default IfNode;