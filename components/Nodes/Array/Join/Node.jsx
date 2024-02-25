import { Stack, Text, TextInput, Textarea } from "@mantine/core";
import BaseNode from "../../Base";
import { IconAbc, IconBoxSeam } from "@tabler/icons-react";
import { Handle, Position, useEdges, useNodes, useReactFlow } from "reactflow";
import { useState, useEffect } from "react";
import { getTypeData } from '@/components/useTypes';

const ArrayJoinNode = ({
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
    const [joinMarker, setJoinMarker] = useState('');

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
        if (typeof(joinMarker)!='string') {
            errorMessage = '接合文字が不正です';
        }
        if (sourceNode?.data?.export?.type != typeData.typeName) {
            errorMessage = `渡された変数の型が${typeData.typeName}ではありません(got ${sourceNode?.data?.export?.type})`;
        }
        if (errorMessage == null) {
            try {
                const result = sourceNode.data.export.value.join(joinMarker);
                updateMyData({
                    ...sourceNode.data.export,
                    type: 'string',
                    value: result
                });
            } catch (e) {
                errorMessage = String(e);
            }
        } else {
            updateMyData(null);
        }
        setError(errorMessage);
    }, [sourceNode?.data?.export, joinMarker]);

    return (
        <>
            <BaseNode
                title="Join"
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
                        繋げられた配列を指定文字でつなげた文字列にします
                    </Text>
                    <TextInput
                        label="接合文字"
                        value={joinMarker}
                        onChange={e=>setJoinMarker(e.target.value)}
                        className="nodrag"
                    />
                </Stack>
            </BaseNode>
            <Handle
                position={Position.Left}
                style={{width: 10, height: 10}}
                type="target"
                id="arrayJoinNodeTarget"
            />
            <Handle
                position={Position.Right}
                style={{width: 10, height: 10}}
                type="source"
                id="arrayJoinNodeSource"
            />
        </>
    );
}

export default ArrayJoinNode;