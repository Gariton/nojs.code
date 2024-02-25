import { ActionIcon, Flex, Group, Title } from "@mantine/core";
import { IconChevronLeft, IconDeviceFloppy, IconSettings } from "@tabler/icons-react";


const Header = () => {
    return (
        <Group
            justify="space-between"
            h="100%"
            p="md"
        >
            <Flex
                gap="md"
            >
                <ActionIcon
                    variant="transparent"
                >
                    <IconChevronLeft />
                </ActionIcon>
                <Title
                    order={4}
                    color="gray"
                >
                    TITLE HERE
                </Title>
            </Flex>
            <Flex
                gap="sm"
            >
                <ActionIcon
                    variant="transparent"
                >
                    <IconDeviceFloppy />
                </ActionIcon>
                <ActionIcon
                    variant="transparent"
                >
                    <IconSettings />
                </ActionIcon>
            </Flex>
        </Group>
    );
}

export default Header;