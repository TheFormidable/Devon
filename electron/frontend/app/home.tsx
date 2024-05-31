'use client'
import { useState, useEffect } from 'react'
import Chat from '@/components/chat/chat'
import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
} from '@/components/ui/resizable'
import { ViewMode } from '@/lib/types'
import EditorWidget from '@/components/agent-workspace/agent-tabs/editor-widget/editor-widget'
import TimelineWidget from '@/components/agent-workspace/agent-tabs/timeline-widget'
import { useSearchParams } from 'next/navigation'

export default function Home() {
    const searchParams = useSearchParams()
    const [sessionId, setSessionId] = useState<string | null>(null)
    const [viewMode, setViewMode] = useState<ViewMode>(ViewMode.Panel)

    const [showPlanner, setShowPlanner] = useState<boolean>(true)
    const [showTimeline, setShowTimeline] = useState<boolean>(true)

    const toggleViewMode = () => {
        setViewMode(
            viewMode === ViewMode.Panel ? ViewMode.Grid : ViewMode.Panel
        )
    }

    const visibilityProps = {
        showPlanner,
        setShowPlanner,
        showTimeline,
        setShowTimeline,
    }

    const [isAgentWorkspaceVisible, setAgentWorkspaceVisible] = useState(true)

    const toggleAgentWorkspace = () => {
        setAgentWorkspaceVisible(!isAgentWorkspaceVisible)
    }

    // Basically listens for change
    useEffect(() => {
        const chatId = searchParams.get('chat')
        // Handle when the chatId is 'New', which means the session hasn't been made yet, and we should prompt the select project modal
        if (chatId && chatId === 'New') {
            return
        }

        if (!chatId) {
            return
        }
        setSessionId(chatId)
    }, [])

    return (
        <div className="w-full flex flex-row">
            <ResizablePanelGroup direction="horizontal">
                <ResizablePanel
                    className={`flex ${viewMode === ViewMode.Panel ? 'flex-row' : 'flex-col'} w-full relative justify-center`}
                >
                    {/* {showTimeline && (
                            <TimelineWidget
                                className={
                                    viewMode === ViewMode.Panel
                                        ? 'w-[275px]'
                                        : 'w-full overflow-hidden'
                                }
                            />
                        )} */}
                    <Chat
                        sessionId={sessionId}
                        // headerIcon={<ToggleTimelineHeader showTimeline={showTimeline} setShowTimeline={setShowTimeline} />}
                    />
                </ResizablePanel>
                <ResizableHandle className="" />
                <ResizablePanel className="flex flex-col w-full">
                    <EditorWidget chatId={sessionId ?? null} />
                </ResizablePanel>
            </ResizablePanelGroup>
        </div>
    )
}
