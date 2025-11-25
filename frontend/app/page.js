'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
    const router = useRouter();

    useEffect(() => {
        // Redirect directly to dashboard
        router.push('/dashboard');
    }, [router]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-coffee-100 to-coffee-200">
            <div className="text-center">
                <h1 className="text-2xl font-bold text-coffee-900">
                    Loading Brewster Buster...
                </h1>
            </div>
        </div>
    );
}
