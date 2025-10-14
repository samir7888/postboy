import Modal from '@/components/ui/modal'
import React, { useEffect, useState } from 'react'
import { useRequestPlaygroundStore } from '../store/useRequestStore'
import { toast } from 'sonner'
import { Input } from '@/components/ui/input'

type Props = {
    isModalOpen: boolean,
    setIsModalOpen: (open: boolean) => void,
    tabId: string
}

export const AddNameModal = ({ isModalOpen, setIsModalOpen, tabId }: Props) => {
    const { updateTab, tabs, markUnsaved } = useRequestPlaygroundStore();
    const tab = tabs.find(tab => tab.id === tabId);
    const [name, setName] = useState(tab?.title || '');

    useEffect(() => {
        if (tab) {
            setName(tab.title)
        }
    }, [tabId])

    const handleSubmit = async () => {
        if (!name) {
            return;
        }
        try {
            updateTab(tabId, { title: name });
            markUnsaved(tabId, false);
            toast.success("Renamed successfully")
            setIsModalOpen(false)
        } catch (error) {
            console.log(error)
            toast.error("Rename request failed")
        }

    }


    return (
        <div>
            <Modal
                title='Rename the request'
                description="Give a request a name"
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSubmit={handleSubmit}
                submitText="Save"
                submitVariant='default'

            >
                <div className='flex flex-col gap-4'>
                    <Input
                        value={name}
                        onChange={(e) => setName(e.target.value)} />

                </div>
            </Modal>
        </div>
    )
}