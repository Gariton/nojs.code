import { Textarea } from "@mantine/core";
import BaseNode from "../../Base";
import { IconBug } from "@tabler/icons-react";
import { Handle, Position, useEdges, useNodes } from "reactflow";
import { useState, useEffect } from "react";

const DebugNode = ({
    id,
    selected
}) => {

    const nodes = useNodes();
    const edges = useEdges();

    const [sourceNode, setSourceNode] = useState(null);
    const [sourceEdge, setSourceEdge] = useState(null);

    useEffect(() => {
        // ソースノードとソースエッジを割り出し
        const se = edges.find(e=>e.target==id) ?? null;
        setSourceEdge(se);
        const sn = nodes.find(n=>n.id==se?.source) ?? null;
        setSourceNode(sn);
    }, [edges, nodes]);

    return (
        <>
            <BaseNode
                title="デバッグ"
                icon={<IconBug size={20}/>}
                type="logic"
                color="gray"
                selected={selected}
            >
                <Textarea
                    label="値"
                    minRows={7}
                    maxRows={7}
                    autosize
                    value={
                        typeof(sourceNode?.data?.export?.value) == 'object'
                            ? JSON.stringify(sourceNode?.data?.export?.value, undefined, 2)
                            : String(sourceNode?.data?.export?.value)
                    }
                    className="nodrag"
                />
            </BaseNode>
            <Handle
                position={Position.Left}
                style={{width: 10, height: 10}}
                type="target"
                id="debugNodeTarget"
            />
        </>
    );
}

export default DebugNode;