import { Button } from '@radix-ui/themes'
import axios from 'axios'
import Link from 'next/link'
import React from 'react';


async function getIssues() {
    try {
        const response = await axios.get('http://localhost:3000/api/issues');
        return response.data;
    } catch (err) {
        console.error('Failed to fetch issues:', err);
        return [];
    }
}

const IssuesPage = async () => {
    const issues = await getIssues();
    return (
        <div>
            {
                issues.map((issue: any) => (
                    <div key={issue.id}>
                        <p>{issue.title}</p>
                        <p >{issue.description}</p>
                    </div>
                ))
            }
            <Button>
                <Link href={'/issues/new'} >New Issue</Link>
            </Button>
        </div>
    )
}

export default IssuesPage