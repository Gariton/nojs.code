import { AppShell, Card, Group, Stack, Title } from '@mantine/core';
import Editor from '@/components/Editor';
import Navbar from '@/components/Editor/navbar';
import { ReactFlowProvider } from 'reactflow';
import Header from '@/components/Editor/header';

export default function HomePage() {

    return (
        <ReactFlowProvider>
            <AppShell
                layout='alt'
                navbar={{width: 300}}
                header={{height: 60}}
            >
                <AppShell.Header
                    h={60}
                >
                    <Header />
                </AppShell.Header>
                <AppShell.Navbar
                    w={300}
                >
                    <Navbar />
                </AppShell.Navbar>
                <AppShell.Main
                    h="0px" //これよくわかんないね
                >
                    <Editor />
                </AppShell.Main>
            </AppShell>
        </ReactFlowProvider>
    );
}
