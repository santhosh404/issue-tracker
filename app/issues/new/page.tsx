'use client';

import { Button, Callout, TextField } from '@radix-ui/themes'
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { useForm, Controller } from 'react-hook-form';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useState } from 'react';


interface IssueForm {
    title: string,
    description: string
}

const NewIssuePage = () => {

    const [error, setError] = useState('');

    const { register, control, handleSubmit } = useForm<IssueForm>();
    const router = useRouter();

    async function submitData(data: { title: String, description: string }) {
        try {
            const response = await axios.post('/api/issues', data);
            router.push('/issues');
        } catch (err) {
            setError('An unexpected error occured');
        }
    }

    return (
        <div className='max-w-xl'>
            {
                error && (
                    <Callout.Root className='mb-3' color='red'>
                        <Callout.Text >{error}</Callout.Text>
                    </Callout.Root>
                )
            }

            <form
                className='space-y-3'
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
        </div>

    )
}

export default NewIssuePage;