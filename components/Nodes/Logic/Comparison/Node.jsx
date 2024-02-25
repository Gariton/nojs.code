import { Select, Stack, Text } from "@mantine/core";
import BaseNode from "../../Base";
import { IconEqualDouble } from "@tabler/icons-react";
import { Handle, Position, useEdges, useNodes, useReactFlow } from "reactflow";
import { useState, useEffect } from "react";

const marks = [
    '==',
    '!=',
    '>=',
    '<=',
    '>',
    '<'
]

const ComparisonNode = ({
    id,
    selected
}) => {
    const nodes = useNodes();
    const edges = useEdges();
    const {setNodes} = useReactFlow();

    const [sourceNode, setSourceNode] = useState(null);
    const [sourceEdge, setSourceEdge] = useState(null);
    const [comparisonMark, setComparisonMark] = useState('==');

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
        const se1 = edges.find(e=>e.target==id&&e.targetHandle=='comparisonNodeTarget1') ?? null;
        const se2 = edges.find(e=>e.target==id&&e.targetHandle=='comparisonNodeTarget2') ?? null;
        setSourceEdge({
            target1: se1,
            target2: se2
        });
        const sn1 = nodes.find(n=>n.id==se1?.source) ?? null;
        const sn2 = nodes.find(n=>n.id==se2?.source) ?? null;
        setSourceNode({
            target1: sn1,
            target2: sn2
        });
    }, [edges, nodes]);

    useEffect(() => {
        let errorMessage = null;
        const t1 = sourceNode?.target1?.data?.export;
        const t2 = sourceNode?.target2?.data?.export;
        if (t1==undefined) {
            errorMessage = '値1が不正です';
        }
        if (t2==undefined) {
            errorMessage = '値2が不正です';
        }
        if (t1?.type != t2?.type) {
            errorMessage = `値1と値2の型は同じである必要があります(値1:${t1?.type}、値2:${t2?.type})`;
        } else {
            if (t1?.type == 'array' || t1?.type == 'object') {
                errorMessage = `指定された値の型は比較できません(型:${t1?.type})`;
            }
        }
        if (errorMessage == null) {
            try {
                let result;
                switch (comparisonMark) {
                    case '==':
                        result = String(t1?.value == t2?.value);
                        break;

                    case '!=':
                        result = String(t1?.value != t2?.value);
                        break;
                    
                    case '>=':
                        result = String(t1?.value >= t2?.value);
                        break;

                    case '<=':
                        result = String(t1?.value <= t2?.value);
                        break;

                    case '>':
                        result = String(t1?.value > t2?.value);
                        break;

                    case '<':
                        result = String(t1?.value < t2?.value);
                        break;

                    default:
                        result = String(false);
                        break;
                }
                updateMyData({
                    type: 'boolean',
                    value: result
                });
            } catch (e) {
                errorMessage = String(e);
            }
        } else {
            updateMyData(null);
        }
        setError(errorMessage);
    }, [sourceNode?.target1?.data?.export, sourceNode?.target2?.data?.export, comparisonMark]);

    return (
        <>
            <BaseNode
                title="比較"
                icon={<IconEqualDouble size={20}/>}
                type="logic"
                color="gray"
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
                        値1と値2を比較してtrueかfalseで返します
                    </Text>
                    <Select
                        label="比較演算子"
                        data={marks}
                        value={comparisonMark}
                        onChange={setComparisonMark}
                    />
                </Stack>
            </BaseNode>
            <Handle
                position={Position.Left}
                style={{width: 10, height: 10, top: '25%'}}
                type="target"
                id="comparisonNodeTarget1"
            />
            <Handle
                position={Position.Left}
                style={{width: 10, height: 10, top: '75%'}}
                type="target"
                id="comparisonNodeTarget2"
            />
            <Handle
                position={Position.Right}
                style={{width: 10, height: 10}}
                type="source"
                id="comparisonNodeSource"
            />
        </>
    );
}

export default ComparisonNode;