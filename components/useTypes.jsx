import { IconAbc, IconBoxSeam, IconNumber, IconSwitch } from "@tabler/icons-react";

const types = [
    {typeName: 'string', initValue: '', label: '文字列', color: 'yellow', icon: <IconAbc size={20}/>},
    {typeName: 'number', initValue: 0, label: '数値', color: 'blue', icon: <IconNumber size={20}/>},
    {typeName: 'boolean', initValue: 'true', label: '真偽値', color: 'red', icon: <IconSwitch size={20}/>},
    {typeName: 'array', initValue: [], label: '配列', color: 'lime', icon: <IconBoxSeam size={20}/>},
]

const getTypeData = (name) => {
    return types.find(t=>t.typeName==name);
}

export {
    types,
    getTypeData
}
