'use client';

import { Button, TextField } from '@radix-ui/themes'
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { useForm, Controller } from 'react-hook-form';
import axios from 'axios';
import { useRouter } from 'next/navigation';


interface IssueForm {
    title: string,
    description: string
}

const NewIssuePage = () => {

    const { register, control, handleSubmit } = useForm<IssueForm>();
    const router = useRouter();

    async function submitData(data: { title: String, description: string }) {
        const response = await axios.post('/api/issues', data);
        router.push('/issues');
    }

    return (
        <form
            className='max-w-xl space-y-3'
            onSubmit={handleSubmit(data => submitData(data))}
        >
            <TextField.Root
                placeholder="Title"
                {...register('title')}
            />
            <Controller
                name='description'
                control={control}
                render={({ field }) => <SimpleMDE placeholder='Description' {...field} />}
            />

            <Button className='cursor-pointer'>Submit New Issue</Button>
        </form>
    )
}

export default NewIssuePage;