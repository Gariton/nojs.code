import { Stack, Text, TextInput, Textarea } from "@mantine/core";
import BaseNode from "../../Base";
import { IconAbc } from "@tabler/icons-react";
import { Handle, Position, useEdges, useNodes, useReactFlow } from "reactflow";
import { useState, useEffect } from "react";
import { getTypeData } from '@/components/useTypes';

const StringSplitNode = ({
    id,
    selected
}) => {

    const nodes = useNodes();
    const edges = useEdges();
    const {setNodes} = useReactFlow();
    const typeData = getTypeData('string');

    const [sourceNode, setSourceNode] = useState(null);
    const [sourceEdge, setSourceEdge] = useState(null);

    const [error, setError] = useState(null);
    const [splitMarker, setSplitMarker] = useState('');

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
        if (typeof(splitMarker)!='string') {
            errorMessage = '区切り文字が不正です';
        }
        if (sourceNode?.data?.export?.type != typeData.typeName) {
            errorMessage = `渡された変数の型が${typeData.typeName}ではありません(got ${sourceNode?.data?.export?.type})`;
        }
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
                title="Split"
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
                        繋げられた文字列の変数を指定文字で区切った配列の変換します(文字列のみ許容)
                    </Text>
                    <TextInput
                        label="区切り文字"
                        value={splitMarker}
                        onChange={e=>setSplitMarker(e.target.value)}
                        className="nodrag"
                    />
                </Stack>
            </BaseNode>
            <Handle
                position={Position.Left}
                style={{width: 10, height: 10}}
                type="target"
                id="stringSplitNodeTarget"
            />
            <Handle
                position={Position.Right}
                style={{width: 10, height: 10}}
                type="source"
                id="stringSplitNodeSource"
            />
        </>
    );
}

export default StringSplitNode;