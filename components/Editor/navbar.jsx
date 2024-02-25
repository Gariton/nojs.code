import { ActionIcon, Avatar, Badge, Card, Flex, Group, Paper, ScrollArea, Stack, Text, Title } from "@mantine/core";
import { IconAbc, IconBug, IconDots, IconEqualDouble, IconRouteAltLeft, IconVariable } from "@tabler/icons-react";
import BaseDnD from "../Nodes/Base/DnD";

import { getTypeData } from '@/components/useTypes';

const nodes = [
    {title: '変数', description: '変数を宣言', icon: <IconVariable size={20} />, color: 'gray', nodeType: 'variableNode'},
    // {title: '条件', desacription: '条件で分岐', icon: <IconRouteAltLeft size={20} />, color: 'gray', nodeType: 'ifNode'},
    {title: '比較', description: '値を比較', icon: <IconEqualDouble size={20} />, color: 'gray', nodeType: 'comparisonNode'},
    {title: 'デバッグ', description: '変数の中を確認', icon: <IconBug size={20} />, color: 'gray', nodeType: 'debugNode'},
    {title: 'Split', description: '指定文字で文字列を分割', icon: getTypeData('string').icon, color: getTypeData('string').color, nodeType: 'stringSplitNode'},

    {title: 'Join', description: '指定文字で連結', icon: getTypeData('array').icon, color: getTypeData('array').color, nodeType: 'arrayJoinNode'},
    {title: 'Length', description: '要素数を取得', icon: getTypeData('array').icon, color: getTypeData('array').color, nodeType: 'arrayLengthNode'},
    {title: 'Reverse', description: '要素をリバース', icon: getTypeData('array').icon, color: getTypeData('array').color, nodeType: 'arrayReverseNode'},
]

const Navbar = () => {

    return (
        <div
            style={{
                display: 'grid',
                gridTemplateRows: 'auto 1fr auto',
                gridTemplateColumns: '1fr',
                height: '100%',
                width: '100%'
            }}
        >
            <Card>
                <Group
                    justify="space-between"
                >
                    <Title
                        order={3}
                    >
                        NOJS.CODE
                    </Title>
                    <Badge
                        color="gray"
                        variant="light"
                    >
                        v0.0.1
                    </Badge>
                </Group>
            </Card>

            <ScrollArea
                h="100%"
            >
                <Stack
                    p="md"
                >
                    {nodes.map((node, i) => (
                        <BaseDnD
                            title={node.title}
                            description={node.description}
                            icon={node.icon}
                            color={node.color}
                            nodeType={node.nodeType}
                            key={i}
                        />
                    ))}
                </Stack>
            </ScrollArea>

            <Card
                style={{
                    borderTop: '1px solid var(--mantine-color-default-border)'
                }}
                radius={0}
            >
                <Group
                    justify="space-between"
                >
                    <Flex
                        align='center'
                        gap='sm'
                    >
                        <Avatar />
                        <Text
                            fw={600}
                            size="md"
                        >
                            USER NAME
                        </Text>
                    </Flex>
                    <ActionIcon
                        variant="transparent"
                        color="gray"
                    >
                        <IconDots />
                    </ActionIcon>
                </Group>
            </Card>
        </div>
    );
}

export default Navbar;