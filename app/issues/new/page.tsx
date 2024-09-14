'use client';

import { Button, Callout, Text, TextField } from '@radix-ui/themes'
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { useForm, Controller } from 'react-hook-form';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { createIssueSchema } from '@/app/validationSchema';
import { z } from 'zod';
import ErrorMessage from '@/app/components/resuable/ErrorMessage';
import Spinner from '@/app/components/resuable/Spinner';

type IssueForm = z.infer<typeof createIssueSchema>;

const NewIssuePage = () => {

    const [error, setError] = useState<string>('');
    const [isLoading, setLoading] = useState<boolean>(false)

    const { register, control, handleSubmit, formState: { errors } } = useForm<IssueForm>({
        resolver: zodResolver(createIssueSchema)
    });
    const router = useRouter();

    async function submitData(data: { title: String, description: string }) {
        try {
            setLoading(true);
            await axios.post('/api/issues', data);
            setLoading(false);
            router.push('/issues');
        } catch (err) {
            setLoading(false);
            setError('An unexpected error occured');
        }
    }

    console.log(errors)

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
                {
                    errors.title && <ErrorMessage>{errors.title?.message}</ErrorMessage>
                }
                <Controller
                    name='description'
                    control={control}
                    render={({ field }) => <SimpleMDE placeholder='Description' {...field} />}
                />
                {
                    errors.title && <ErrorMessage>{errors.description?.message}</ErrorMessage>
                }

                <Button className='cursor-pointer'>
                    {
                        isLoading && (
                            <Spinner />
                        )
                    }
                    SpinnerSubmit New Issue
                </Button>
            </form>
        </div>

    )
}

export default NewIssuePage;