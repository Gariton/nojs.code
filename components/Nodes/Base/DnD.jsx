import { Card, Group, Stack, Text, ThemeIcon, Title } from "@mantine/core"
import { Icon123 } from "@tabler/icons-react"

const BaseDnD = ({
    icon=<Icon123 />,
    color='gray',
    title='',
    description='',
    nodeType=''
}) => {
    const onDragStart = (e, nodeType) => {
        e.dataTransfer.setData('application/reactflow', nodeType);
        e.dataTransfer.effectAllowed = 'move';
    };

    return (
        <Card
            withBorder
            radius="md"
            p={5}
            draggable
            style={{
                cursor: 'grab'
            }}
            onDragStart={(event) => onDragStart(event, nodeType)}
        >
            <Group>
                <ThemeIcon
                    variant="light"
                    color={color}
                    size="xl"
                >
                    {icon}
                </ThemeIcon>
                <Stack
                    gap={0}
                >
                    <Title
                        order={5}
                    >
                        {title}
                    </Title>
                    <Text
                        size="xs"
                        color="gray"
                    >
                        {description}
                    </Text>
                </Stack>
            </Group>
        </Card>
    )
}

export default BaseDnD;