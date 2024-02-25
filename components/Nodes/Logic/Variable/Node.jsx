import { NumberInput, Select, Stack, TagsInput, TextInput } from "@mantine/core";
import BaseNode from "../../Base";
import { IconVariable } from "@tabler/icons-react";
import { Handle, Position, useNodes, useReactFlow } from "reactflow";
import { useEffect, useState } from "react";
// import { types, getTypeData } from '@/components/useTypes';
const types = [
    {typeName: 'string', initValue: '', label: '文字列'},
    {typeName: 'number', initValue: 0, label: '数値'},
    {typeName: 'boolean', initValue: 'true', label: '真偽値'},
]

const VariableNode = ({
    id,
    selected
}) => {
    const nodes = useNodes();
    const {setNodes} = useReactFlow();

    const [name, setName] = useState('');
    const [variableType, setVariableType] = useState('string');
    const [value, setValue] = useState('');
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
        setValue(types.find(t=>t.typeName==variableType).initValue ?? null);
    }, [variableType]);

    useEffect(() => {
        let errorMessage = null;
        if (name.length <= 0) {
            errorMessage = '変数名は必須です';
        }
        if (variableType == undefined) {
            errorMessage = '型が不明な型です';
        }
        if (value == null) {
            errorMessage = '値が不正です';
        }

        if (errorMessage==null) {
            updateMyData({
                type: variableType,
                name: name,
                value: value
            });
        } else {
            updateMyData(null)
        }
        setError(errorMessage);
    }, [name, variableType, value]);

    return (
        <>
            <BaseNode
                title="変数"
                icon={<IconVariable size={20}/>}
                type="logic"
                color="gray"
                error={error}
                selected={selected}
            >
                <Stack
                    gap={5}
                >
                    <TextInput
                        label="変数名"
                        withAsterisk
                        className="nodrag"
                        value={name}
                        onChange={e=>setName(e.target.value)}
                    />
                    <Select
                        label="型"
                        withAsterisk
                        className="nodrag"
                        data={types.map(t=>({label: t.label, value: t.typeName}))}
                        value={variableType}
                        onChange={setVariableType}
                    />
                    {variableType=='string' && (
                        <TextInput
                            label="値"
                            withAsterisk
                            className="nodrag"
                            value={value ?? ''}
                            onChange={e=>setValue(e.target.value)}
                        />
                    )}
                    {variableType=='number' && (
                        <NumberInput
                            label="値"
                            withAsterisk
                            className="nodrag"
                            value={value ?? 0}
                            onChange={setValue}
                        />
                    )}
                    {variableType=='boolean' && (
                        <Select
                            label="値"
                            withAsterisk
                            className="nodrag"
                            value={value ?? 'true'}
                            onChange={setValue}
                            data={['true', 'false']}
                        />
                    )}
                    {variableType=='array' && (
                        <TagsInput
                            label="値"
                            withAsterisk
                            className="nodrag"
                            value={value ?? []}
                            onChange={setValue}
                            data={[]}
                        />
                    )}
                </Stack>
            </BaseNode>
            <Handle
                position={Position.Right}
                style={{width: 10, height: 10}}
                type="source"
                id="variableNodeSource"
            />
        </>
    );
}

export default VariableNode;