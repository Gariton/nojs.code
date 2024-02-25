import { Alert, Badge, Box, Card, Divider, Flex, Group, Popover, ThemeIcon, Title } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { Icon123, IconBug } from '@tabler/icons-react';

import classes from './styles.module.css';

const BaseNode = ({
    title='',
    icon=<Icon123 />,
    type='',
    color='blue',
    error=null,
    pending=false,
    selected=false,
    children,
    ...props
}) => {

    const [showError, {open, close}] = useDisclosure(false);

    return (
        <Popover
            disabled={error==null}
            opened={showError}
            position='top'
            width='target'
            radius='lg'
        >
            <Popover.Target>
                <Card
                    withBorder
                    radius='lg'
                    shadow='md'
                    p={5}
                    w={300}
                    onMouseEnter={open}
                    onMouseLeave={close}
                    className={`${selected && classes.selected} ${error!=null && classes.error}`}
                    {...props}
                >
                    <Group
                        p={5}
                        justify='space-between'
                    >
                        <Flex
                            gap={5}
                            align="center"
                        >
                            <ThemeIcon
                                variant="light"
                                color={color}
                            >
                                {icon}
                            </ThemeIcon>
                            <Title
                                order={5}
                                lineClamp={1}
                            >
                                {title}
                            </Title>
                        </Flex>
                        <Badge
                            color="gray"
                            variant='light'
                        >
                            {type}
                        </Badge>
                    </Group>
                    <Divider />
                    <Box
                        p={5}
                    >
                        {children}
                    </Box>
                </Card>
            </Popover.Target>
            <Popover.Dropdown
                p={0}
                style={{
                    overflow: 'hidden'
                }}
            >
                <Alert
                    icon={<IconBug size={20}/>}
                    title="エラー"
                    color='red'
                    radius="lg"
                >
                    {error}
                </Alert>
            </Popover.Dropdown>
        </Popover>
    );
}

export default BaseNode;