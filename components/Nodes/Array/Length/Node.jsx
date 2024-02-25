import { Stack, Text, TextInput, Textarea } from "@mantine/core";
import BaseNode from "../../Base";
import { IconBoxSeam } from "@tabler/icons-react";
import { Handle, Position, useEdges, useNodes, useReactFlow } from "reactflow";
import { useState, useEffect } from "react";
import { getTypeData } from '@/components/useTypes';

const ArrayLengthNode = ({
    id,
    selected
}) => {
    const typeData = getTypeData('array');
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
        if (sourceNode?.data?.export?.type != typeData.typeName) {
            errorMessage = `渡された変数の型が${typeData.typeName}ではありません(got ${sourceNode?.data?.export?.type})`;
        }
        if (errorMessage == null) {
            try {
                const result = sourceNode.data.export.value.length;
                updateMyData({
                    ...sourceNode.data.export,
                    type: 'number',
                    value: result
                });
            } catch (e) {
                errorMessage = String(e);
            }
        } else {
            updateMyData(null);
        }
        setError(errorMessage);
    }, [sourceNode?.data?.export]);

    return (
        <>
            <BaseNode
                title="Length"
                icon={typeData.icon}
                type={typeData.typeName}
                color={typeData.color}
                error={error}
                selected={selected}
            >
                <Stack
                    gap={5}
                >
                    <Text
                        color="gray"
                        size="xs"
                    >
                        繋げられた配列の要素数を返します
                    </Text>
                </Stack>
            </BaseNode>
            <Handle
                position={Position.Left}
                style={{width: 10, height: 10}}
                type="target"
                id="arrayLengthNodeTarget"
            />
            <Handle
                position={Position.Right}
                style={{width: 10, height: 10}}
                type="source"
                id="arrayLengthNodeSource"
            />
        </>
    );
}

export default ArrayLengthNode;